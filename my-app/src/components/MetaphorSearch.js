
import { useState } from "react";
import Metaphor from "metaphor-node";

export default function MetaphorSearch() {
  const [input, setInput] = useState("");

  const formSubmit = async (e) => {
    try{ 
      const response = await Metaphor.search({input})
      console.log(response)
    }catch(err){
      console.error(err)
    }
  }
  return (
    <>
      <input
        id="trip-info"
        label="What do you want to do?"
        variant="outlined"
        value={input}
        onChange={(e)=>{setInput(e.target.value)}}
      />
      <button variant='outlined' onClick={()=>{formSubmit()}}>Make Itinerary</button>
        </>
        )
  }
