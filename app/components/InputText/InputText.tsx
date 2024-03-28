"use client";
import { useState } from "react";
import styles from "./InputText.module.css";

export default function InputText() {
  const [modelStatus, setModelStatus] = useState("");
  const [summary, setSummary] = useState(""); // State variable to store summary

  async function queryModel(event) {
    event.preventDefault();
    let data = JSON.stringify({ model: modelStatus });

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
        <button type="submit" id="submitQuery" className={styles.button}>
          Summarize
        </button>
      </form>
      <p>{summary}</p> {/* Display summary here */}
    </div>
  );
}
