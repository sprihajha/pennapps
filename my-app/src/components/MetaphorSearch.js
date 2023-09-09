import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useState } from "react";
import Metaphor from "metaphor-node";

export default function () {
  const [input, setInput] = useState("");

  async function fetchData(){
    try{
        const response = await Metaphor.search({input})
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
        variant="Outline"
        value={input}
        onChange={setInput(e.target.value)}
      />
      <Button variant='outlined' onClick={()=>{fetchData()}}>Make Itinerary</Button>
        </>
        )
  }
