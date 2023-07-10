import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (value === 0) return navigate('/');
    else if (value === 1) return navigate('/movies');
    else if (value === 2) return navigate('/series');
    else if (value === 3) return navigate('search');
  }, [value, navigate]);

  return (
    <div className="footer">
      <span className="footer-box" onClick={() => setValue(0)}>
        <span className="footer-icon">
          {' '}
          <i className="fas fa-solid fa-fire"></i>
        </span>
        <span className="footer-label">Trending</span>
      </span>
      <span className="footer-box" onClick={() => setValue(1)}>
        <span className="footer-icon">
          {' '}
          <i className="fas fa-sharp fa-light fa-film icon"></i>
        </span>
        <span className="footer-label">Movie</span>
      </span>
      <span className="footer-box" onClick={() => setValue(2)}>
        <span className="footer-icon">
          {' '}
          <i className="fas fa-light fa-tv"></i>
        </span>
        <span className="footer-label">Tv Series</span>
      </span>
      <span className="footer-box" onClick={() => setValue(3)}>
        <span className="footer-icon">
          {' '}
          <i className="fas fa-solid fa-magnifying-glass"></i>
        </span>
        <span className="footer-label">Search</span>
      </span>
    </div>
  );
}
