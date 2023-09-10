import React from "react";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const CartButton = ({ count, onClick }) => {
  return (
    <Button color="primary" onClick={onClick} style={{
      fontFamily:"Inter",
      fontSize:"1rem",
      marginTop:"1em"
    }}>
      <Badge badgeContent={count} color="secondary">
        <FlightTakeoffIcon style={{marginRight:"4px"}}/>
      </Badge>
      Itinerary
    </Button>
  );
};

export default CartButton;
