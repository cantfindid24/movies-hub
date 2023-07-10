import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Pagination({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination-bar">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Button className="page-link" onClick={() => paginate(number)}>
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
