import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Image, Button } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const movieImageStyle = {
  position: "relative",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  opacity: 0,
  transition: "opacity 0.3s ease",
};

const movieGenresStyle = {
  fontSize: "14px",
  paddingBottom: "10px",
};

const genreStyle = {
  fontSize: "12px",
  marginRight: "5px",
};

const separatorStyle = {
  marginLeft: "5px",
  marginRight: "5px",
};

const movieTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  paddingBottom: "10px",
};

const movieYearStyle = {
  fontSize: "14px",
  paddingBottom: "10px",
};

const movieSummaryStyle = {
  fontSize: "16px",
  lineHeight: "1.5",
  paddingBottom: "20px",
};

const movieRuntimeStyle = {
  fontSize: "14px",
  fontWeight: "bold",
};

const contentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "#FFFFFF",
  opacity: 1,
  transition: "opacity 0.3s ease",
};

function Movie({
  id,
  year,
  title,
  summary,
  medium_cover_image,
  genres,
  runtime,
  rating,
}) {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/movies/${id}`);
  };
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Row
      className="py-5 my-5"
      style={{
        backgroundColor: "#f0f0f0",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <Col xs={12} lg={2} style={movieImageStyle}>
        <Image
          className="w-100"
          src={medium_cover_image}
          alt={title}
          title={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x400"; // Replace with a placeholder image URL
          }}
        />
        <div
          className="overlay"
          style={{ ...overlayStyle, opacity: showDetails ? 0.8 : 0 }}
        >
          <div className="content" style={contentStyle}>
            <StarFill />
            <p>{rating} / 10 </p>
            <Button variant="primary" onClick={handleShowDetails}>Show Details</Button>
          </div>
        </div>
      </Col>
      <Col xs={12} lg={10}>
        <p style={movieGenresStyle}>
          {genres.map((genre, index) => {
            const uppercaseGenre = genre.toUpperCase();
            return (
              <span key={index} style={genreStyle}>
                {index !== 0 && <span style={separatorStyle}>/</span>}
                {uppercaseGenre}
              </span>
            );
          })}
        </p>
        <div style={movieTitleStyle}>{title}</div>
        <p style={movieYearStyle}>Year: {year}</p>
        <p style={movieSummaryStyle}>{summary}</p>
        <Row>
          <Col xs={12} lg={6}></Col>
          <Col xs={12} lg={6}>
            <div className="d-flex align-items-center justify-content-sm-end">
              <p className="me-2" style={movieRuntimeStyle}>
                {runtime !== 0 ? `${runtime} mins` : "??? mins"}
              </p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  medium_cover_image: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  runtime: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Movie;
