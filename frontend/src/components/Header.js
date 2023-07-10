import React from 'react';

export default function Header() {
  return (
    <div className="header">
      <span
        onClick={() => {
          window.scroll(0, 0);
        }}
      >
        <i className="fas fa-duotone fa-film"></i> Movies Hub
      </span>
    </div>
  );
}
