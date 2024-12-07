
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterGenre, setFilterGenre] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
   
        fetch('http://localhost:5000/allgames')
        .then(res=>res.json())
        .then(data=>{setReviews(data)
            setLoading(false)
        }
    )
  }, []);

  // Handle Sorting
  const handleSort = (option) => {
    const sortedReviews = [...reviews];
    if (option === 'ratingAsc') {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    } else if (option === 'ratingDesc') {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (option === 'yearAsc') {
      sortedReviews.sort((a, b) => a.year - b.year);
    } else if (option === 'yearDesc') {
      sortedReviews.sort((a, b) => b.year - a.year);
    }
    setReviews(sortedReviews);
    setSortOption(option);
  };

  // Handle Genre Filtering
  const handleFilter = (genre) => {
    setFilterGenre(genre);
  };

  const filteredReviews = filterGenre
    ? reviews.filter((review) => review.genre === filterGenre)
    : reviews;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Reviews</h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        {/* Sort Dropdown */}
        <div className="mb-4">
          <label className="font-medium mr-2">Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2 rounded bg-gray-200"
          >
            <option value="">Select</option>
            <option value="ratingAsc">Rating (Low to High)</option>
            <option value="ratingDesc">Rating (High to Low)</option>
            <option value="yearAsc">Year (Oldest First)</option>
            <option value="yearDesc">Year (Newest First)</option>
          </select>
        </div>

        {/* Genre Filter */}
        <div className="mb-4">
          <label className="font-medium mr-2">Filter by Genre:</label>
          <select
            value={filterGenre}
            onChange={(e) => handleFilter(e.target.value)}
            className="px-4 py-2 rounded bg-gray-200"
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Adventure">Adventure</option>
            <option value="FPS">FPS</option>
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Cover Image */}
              <img
                src={review.coverImage}
                alt={review.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{review.title}</h3>
                {/* Rating */}
                <p className="mb-2">Rating: {review.rating}/10</p>
                {/* Genre */}
                <p className="mb-2">Genre: {review.genre}</p>
                {/* Explore Details */}
                <button
                  onClick={() => navigate(`/details/${review._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Explore Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
