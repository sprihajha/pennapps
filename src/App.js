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
import { createTheme } from "@mui/material/styles";
import { green, teal } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: teal,
  },
});

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
        style={{ margin: "40px 0px 20px 0px",color:"white"}}
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
  const [daysInput, setDaysInput] = useState("");
  const handleDaysInputChange = (newDaysInput) => {
    setDaysInput(newDaysInput);
  };

  const handleAdd = (id, item) => {
    setSelectedItems({
      ...selectedItems,
      [id]: item,
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
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path="/receipt"
              element={
                <>
                  <Navigation />
                  <Receipt items={selectedItems} days={daysInput} />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <header className="sticky-header">
                    <CartButton
                      count={selectedItemsArray.length}
                      onClick={() => setIsCartOpen(!isCartOpen)}
                    />
                  </header>
                  <div className="container">
                    <Search
                      onSearchResults={setSearchResults}
                      onDaysInputChange={handleDaysInputChange}
                    />
                  </div>
                  {searchResults?.map((result) => (
                    <ItemCard
                      key={result.id} // Use a unique identifier from the result
                      title={result.title}
                      url={result.url}
                      id={result.id}
                      onAdd={() => handleAdd(result.id, result)} // Use the unique identifier for adding to cart
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
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default App;
