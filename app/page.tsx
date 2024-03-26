"use client";
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import SpeechToText from "./components/SpeechToText/SpeechToText";
import InputText from "./components/InputText/InputText";

export default function Page() {
  return (
    <div>
      <NavBar />
      <InputText />
      <SpeechToText />
    </div>
  );
}
