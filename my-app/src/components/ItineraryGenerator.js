import React from "react";
import secrets from "../secrets.json"
import cartCache from "../testdata.json"
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
        </p>
			</div>
		);
	}
}

export default ItineraryGenerator;
