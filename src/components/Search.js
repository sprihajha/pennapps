import { useState } from "react";
import Metaphor from "metaphor-node";
import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function Search({ onSearchResults }) {
  const [locationInput, setLocationInput] = useState("");
  const [activityInput, setActivityInput] = useState("");

  const formSubmit = async () => {
    const metaphor = new Metaphor(process.env.REACT_APP_YOUR_API_KEY);

    try {
      const queryString = `${locationInput} ${activityInput}`;
      const response = await metaphor.search(queryString, {
        numResults: 5,
        useAutoprompt: true,
      });
      onSearchResults(response.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1>I want to go to </h1>
        <TextField
          id="location-input"
          label="Location?"
          variant="standard"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <h1>to do </h1>
        <TextField
          id="activity-input"
          label="Activity?"
          variant="standard"
          value={activityInput}
          onChange={(e) => setActivityInput(e.target.value)}
        />
      </div>

      <Button variant="contained" color="success" onClick={formSubmit}>
        Search
      </Button>
    </motion.div>
  );
}
