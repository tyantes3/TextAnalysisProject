"use client";
import React from "react";
import "regenerator-runtime/runtime";
import styles from "./SpeechToText.module.css";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechToText = () => {
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
    <div className={styles.Speech}>
      <p className={styles.Mic}>
        Microphone:{" "}
        {listening ? "Currently Listening" : "Currently Not Listening"}
      </p>
      <button
        className={styles.button}
        onClick={() => SpeechRecognition.startListening({ continuous: true })}
      >
        Start
      </button>
      <button
        className={styles.button}
        onClick={SpeechRecognition.stopListening}
      >
        Stop
      </button>
      <button className={styles.button} onClick={resetTranscript}>
        Reset
      </button>
      <p className={styles.Mic}>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
