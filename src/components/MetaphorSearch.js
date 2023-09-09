import { useState } from "react";
// import Metaphor from "metaphor-node";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./metaSearch.css";

export default function MetaphorSearch() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  //   const formSubmit = async (e) => {
  //     try{
  //       const response = await Metaphor.search({input})
  //       console.log(response)
  //     }catch(err){
  //       console.error(err)
  //     }
  //   }
  return (
    <div className="container">
      <div className="text-response">
        <h1>I want to go to </h1>
        <TextField
          id="standard-basic"
          label="Location?"
          variant="standard"
          value={input1}
          onChange={(e) => {
            setInput1(e.target.value);
          }}
          className="TextInput1"
        />{" "}
        <h1>to do </h1>
        <TextField
          id="standard-basic"
          label="Activity?"
          variant="standard"
          value={input2}
          onChange={(e) => {
            setInput2(e.target.value);
          }}
          className="TextInput2"
        />
      </div>

      <Button
        variant="contained"
        color="success"
        onClick={() => {
          //   formSubmit();
        }}
      >
        Enter
      </Button>
    </div>
  );
}
