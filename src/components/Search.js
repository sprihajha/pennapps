import { useState } from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import "../Search.css";

export default function Search({ onSearchResults, onDaysInputChange }) {
	const [locationInput, setLocationInput] = useState("");
	const [activityInput, setActivityInput] = useState("");
	const [lowerDay, setLowerDay] = useState("");

	const [locationInputSize, setLocationInputSize] = useState(8);
	const [activityInputSize, setActivityInputSize] = useState(8);

	const locationInputStyle = {
		display: "inline-block",
		width: `${locationInputSize}ch`,
	};

	const activityInputStyle = {
		display: "inline-block",
		width: `${activityInputSize}ch`,
	};

	const daysInputStyle = {
		display: "inline-block",
		width: `3.25rem`,
	};
	function handleLocationChange(e) {
		setLocationInput(e.target.value);

    if (e.target.value.length ===0){
      setLocationInputSize(8);
    }else{
      const newLen = Math.ceil(e.target.value.length*0.9)
      setLocationInputSize(newLen);
    }
    

		/*if (e.target.value.length > 8) {
			const additionalCh = Math.ceil((e.target.value.length - 8) / 2);
			setLocationInputSize(8 + additionalCh);
		} else {
			setLocationInputSize(8);
		}*/
	}
	function handleActivityChange(e) {
		setActivityInput(e.target.value);
    if (e.target.value.length ===0){
      setActivityInputSize(8);
    }else{
      const newLen = Math.ceil(e.target.value.length * 0.9);
      setActivityInputSize(newLen);
    }

		/*if (e.target.value.length > 8) {
			const additionalCh = Math.ceil((e.target.value.length - 8) / 2);
			setActivityInputSize(8 + additionalCh);
		} else {
			setActivityInputSize(8);
		}*/
	}
	function handleDaysChange(e) {
		const numericValue = e.target.value.replace(/[^0-9]/g, "");

		const truncatedValue = numericValue.slice(0, 1);
    console.log(truncatedValue);
    setLowerDay(truncatedValue);
		onDaysInputChange(truncatedValue);
	}

	const formSubmit = async () => {
    if (locationInput === "" || activityInput === "" || lowerDay === "") {
      console.log("empty");
      return;
    }
		try {
			const response = await fetch(
				"https://autotourist.ue.r.appspot.com/api/search",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						queryString: `Here are some environmentally-friendly or eco-touristy ${activityInput} events or locations in ${locationInput}`,
						numResults: 5,
					}),
				}
			);

			if (response.ok) {
				const data = await response.json();
				onSearchResults(data.results);
				console.log(data.results);
			} else {
				console.error("Error:", response.statusText);
			}
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
			<div className="HeroForm">
				<h1>
					I want to go to{" "}
					<span>
						<input
							id="location-input"
							className="HeroInput"
							variant="standard"
							placeholder="location..."
							style={locationInputStyle}
							value={locationInput}
							onChange={(e) => handleLocationChange(e)}
						/>
					</span>{" "}
					to{" "}
					<span>
						<input
							id="activity-input"
							className="HeroInput"
							variant="standard"
							placeholder="activity..."
							style={activityInputStyle}
							value={activityInput}
							onChange={(e) => handleActivityChange(e)}
						/>
					</span>{" "}
					for{" "}
					<span>
						<input
							id="days-input"
							className="HeroInput"
							variant="standard"
							placeholder="3"
							style={daysInputStyle}
							value={lowerDay}
							onChange={(e) => handleDaysChange(e)}
						/>
					</span>
					days.
				</h1>
			</div>

			<Button
				variant="contained"
				onClick={formSubmit}
        color="primary"
				style={{
					fontFamily: "Inter",
					fontSize: "1rem",
					marginBottom: "1rem",
				}}
			>
				Search
			</Button>
		</motion.div>
	);
}
