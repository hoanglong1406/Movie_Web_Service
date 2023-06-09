import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import Movie from "./Movie";

const MovieList = ({ moviesPerPage, selectedSortOption, searchTerm, onSearch }) => {
  const { page } = useParams();
  const currentPage = parseInt(page, 10) || 1;
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [availableWidth, setAvailableWidth] = useState(0);
  const navigate = useNavigate();

  // const handleSearch = (query) => {
  //   onSearch(query);
  //   navigate(`/movies/page/1`);
  // };

  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?limit=${moviesPerPage}&page=${currentPage}&sort_by=${selectedSortOption}&query_term=${searchTerm}`
      );

      if (response.data.status === "ok") {
        const movieData = response.data.data.movies || [];
        const totalMovies = response.data.data.movie_count || 0;
        const totalPages = Math.ceil(totalMovies / moviesPerPage);

        setMovies(movieData);
        setTotalPages(totalPages);
        setIsLoading(false);
      } else {
        console.log("API Error:", response.data.status_message);
      }
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  }, [currentPage, moviesPerPage, selectedSortOption, searchTerm]);

  const fetchGenres = useCallback(async () => {
    try {
      // Fetch genres data here if needed
    } catch (error) {
      console.log("Error fetching genres:", error);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres, searchTerm]);

  useEffect(() => {
    const handleResize = () => {
      const paginationContainer = document.querySelector(".pagination-container");
      if (paginationContainer) {
        setAvailableWidth(paginationContainer.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    navigate(`/movies/page/${pageNumber}`);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pageNumbers = [1];

    let startPage = 2;
    let endPage = totalPages - 1;

    if (availableWidth < 400) {
      startPage = Math.max(2, currentPage - 1);
      endPage = Math.min(totalPages - 1, currentPage + 1);
    } else if (availableWidth < 600) {
      startPage = Math.max(2, currentPage - 2);
      endPage = Math.min(totalPages - 1, currentPage + 2);
    } else {
      if (currentPage > 4) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <div>

      {movies.map((movie) => (
        <Movie key={movie.id} {...movie} />
      ))}

      <div className="pagination-container d-flex justify-content-center">
        <Pagination>
          {currentPage > 1 && (
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
          )}

          {renderPageNumbers().map((pageNumber, index) => (
            <Pagination.Item
              key={index}
              active={pageNumber === currentPage}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}

          {currentPage < totalPages && (
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default MovieList;
