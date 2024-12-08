import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import 'animate.css';
import {Helmet} from "react-helmet";
const ReviewDetails = () => {
  const { user } = useContext(AuthContext)
  const review = useLoaderData()
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/watchlist')
      .then(res => res.json())
      .then(data => setWatchlist(data))
  }, [])
  const handleAddToWatchlist = () => {
    const checked = watchlist.find(w => w.title === review.title && w.email === review.email)
    if (checked) {
      toast.warn('Already added your watch list!', {
        position: "top-center",
        autoClose: 1002,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });

    } else {
      review.email = user.email
      fetch(`http://localhost:5000/watchlist`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(review),
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            toast.success('🦄 This Game added your watch list!', {
              position: "top-center",
              autoClose: 1002,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",

            });
          }
        })
    }

  }




  return (
    <div className="max-w-4xl dark:bg-gray-900 dark:text-white mx-auto p-8 transition animate__animated animate__bounce animate__backInRight">
      <Helmet>
        <title>Review Details | Gamer Review</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">{review.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <img
          src={review.coverImage}
          alt=''
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
            <strong>Reviewed By:</strong> {review.name} ({review.mail})
          </p>
          <p className="mb-4 text-lg">
            <strong>Description:</strong> {review.description}
          </p>

          {/* Add to Watchlist Button */}
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
