import {
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import "../Search.css";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Receipt = ({ items, days }) => {
  const itemArray = Object.values(items);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState(null);

  console.log(itemArray);

  const sendSMS = async () => {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);

      client.messages
        .create({
          body: { data },
          from: "+18339760526",
          to: `+${phoneNumber}`,
        })
        .then((message) => console.log(message.sid))
        .done();
    } catch (err) {
      console.error(err);
    }
  };

  const generateItinerary = async () => {
    setIsLoading(true);
    console.log(days);
    //https://autotourist.ue.r.appspot.com/api/itinerary
    try {
      const response = await fetch("http://localhost:3001/api/itinerary", {
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
          }}
        >
          Generate Detailed Plan
        </Button>
        <div>
          {isLoading ? (
            <CircularProgress sx={{ m: "2rem" }} />
          ) : data ? (
            <>
              {" "}
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
              <TextField
                id="standard-basic"
                label="Enter Phone Number"
                variant="standard"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <Button
                variant="contained"
                onClick={sendSMS}
                style={{
                  fontFamily: "Inter",
                  fontSize: "1rem",
                  margin: "1rem 0 2rem 0",
                }}
              >
                Share via SMS
              </Button>
            </>
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
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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
