import { Container, Typography, Paper, Divider,Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const Receipt = ({ items }) => {
  const itemArray = Object.values(items);

  const [data, setData] = useState(null);

  console.log(itemArray)
  const generateItinerary = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: itemArray,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(data);

      } else {
        console.error("Error:", response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
		<Container>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<Paper elevation={3} style={styles.boardingPass}>
					<Typography variant="h4" gutterBottom style={styles.header}>
						Your Itinerary
					</Typography>
					<Divider />
					{itemArray.map((item, index) => (
						<div key={index} style={styles.itemContainer}>
							<Typography variant="h6" style={styles.itemTitle}>
								{item.title}
							</Typography>
							<Typography variant="body1" style={styles.itemUrl}>
								{item.url}
							</Typography>
						</div>
					))}
				</Paper>
				<Button
					variant="contained"
					onClick={generateItinerary}
					style={{
						fontFamily: "Inter",
						fontSize: "1rem",
						marginTop: "1em",
					}}
				>
					Generate Detailed Plan
				</Button>
				{data && (
					<Paper elevation={3} style={styles.boardingPass}>
						<Typography
							variant="h4"
							gutterBottom
							style={styles.header}
						>
							Generated Itinerary:
						</Typography>
						<div>
							{data.split("\n").map((line, index) => (
								<Typography key={index} variant="body1">
									{line}
								</Typography>
							))}
						</div>
					</Paper>
				)}
			</motion.div>
		</Container>
  );
};

const styles = {
  boardingPass: {
    padding: "20px",
    marginTop: "20px",
    borderRadius: "15px",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  itemContainer: {
    padding: "10px 0",
    borderBottom: "1px dashed white",
  },
  itemTitle: {
    fontWeight: "bold",
  },
  itemUrl: {
    wordBreak: "break-all",
  },
};

export default Receipt;
