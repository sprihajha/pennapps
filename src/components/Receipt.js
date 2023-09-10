import { Container, Typography, Paper, Divider, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import "../Search.css";
import CircularProgress from "@mui/material/CircularProgress";

const Receipt = ({ items, days }) => {
  const itemArray = Object.values(items);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);

  console.log(itemArray);
  const generateItinerary = async () => {
		setIsLoading(true);
		console.log(days);
		try {
			const response = await fetch("https://autotourist.ue.r.appspot.com/api/itinerary", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					days: days,
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
		} finally {
			setIsLoading(false); // Hide the preloader once data is set or if an error occurs
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
            margin: "1em",
            color: "white",
          }}
        >
          Generate Detailed Plan
        </Button>
        <div>
          {isLoading ? (
            <CircularProgress sx={{ m: "2rem" }} />
          ) : data ? (
            <Paper elevation={3} style={styles.boardingPass}>
              <Typography variant="h4" gutterBottom style={styles.header}>
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
          ) : null}
        </div>
      </motion.div>
    </Container>
  );
};

const styles = {
  boardingPass: {
    padding: "20px",
    margin: "10px",
    borderRadius: "15px",
    background: "linear-gradient(45deg, rgba(53, 122, 56, 1) 0%, rgba(111, 191, 115, 1) 100%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    fontFamily: "Poppins",
  },
  itemContainer: {
    padding: "10px 0",
    borderBottom: "1px dashed white",
  },
  itemTitle: {
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  itemUrl: {
    wordBreak: "break-all",
    fontFamily: "Inter",
  },
};

export default Receipt;
