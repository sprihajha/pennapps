import { Container, Typography, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";

const Receipt = ({ items }) => {
  const itemArray = Object.values(items);

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
