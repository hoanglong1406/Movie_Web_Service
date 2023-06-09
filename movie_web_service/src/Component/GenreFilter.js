import React from 'react';

const GenreFilter = ({ genres, selectedGenres, onSelect }) => {
  const handleGenreChange = (event) => {
    const genre = event.target.value;
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
      : [...selectedGenres, genre];
    onSelect(updatedGenres);
  };

  return (
    <div>
      <label>Filter by Genre:</label>
      {genres.map((genre) => (
        <div key={genre}>
          <input
            type="checkbox"
            value={genre}
            checked={selectedGenres.includes(genre)}
            onChange={handleGenreChange}
          />
          <span>{genre}</span>
        </div>
      ))}
    </div>
  );
};

export default GenreFilter;
