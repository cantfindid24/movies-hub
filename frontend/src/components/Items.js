import React from 'react';
import Card from './Card';
import { Container, Row } from 'react-bootstrap';

export default function Items({ items, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <Container className="container">
      {items &&
        items.map((c) => {
          const mediaType = c.release_date ? 'movie' : 'tv';
          return (
            <Card
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type || mediaType}
              vote_average={c.vote_average}
            />
          );
        })}
    </Container>
  );
}
