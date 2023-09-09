import React from "react";
import secrets from "../secrets.json"
import cartCache from "../testdata.json"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: secrets["OPENAI"],
  dangerouslyAllowBrowser: true, 
});

class ItineraryGenerator extends React.Component {

  key = secrets["OPENAI"];  
  cache = cartCache;


  

	render() {
		return (
			<div>
				<p> 
          {this.cache[0].Title}
          <Button variant='outlined' onClick={()=>{console.log("Button clicked")}}>Make Itinerary</Button>
        </p>
			</div>
		);
	}
}

export default ItineraryGenerator;
