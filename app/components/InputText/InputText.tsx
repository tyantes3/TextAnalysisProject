"use client";
import { useState } from "react";
import styles from "./InputText.module.css";

export default function InputText() {
  const [modelStatus, setModelStatus] = useState("");
  const [summary, setSummary] = useState(""); // State variable to store summary
  const [inputType, setInputType] = useState("textInput");
  const [modelType, setModelType] = useState("Faster");

  async function queryModel(event) {
    event.preventDefault();
    let data = JSON.stringify({
      model: modelStatus,
      modelInputType: inputType,
      modelSelector: modelType,
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
      setSummary(responseData.summary); // Set the summary in state
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
      </form>
      <p className={styles.summary}>{summary}</p> {/* Display summary here */}
    </div>
  );
}
