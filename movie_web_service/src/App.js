import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./Component/MovieList";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "./Component/Filter";
import SearchBar from "./Component/SearchBar";

function App() {
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const handleFilterChange = (option) => {
    setSelectedSortOption(option);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <Router>
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <h1 style={{ fontSize: "36px", color: "#333", fontWeight: "bold" }}>
              Movie Web Service
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <SearchBar onSearch={handleSearch} />{" "}
          </Col>
        </Row>
        <Filter handleFilterChange={handleFilterChange} />
        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                moviesPerPage={10}
                selectedSortOption={selectedSortOption}
                searchTerm={searchTerm}
                onSearch={handleSearch}
              />
            }
          />
          <Route
            path="/movies/page/:page"
            element={
              <MovieList
                moviesPerPage={10}
                selectedSortOption={selectedSortOption}
                searchTerm={searchTerm}
                onSearch={handleSearch}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
