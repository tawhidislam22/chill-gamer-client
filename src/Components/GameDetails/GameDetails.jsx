import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import 'animate.css';
import {Helmet} from "react-helmet";
const ReviewDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  // Fetch all games
  useEffect(() => {
    fetch('http://localhost:5000/games')
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((error) => console.error('Failed to fetch games:', error));
  }, []);

  // Fetch watchlist
  useEffect(() => {
    fetch('http://localhost:5000/watchlist')
      .then((res) => res.json())
      .then((data) => setWatchlist(data))
      .catch((error) => console.error('Failed to fetch watchlist:', error));
  }, []);

  // Find the specific review based on ID
  const review = games.find((g) => g._id === id);

  const handleAddToWatchlist = () => {
    if (!review) {
      toast.error('Review not found!');
      return;
    }

    const isAlreadyInWatchlist = watchlist.some(
      (w) => w.title === review.title && w.email === user.email
    );

    if (isAlreadyInWatchlist) {
      toast.warn('Already added to your watchlist!', {
        position: 'top-center',
        autoClose: 1000,
      });
    } else {
      const watchlistEntry = { ...review, email: user.email };

      fetch('http://localhost:5000/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(watchlistEntry),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setWatchlist((prev) => [...prev, watchlistEntry]);
            toast.success('Game added to your watchlist!', {
              position: 'top-center',
              autoClose: 1000,
            });
          }
        })
        .catch((error) => console.error('Failed to add to watchlist:', error));
    }
  };

  if (!review) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading review details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 dark:bg-gray-900 dark:text-white transition animate__animated animate__bounce animate__backInRight">
      <Helmet>
        <title>Review Details | Gamer Review</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">{review.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={review.coverImage}
          alt={review.title}
          className="w-full h-auto rounded shadow-lg"
        />
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
            <strong>Reviewed By:</strong> {review.name} ({review.email})
          </p>
          <p className="mb-4 text-lg">
            <strong>Description:</strong> {review.description}
          </p>
          <button
            onClick={handleAddToWatchlist}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded animate__animated animate__bounce animate__pulse animate__infinite"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
