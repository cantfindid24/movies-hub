import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from './../config';
import { Button } from 'react-bootstrap';
import Carousel from './Carousel';

import dotenv from 'dotenv';
dotenv.config();
const apikey = process.env.API_KEY;

export default function Modal({ showModal, media_type, id }) {
  const [content, setContent] = useState();
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apikey}&language=en-US`
      );
      setContent(data);
    };
    const fetchvideoData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${apikey}&language=en-US`
      );
      setVideoData(data.results[0]?.key);
    };
    fetchData();
    fetchvideoData();
  });

  return (
    <>
      {content && (
        <div className="modal">
          <div className="overlay"></div>

          <div className="modal-content">
            <img
              className="content_portrait"
              alt={content.name || content.title}
              src={
                content.poster_path
                  ? `${img_500}/${content.poster_path}`
                  : `${unavailable}`
              }
            />
            <img
              src={
                content.backdrop_path
                  ? `${img_500}/${content.backdrop_path}`
                  : unavailableLandscape
              }
              alt={content.name || content.title}
              className="content_landscape"
            />
            <div className="contentModal_about">
              <span className="contentModal_title">
                {content.name || content.title}(
                {(
                  content.first_air_date ||
                  content.release_date ||
                  '-----'
                ).substring(0, 4)}
                )
              </span>
              {content.tagline && <i className="tagline">{content.tagline}</i>}
              {
                <span className="contentModal_description">
                  {content.overview}
                </span>
              }

              <Carousel className="carousel" media_type={media_type} id={id} />

              <Button
                href={`https://www.youtube.com/watch?v=${videoData}`}
                target="_blank"
              >
                Watch the Trailer
              </Button>
            </div>
            <button className="closemodal" onClick={() => showModal(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
