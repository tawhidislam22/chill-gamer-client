
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Fade } from 'react-awesome-reveal';
import Swal from "sweetalert2";
import { key } from 'localforage';
import {Helmet} from "react-helmet";
const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('https://chill-gamer-server-chi-lime.vercel.app/allgames')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch reviews');
        setLoading(false);
      });
  }, []);

  const userReviews = user ? reviews.filter((review) => review.email === user.email) : [];

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://chill-gamer-server-chi-lime.vercel.app/allgames/${id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              const newReviews = reviews.filter(review => review._id !== id);
              setReviews(newReviews);
              Swal.fire({
                title: "Deleted!",
                text: "Your review has been deleted.",
                icon: "success"
              });
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#36D7B7" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className='dark:bg-gray-900 dark:text-white'>
      <div className="max-w-6xl mx-auto p-8 ">
      <Helmet>
        <title>My Review | Gamer Review</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center">My Reviews</h2>
      {userReviews.length === 0 ? (
        <Fade >
          <p className="text-center mb-80">You have no reviews yet.</p>
        </Fade>
      ) : (
        <Fade>
          <div className="overflow-x-auto ">
            <table className="min-w-full bg-white shadow-md rounded dark:bg-gray-800 dark:text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Game Title</th>
                  <th className="px-4 py-2 border">Rating</th>
                  <th className="px-4 py-2 border">Year</th>
                  <th className="px-4 py-2 border">Genre</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userReviews.map((review) => (
                 
                    <tr className="hover:bg-gray-100 hover:dark:bg-gray-500">
                      <td className="px-4 py-2 border">{review.title}</td>
                      <td className="px-4 py-2 border">{review.rating}</td>
                      <td className="px-4 py-2 border">{review.year}</td>
                      <td className="px-4 py-2 border">{review.genre}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => navigate(`/update/${review._id}`)}
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        </Fade>
      )}
    </div>
    </div>
  );
};

export default MyReviews;
