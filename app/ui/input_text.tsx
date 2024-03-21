
'use client';
import {useState, useEffect} from 'react';
export default function InputText() {
  const [modelStatus, setModelStatus] = useState("")
  

 
  var input_text = document.querySelector("form");
  input_text?.addEventListener("submit",async (e)=>{
    e.preventDefault()
    let text = modelStatus
    let bodyData = {
      "text":text
    }
    const summary = await fetch("https://localhost:5000/api/queryModel")
    
  })

  const change = event =>{
    setModelStatus(event.target.value)
  
  }

  // useEffect(()=>{
      
      
  //     console.log(input_text)
  //     let pleaseWord = document.getElementById("model_text")
  //     console.log(pleaseWord[?.nodeValue])
  //   const fetchModelOutput = async() =>{
  //     var input_text = document.querySelector("form")
      
  //     console.log(input_text)
  //   }
    
    
  // },[modelStatus]);


    return (
          <form id="query"  method="POST">
            <input onChange = {change} className="text-white" type="text" name="model_text" id="model_text" value={modelStatus}></input>
            <button type='submit' id='submitQuery' >Summarize</button>
          </form>
          


    )
  }