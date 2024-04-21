"use client";
import { useState } from "react";
import styles from "./InputText.module.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import speechStyles from "./SpeechToText.module.css";

export default function InputText() {
  const [modelStatus, setModelStatus] = useState("");
  const [summary, setSummary] = useState(""); // State variable to store summary
  const [inputType, setInputType] = useState("textInput");
  const [modelType, setModelType] = useState("Faster");
  const [NERpeople, setNERpeople] = useState("");
  const [NERfac, setNERfac] = useState("");
  const [NERdates, setNERdates] = useState("");
  const [NERgpe, setNERgpe] = useState("");
  const [NERStatus, setNER] = useState(false);

  const handleCheckboxChange = () => {
    setNER((prevState) => !prevState);
  };

  async function queryModel(event) {
    event.preventDefault();
    setSummary("Loading...");
    setNERpeople(""); // Join array elements with a comma and space
    setNERfac(""); // Join array elements with a comma and space
    setNERdates(""); // Join array elements with a comma and space
    setNERgpe("");
    const finalModelStatus =
      transcript.trim() !== "" ? transcript : modelStatus;

    let data = JSON.stringify({
      model: finalModelStatus,
      modelInputType: inputType,
      modelSelector: modelType,
      NER: NERStatus,
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/api/queryModel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const responseData = await response.json(); // Parse JSON response
      if (NERStatus) {
        setNERpeople("People: " + responseData["People"].join(", ")); // Join array elements with a comma and space
        setNERfac("Facilities: " + responseData["Facilities"].join(", ")); // Join array elements with a comma and space
        setNERdates("Dates: " + responseData["Dates"].join(", ")); // Join array elements with a comma and space
        setNERgpe(
          "Geopolitical Entities: " +
            responseData["Geopolitical Entities"].join(", ")
        );
      }
      setSummary("Summary: " + responseData["Summary"]);
      console.log(summary);
    } catch (error) {
      console.error("Error:", error);
      setSummary("Failed to fetch summary");
    }
  }

  function handleChange(event) {
    setModelStatus(event.target.value);
  }

  function handleInputChange(event) {
    setInputType(event.target.value);
    console.log(inputType);
  }

  function handleModelChange(event) {
    setModelType(event.target.value);
    console.log(modelType);
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser Doesn't support speech to text</span>;
  }

  return (
    <div className={styles.Input}>
      <form id="query" method="POST" onSubmit={queryModel}>
        <input
          onChange={handleChange}
          className={styles.text}
          type="text"
          name="model_text"
          id="model_text"
          value={modelStatus}
        ></input>
        <select
          value={inputType}
          onChange={handleInputChange}
          className={styles.select}
        >
          <option value="textInput">Text Input</option>
          <option value="urlInput">URL Input</option>
          <option value="textInput">Speech Input</option>
        </select>
        <select
          value={modelType}
          onChange={handleModelChange}
          className={styles.select}
        >
          <option value="Faster">Faster Response</option>
          <option value="Accurate">More Accurate Response</option>
        </select>
        <button type="submit" id="submitQuery" className={styles.button}>
          Summarize
        </button>
        <label>
          <input
            type="checkbox"
            name="enableOptions"
            checked={NERStatus}
            onChange={handleCheckboxChange}
          />
          Named Entity Recognition
        </label>
      </form>
      <p className={styles.summary}>{summary}</p>
      <p className={styles.summary}>{NERpeople}</p>
      <p className={styles.summary}>{NERdates}</p>
      <p className={styles.summary}>{NERfac}</p>
      <p className={styles.summary}>{NERgpe}</p>
      <div className={speechStyles.Speech}>
        <p className={speechStyles.Mic}>
          Microphone:{" "}
          {listening ? "Currently Listening" : "Currently Not Listening"}
        </p>
        <button
          className={speechStyles.button}
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
        >
          Start
        </button>
        <button
          className={speechStyles.button}
          onClick={SpeechRecognition.stopListening}
        >
          Stop
        </button>
        <button className={speechStyles.button} onClick={resetTranscript}>
          Reset
        </button>
        <p className={speechStyles.Mic}>{transcript}</p>
      </div>
    </div>
  );
}
