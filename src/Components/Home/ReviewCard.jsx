import React from 'react';
import { Link } from 'react-router-dom';

const ReviewCard = ({ game }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden">
      <img
        src={game.coverImage}
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{game.title}</h3>
        <p className="text-sm mt-2">{game.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-yellow-400">{game.rating} ★</span>
          <Link to={`/gameDetails/${game.id}`} className="text-blue-400 hover:underline">
            Explore Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
