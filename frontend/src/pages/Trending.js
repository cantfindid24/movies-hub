import { useEffect, useState } from 'react';
import axios from 'axios';
import Items from '../components/Items';
import CustomPagination from './../components/CustomPagination';

import dotenv from 'dotenv';
dotenv.config();
const apikey = process.env.API_KEY;

export default function Trending() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}&page=${page}`
        );

        setContent(data.results);
      } catch (error) {
        console.log('Error fetching trending content:', error);
      }

      setLoading(false);
    };
    fetchMovies();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <Items items={content} loading={loading} />
      <CustomPagination setPage={setPage} />
    </div>
  );
}
