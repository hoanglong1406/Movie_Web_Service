import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image } from "react-bootstrap";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}&with_images=true&with_cast=true`
        );

        if (response.data.status === "ok") {
          const movieData = response.data.data.movie;
          setMovie(movieData);
        } else {
          console.log("API Error:", response.data.status_message);
        }
      } catch (error) {
        console.log("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Destructure movie data
  const {
    title,
    description_full,
    genres,
    background_image,
    cast,
    year,
    language,
    medium_screenshot_image1,
    medium_screenshot_image2,
    medium_screenshot_image3,
    medium_cover_image,
  } = movie;

  const backgroundStyle = {
    position: "relative",
    width: "100%",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background_image})`,
    backgroundSize: "100% auto",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#FFFFFF",
    padding: "10%",
    /* Additional background styles */
  };

  return (
    <Container fluid style={backgroundStyle}>
      <Container>
        <Row>
          <Col xs={12} sm={2}>
            <Image src={medium_cover_image} alt="Cover" fluid></Image>
          </Col>
          <Col xs={12} sm={10}>
            <h2>{title}</h2>
            <p>{description_full}</p>
            <h3>
              {year} {language.toUpperCase()}
            </h3>
            <p>Genres: {genres.join(", ")}</p>
            <p>Cast:</p>
            <ul>
              {cast.map((castMember, index) => (
                <li key={index}>
                  <span>{castMember.name}</span> as{" "}
                  <span>{castMember.character_name}</span>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image src={medium_screenshot_image1} alt="Screenshot 1" fluid />
          </Col>
          <Col>
            <Image src={medium_screenshot_image2} alt="Screenshot 2" fluid />
          </Col>
          <Col>
            <Image src={medium_screenshot_image3} alt="Screenshot 3" fluid />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default MovieDetails;
