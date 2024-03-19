export default function InputText() {

  
  async function queryModel(){
    let model_text=document.getElementById("model_text")
    console.log(model_text)
    
    let summary = await fetch("https://bba5-35-222-199-161.ngrok-free.app/api/queryModel",{
      method:"GET",
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify("Hello World")

    })
    // let model_output = async await fetch(model_text,)
    return summary.json()
  }


    return (
          <form>
            <input className="text-white" type="text" name="model_text" id="mode_text"></input>
            <button type='submit' id='submitQuery' onClick={queryModel}>Summarize</button>
          </form>
          


    )
  }