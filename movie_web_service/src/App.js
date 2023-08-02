import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import MovieList from "./Component/MovieList";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "./Component/SearchBar";
import MovieDetails from "./Component/MovieDetails";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <Router>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <h1 style={styles.movieHeading}>
              <Link to="/" style={styles.link}>
                Movie Web Service
              </Link>
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <SearchBar onSearch={handleSearch} />{" "}
          </Col>
        </Row>
      </Container>
      <Routes>
        <Route
          path="/"
          element={
            <MovieList
              moviesPerPage={10}
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
              searchTerm={searchTerm}
              onSearch={handleSearch}
            />
          }
        />
        <Route
          path="/movies/:movieId"
          element={<MovieDetails movieId={useParams().movieId} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

const styles = {
  movieHeading: {
    fontSize: "36px",
    color: "#333",
    fontWeight: "bold",
    textDecoration: "none",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "inline-block",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    transition: "color 0.3s ease",
  },
};
