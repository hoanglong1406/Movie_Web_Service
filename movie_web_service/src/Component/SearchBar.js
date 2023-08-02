import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="py-5">
      <input
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={handleInputChange}
        style={{
          padding: "8px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginRight: "8px",
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
