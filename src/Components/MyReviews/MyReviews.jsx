
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { AuthContext } from '../AuthProvider/AuthProvider';
import MyReview from './MyReview';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  
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
      userReviews.map((userReview) => (
        <MyReview key={userReview._id} userReview={userReview} reviews={reviews}></MyReview>
      ))
    )}
    </div>
  );
};

export default MyReviews;
