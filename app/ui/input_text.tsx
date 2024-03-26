
'use client';
import {useState, useEffect} from 'react';
export default function InputText() {
  const [modelStatus, setModelStatus] = useState("")
  

 
  // var input_text = document.querySelector("form");
  // input_text?.addEventListener("submit",async (e)=>{
  //   e.preventDefault()
  //   let text = modelStatus
  //   let bodyData = {
  //     "text":text
  //   }
  //   const summary = await fetch("https://localhost:5000/api/queryModel")
    
  // })

  

  function handleChange(event){
    setModelStatus(event.target.value)
    console.log(event.target.value)
  }
  async function queryModel(event){
    event.preventDefault()
    let data =  JSON.stringify({'model':modelStatus})
    console.log(data)
    let summary = await fetch("http://127.0.0.1:5000/api/queryModel",{
      method:"POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      mode:'cors',
      body:data

    } )
    

  }
  
  
  // useEffect(()=>{
  //     let pleaseWord = document.getElementById("model_text")
  //     console.log(pleaseWord)
  //   const fetchModelOutput = async() =>{
  //     var input_text = document.querySelector("form")
      
  //     console.log(input_text)
  //   }
    
    
  // },[modelStatus]);


    return (
          <form id="query"  method="POST" onSubmit={queryModel}>
            <input  onChange={handleChange} className="text-white" type="text" name="model_text" id="model_text" value={modelStatus}></input>
            <button type='submit' id='submitQuery' >Summarize</button>
          </form>
          


    )
  }