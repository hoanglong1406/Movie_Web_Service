import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="py-5">
      <input
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{
          padding: "8px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginRight: "8px",
        }}
      />
    </div>
  );
};

export default SearchBar;
