import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState } from "react";
import Metaphor from "metaphor-node";

export default function MetaphorSearch() {
  const [input, setInput] = useState("");

  async function fetchData(){
    try{
        const response = await Metaphor.search({input})
        console.log(response)
    }
    catch(error){
        console.error("Error fetching data: ", error)
    }
  }
  return (
    <>
      <TextField
        id="trip-info"
        label="What do you want to do?"
        variant="outlined"
        value={input}
        onChange={(e)=>{setInput(e.target.value)}}
      />
      <Button variant='outlined' onClick={()=>{fetchData()}}>Make Itinerary</Button>
        </>
        )
  }
