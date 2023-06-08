import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Image } from "react-bootstrap";

function Movie({
  id,
  year,
  title,
  summary,
  large_cover_image,
  genres,
  runtime,
}) {
  return (
    <Row className="py-5">
      <Col xs={12} lg={2}>
        <Image
          className="w-100"
          src={large_cover_image}
          alt={title}
          title={title}
        />
      </Col>
      <Col xs={12} lg={10}>
        <p>
          {genres.map((genre, key) => {
            const uppercaseGenre = genre.toUpperCase();
            if (key !== 0) return <span>/{uppercaseGenre}</span>;
            else return <span>{uppercaseGenre}</span>;
          })}
        </p>
        <div>{title}</div>
        <p>Year: {year}</p>
        <p>{summary}</p>
        <Row>
          <Col xs={12} lg={6}></Col>
          <Col xs={12} lg={6}>
            <div className="d-flex align-items-center justify-content-sm-end">
                <p className="me-2">{runtime} mins</p>
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
  large_cover_image: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  runtime: PropTypes.number.isRequired,
};

export default Movie;
