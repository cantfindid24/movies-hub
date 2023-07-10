import React from 'react';
import Pagination from '@mui/material/Pagination';

export default function CustomPagination({ setPage, totalPages = 10 }) {
  const handlePageChange = (page) => {
    window.scroll(0, 0);
    setPage(page);
  };
  return (
    <div className="custom-pagination">
      <Pagination
        count={totalPages}
        color="primary"
        onChange={(e) => handlePageChange(e.target.textContent)}
      />
    </div>
  );
}
