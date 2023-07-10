import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import Items from '../components/Items';
import CustomPagination from '../components/CustomPagination';
import axios from 'axios';

export default function Search() {
  const [type, setType] = useState(0);
  const [query, setQuery] = useState('');
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
          process.env.REACT_APP_API
        }&language=en-US&query=${query}&page=${page}&include_adult=false`);
        setContent(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log('Error fetching trending content:', error);
      }

      setLoading(false);
    };

    window.scroll(0, 0);
    if (query) {
      fetchItems();
    } else {
      setContent([]);
    }
  }, [page, type, query]);

  return (
    <Container className="search ">
      <div style={{ width: '100%' }}>
        <Form
          className="d-flex me-auto w-100 navbar-form search-form"
          onSubmit={handleSubmit}
        >
          <InputGroup>
            <FormControl
              type="search"
              name="q"
              id="q"
              onChange={handleInputChange}
              placeholder="search"
              aria-label="Search"
              aria-describedby="button-search"
              className="me-2 rounded-pill"
            ></FormControl>
            <Button type="submit" id="button-search">
              <i className="fas fa-search"></i>
            </Button>
          </InputGroup>
        </Form>

        <Tabs
          style={{ paddingBottom: 5 }}
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(evt, newValue) => {
            // console.log(evt);
            // console.log(newValue);
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: '50%' }} label="Search Movies" />
          <Tab style={{ width: '50%' }} label="Search Tv Series" />
        </Tabs>
      </div>
      <Container className="container">
        <Items items={content} loading={loading} />
        {query &&
          content.length === 0 &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </Container>
      {content.length !== 0 && totalPages > 1 && (
        <CustomPagination setPage={setPage} totalPages={totalPages} />
      )}
    </Container>
  );
}
