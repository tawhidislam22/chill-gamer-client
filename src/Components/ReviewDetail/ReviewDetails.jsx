import React, { useState } from 'react';
import {  useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';

const ReviewDetails = () => {
   const game=useLoaderData()
  const [review, setReview] = useState(null);
    setReview(game)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = {
    name: 'Test User', // Replace with actual user data
    email: 'testuser@example.com',
    isLoggedIn: true, // Replace with authentication logic
  };

 


  const handleAddToWatchlist = async () => {
    if (!user.isLoggedIn) {
      toast.error('Please log in to add this to your watchlist.');
      navigate('/login');
      return;
    }

    // const watchlistItem = {
    //   reviewId: review.id,
    //   title: review.title,
    //   coverImage: review.coverImage,
    //   rating: review.rating,
    //   genre: review.genre,
    //   userName: user.name,
    //   userEmail: user.email,
    // };

    // try {
    //   const response = await fetch('http://localhost:5000/api/watchlist', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(watchlistItem),
    //   });

    //   if (!response.ok) throw new Error('Failed to add to watchlist.');

    //   toast.success('Added to your watchlist!');
    // } catch (err) {
    //   toast.error('Failed to add to watchlist. Try again later.');
    // }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{review.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cover Image */}
        <img
          src={review.coverImage}
          alt={review.title}
          className="w-full h-auto rounded shadow-lg"
        />

        {/* Review Details */}
        <div>
          <p className="mb-4 text-lg">
            <strong>Genre:</strong> {review.genre}
          </p>
          <p className="mb-4 text-lg">
            <strong>Rating:</strong> {review.rating}/10
          </p>
          <p className="mb-4 text-lg">
            <strong>Year:</strong> {review.year}
          </p>
          <p className="mb-4 text-lg">
            <strong>Reviewed By:</strong> {review.userName} ({review.userEmail})
          </p>
          <p className="mb-4 text-lg">
            <strong>Description:</strong> {review.description}
          </p>

          {/* Add to Watchlist Button */}
          <button
            onClick={handleAddToWatchlist}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
