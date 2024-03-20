
'use client';
export default function InputText() {

 

  async function queryModel(form){
    form.preventDefault()
    
    let summary = await fetch("https://b2cd-35-196-52-77.ngrok-free.app//api/queryModel",{
      method:"GET",
      
      // body: JSON.stringify("Hello World")
      body: new FormData(form)

    })
    // let model_output = async await fetch(model_text,)
    return summary.json()
  }


    return (
          <form id="query" onSubmit={queryModel} method="get">
            <input className="text-white" type="text" name="model_text" id="model_text"></input>
            <button type='submit' id='submitQuery' >Summarize</button>
          </form>
          


    )
  }