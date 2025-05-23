
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { Typewriter } from 'react-simple-typewriter';

import AOS from 'aos';
import 'aos/dist/aos.css';
const LatestReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     fetch(`https://chill-gamer-server-chi-lime.vercel.app/allgames`)
     .then(res=>res.json())
     .then(data=>setReviews(data))
       
  },[])
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
      once: false,
      mirror: true 
    });
  }, []);
  
  const userReviews = reviews.filter((review) => review.year === '2024');
  

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-8 bg-slate-100 dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl text-blue-500 font-bold text-center mb-8">
      <Typewriter
        words={['Latest Reviews', 'High Rated Games', 'Hot Picks']}
        loop={0} // Number of times to loop the words. Use `0` for infinite looping.
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userReviews.map((review) => (
          <div key={review._id} data-aos="zoom-in-up"  className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-4 ">
            <img
              src={review.coverImage}
              alt={review.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-4">{review.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 truncate">{review.description}</p>
            <p className="text-gray-800 dark:text-gray-400 mt-2">
              <strong>Rating:</strong> {review.rating} / 10
            </p>
            <p className="text-gray-800 dark:text-gray-400">
              <strong>Genre:</strong> {review.genre}
            </p>
            <p className="text-gray-800 dark:text-gray-400">
              <strong>Year:</strong> {review.year}
            </p>
            <Link
              to={`/details/${review._id}`}
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  animate__animated animate__bounce animate__pulse animate__infinite"
            >
              Explore Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReview;
