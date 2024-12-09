
import React, { useEffect, useState } from 'react';

import Lottie from "lottie-react";
import axios from 'axios';
import Banner from './Banner';
import ReviewCard from './ReviewCard';
import NewsLetter from '../NewsLetter/NewsLetter';
import LatestReview from './LatestReview';
import game1 from './../../assets/game1.json'
import game2 from './../../assets/game2.json'
import game3 from './../../assets/game3.json'
import {Helmet} from "react-helmet";
const Home = () => {
  const [highestRatedGames, setHighestRatedGames] = useState([]);
  
  useEffect(()=>{
    fetch('https://chill-gamer-server-chi-lime.vercel.app/games')
    .then(res=>res.json())
    .then(data=>setHighestRatedGames(data))
  },[])
  

  
 
  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white'>
      <Helmet>
        <title>Home | Gamer Review</title>
      </Helmet>
      
      <Banner highestRatedGames={highestRatedGames}></Banner>

      
      <section className="py-12 text-gray-900  dark:bg-gray-900 dark:text-white  bg-white">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-3xl font-semibold">Highest Rated Games</h2>
          <p className="mt-2 text-lg">Explore the top-rated games based on user reviews.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {highestRatedGames.map((game) => (
            <ReviewCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Extra Sections */}
      <section className="py-12 dark:bg-gray-900 dark:text-white">
        <LatestReview></LatestReview>
      </section>

      <section className="py-12 dark:bg-gray-900 dark:text-white ">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-3xl font-semibold">Trending Games</h2>
          <p className="mt-2 text-lg">Discover the most talked-about games right now.</p>
        </div>
        {/* Add trending games content */}
        <div className="flex flex-col md:flex-row  justify-center  space-x-6">
          <div className="w-64  bg-slate-100 dark:bg-gray-600 rounded-lg">
            <Lottie animationData={game1}></Lottie>
          </div>
          <div className="w-64 bg-slate-100  dark:bg-gray-600 rounded-lg">
          <Lottie animationData={game2}></Lottie>
          </div>
          <div className="w-64 bg-slate-100 dark:bg-gray-600 rounded-lg">
          <Lottie animationData={game3}></Lottie>
          </div>
        </div>
      </section>
      <div className='p-8 '>
      <NewsLetter></NewsLetter>
      </div>
    </div>
  );
};

export default Home;
