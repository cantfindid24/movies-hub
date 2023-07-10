import { useEffect, useState } from 'react';
import axios from 'axios';
import Items from '../components/Items';
import CustomPagination from './../components/CustomPagination';
import Genres from './../components/Genres';

import dotenv from 'dotenv';
dotenv.config();
const apikey = process.env.API_KEY;

export default function Movies() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const giveGenereCode = () => {
    if (selectedGenres.length < 1) return;

    return selectedGenres
      .map((g) => g.id)
      .reduce((acc, curr) => acc + ',' + curr);
  };

  const genreforURL = giveGenereCode(selectedGenres);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
        setContent(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log('Error fetching trending content:', error);
      }

      setLoading(false);
    };
    fetchMovies();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        setSelectedGenres={setSelectedGenres}
        selectedGenres={selectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <Items items={content} loading={loading} />

      {totalPages > 1 && (
        <CustomPagination setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
}
