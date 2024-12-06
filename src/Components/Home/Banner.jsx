
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="relative">
      <Slider {...settings}>
        <div className="bg-blue-500 h-80 flex justify-center items-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold">Welcome to Chill Gamer</h1>
            <p className="mt-4 text-lg">Explore the world of games and reviews!</p>
          </div>
        </div>
        <div className="bg-green-500 h-80 flex justify-center items-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold">Game Reviews at Your Fingertips</h1>
            <p className="mt-4 text-lg">Find the best games based on user reviews and ratings.</p>
          </div>
        </div>
        <div className="bg-purple-500 h-80 flex justify-center items-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold">Join the Community</h1>
            <p className="mt-4 text-lg">Share your thoughts and discover new games!</p>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Banner;
