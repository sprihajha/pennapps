import "./App.css";
import React, { useState } from "react";
import {
  useNavigate,
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ItemCard from "./components/ItemCard";
import Cart from "./components/Cart";
import CartButton from "./components/CartButton";
import Search from "./components/Search";
import Receipt from "./components/Receipt";
import Button from "@mui/material/Button";

const Navigation = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/");
  };

  return (
    <header>
      <Button
        onClick={handleCheckout}
        variant="contained"
        color="primary"
        style={{ margin: "40px 0px 20px 0px" }}
      >
        Back to Home
      </Button>
    </header>
  );
};

const App = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleAdd = (index, item) => {
    setSelectedItems({
      ...selectedItems,
      [index]: item,
    });
  };

  const handleRemove = (index) => {
    const updatedItems = { ...selectedItems };
    delete updatedItems[index];
    setSelectedItems(updatedItems);
  };

  const selectedItemsArray = Object.values(selectedItems);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/receipt"
            element={
              <>
                <Navigation />
                <Receipt items={selectedItems} />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <header>
                  <CartButton
                    count={selectedItemsArray.length}
                    onClick={() => setIsCartOpen(!isCartOpen)}
                  />
                </header>
                <Search onSearchResults={setSearchResults} />
                {searchResults?.map((result, index) => (
                  <ItemCard
                    key={index}
                    title={result.title}
                    url={result.url}
                    id={result.id}
                    onAdd={() => handleAdd(index, result)}
                  />
                ))}
                <Cart
                  items={selectedItems}
                  open={isCartOpen}
                  onClose={() => setIsCartOpen(false)}
                  onRemove={handleRemove}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
