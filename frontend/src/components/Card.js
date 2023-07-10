import React, { useState } from 'react';
import { img_300, unavailable } from './../config';
import Modal from './Modal';
import Button from 'react-bootstrap/Button';

export default function Card(props) {
  const { id, poster, title, date, media_type, vote_average } = props;
  const [modal, showModal] = useState(false);

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <div className="media">
        <span
          className="item-badge"
          style={{
            backgroundColor: vote_average > 7.5 ? 'blue' : 'red',
          }}
        >
          {vote_average.toFixed(1)}
        </span>
        <img
          className="item-poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <b className="item-title">{title}</b>
        <span className="item-subTitle">
          {media_type === 'tv' ? 'TV Series' : 'Movie'}
          <span className="subTitle">{date}</span>
        </span>
        <Button className="btn btn-sm detail" onClick={() => showModal(true)}>
          details
        </Button>
      </div>
      {modal && <Modal media_type={media_type} id={id} showModal={showModal} />}
    </>
  );
}
