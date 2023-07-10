import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { img_300, noPicture } from '../config';

import dotenv from 'dotenv';
dotenv.config();
const apikey = process.env.API_KEY;

export default function Carousel({ media_type, id }) {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };
  const [credits, setCredits] = useState([]);
  useEffect(() => {
    const fetchCredits = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${apikey}&language=en-US`
      );
      setCredits(data.cast);
    };

    fetchCredits();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {credits.map((c) => (
          <div className="carouselItem">
            <img
              src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
              alt={c?.name}
              className="carousel_img"
            ></img>
            <b className="carouselItem_text">{c?.name}</b>
          </div>
        ))}
      </Slider>
    </>
  );
}
