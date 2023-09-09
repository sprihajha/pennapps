// src/components/Cart.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import { motion, AnimatePresence } from "framer-motion";

const Cart = ({ items, open, onClose, onRemove }) => {
  const itemCount = Object.keys(items).length;

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          outline: "none",
          width: "80%",
          maxWidth: "600px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <AnimatePresence>
          {Object.entries(items).map(([key, item]) => (
            <motion.div
              key={key}
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                variant="outlined"
                style={{
                  margin: "10px",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  </Typography>
                </CardContent>
                <IconButton color="secondary" onClick={() => onRemove(key)}>
                  <RemoveCircleOutline />
                </IconButton>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {itemCount >= 3 ? (
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            Checkout
          </Button>
        ) : (
          <Typography variant="body1" style={{ margin: "10px" }}>
            Add {3 - itemCount} more items to checkout.
          </Typography>
        )}
      </motion.div>
    </Modal>
  );
};

export default Cart;
