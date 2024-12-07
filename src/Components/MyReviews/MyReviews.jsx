
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { AuthContext } from '../AuthProvider/AuthProvider';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/allgames')
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
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    fetch(`http://localhost:5000/allgames/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
          toast.success('Review deleted successfully!');
        } else {
          toast.error('Failed to delete the review.');
        }
      })
      .catch(() => {
        toast.error('An error occurred while deleting the review.');
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
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Reviews</h2>
      {userReviews.length === 0 ? (
        <p className="text-center">You have no reviews yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
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
              {userReviews.map((userReview) => (
                <tr key={userReview._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{userReview.title}</td>
                  <td className="px-4 py-2 border">{userReview.rating}</td>
                  <td className="px-4 py-2 border">{userReview.year}</td>
                  <td className="px-4 py-2 border">{userReview.genre}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => navigate(`/update/${userReview._id}`)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(userReview._id)}
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
      )}
    </div>
  );
};

export default MyReviews;
