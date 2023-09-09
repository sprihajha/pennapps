// src/components/CheckboxCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import IconButton from "@mui/material/IconButton";
import { motion, AnimatePresence } from "framer-motion";

const ItemCard = ({ title, url, onAdd }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleAdd = () => {
    setIsVisible(false);
    if (onAdd) {
      onAdd();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            variant="outlined"
            style={{ margin: "10px", borderRadius: "15px" }}
          >
            <CardContent>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color="textSecondary">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </Typography>
              <IconButton color="primary" onClick={handleAdd}>
                <AddCircleOutlinedIcon />
              </IconButton>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemCard;
