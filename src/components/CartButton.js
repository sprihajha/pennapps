import React from "react";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartButton = ({ count, onClick }) => {
  return (
    <Button color="primary" onClick={onClick}>
      <Badge badgeContent={count} color="secondary">
        <ShoppingCartIcon />
      </Badge>
      Cart
    </Button>
  );
};

export default CartButton;