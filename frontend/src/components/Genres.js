import axios from 'axios';
import React, { useEffect } from 'react';
import Chip from '@mui/material/Chip';

export default function Genres({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage,
}) {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
  });

  return (
    <div className="genresList">
      {selectedGenres &&
        selectedGenres.map((gen) => (
          <Chip
            size="small"
            clickable
            onDelete={() => handleRemove(gen)}
            color="secondary"
            key={gen.id}
            className="selected-genre"
            label={gen.name}
          />
        ))}
      {genres &&
        genres.map((gen) => (
          <Chip
            size="small"
            clickable
            color="primary"
            key={gen.id}
            onClick={() => handleAdd(gen)}
            className="un-selected-genre"
            label={gen.name}
          />
        ))}
    </div>
  );
}
