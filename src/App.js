import "./App.css";
import React, { useState } from "react";
import CheckboxCard from "./components/CheckboxCard";
import Cart from "./components/Cart";
import CartButton from "./components/CartButton";
import MetaphorSearch from "./components/MetaphorSearch";
import results from "./searchResults.json";

const App = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

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
    <div className="App">
      <header>
        <CartButton
          count={selectedItemsArray.length}
          onClick={() => setIsCartOpen(!isCartOpen)}
        />
      </header>
      <MetaphorSearch />
      {results?.results?.map((result, index) => (
        <CheckboxCard
          key={index}
          title={result.title}
          url={result.url}
          onAdd={() => handleAdd(index, result)}
        />
      ))}
      <Cart
        items={selectedItems}
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default App;
