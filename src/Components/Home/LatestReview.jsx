
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { Typewriter } from 'react-simple-typewriter';
import 'animate.css';
const LatestReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     fetch(`http://localhost:5000/allgames`)
     .then(res=>res.json())
     .then(data=>setReviews(data))
       
  },[])
  reviews.map(review=>console.log(review.year))
  const userReviews = reviews.filter((review) => review.year === '2024');
  

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
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
          <div key={review._id} className="bg-white rounded-lg shadow-lg p-4 transition animate__animated animate__bounce animate__backInRight">
            <img
              src={review.coverImage}
              alt={review.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-4">{review.title}</h2>
            <p className="text-gray-600 mt-2 truncate">{review.description}</p>
            <p className="text-gray-800 mt-2">
              <strong>Rating:</strong> {review.rating} / 10
            </p>
            <p className="text-gray-800">
              <strong>Genre:</strong> {review.genre}
            </p>
            <p className="text-gray-800">
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
