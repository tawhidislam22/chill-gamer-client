
import React, { useEffect, useState } from 'react';


import axios from 'axios';
import Banner from './Banner';
import ReviewCard from './ReviewCard';

const Home = () => {
  const [highestRatedGames, setHighestRatedGames] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:5000/games')
    .then(res=>res.json())
    .then(data=>setHighestRatedGames(data))
  },[])
 

  return (
    <div>

      
      <Banner></Banner>

      
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-3xl font-semibold">Highest Rated Games</h2>
          <p className="mt-2 text-lg">Explore the top-rated games based on user reviews.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {highestRatedGames.map((game) => (
            <ReviewCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Extra Sections */}
      <section className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-3xl font-semibold">Latest Reviews</h2>
          <p className="mt-2 text-lg">Check out the latest reviews from the Chill Gamer community.</p>
        </div>
        {/* Add some content or dynamically fetch latest reviews */}
        <div className="flex justify-center space-x-6">
          <div className="w-64 h-40 bg-gray-700 rounded-lg"></div>
          <div className="w-64 h-40 bg-gray-700 rounded-lg"></div>
          <div className="w-64 h-40 bg-gray-700 rounded-lg"></div>
        </div>
      </section>

      <section className="py-12 bg-gray-700 text-white">
        <div className="container mx-auto text-center mb-8">
          <h2 className="text-3xl font-semibold">Trending Games</h2>
          <p className="mt-2 text-lg">Discover the most talked-about games right now.</p>
        </div>
        {/* Add trending games content */}
        <div className="flex justify-center space-x-6">
          <div className="w-64 h-40 bg-gray-600 rounded-lg"></div>
          <div className="w-64 h-40 bg-gray-600 rounded-lg"></div>
          <div className="w-64 h-40 bg-gray-600 rounded-lg"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
