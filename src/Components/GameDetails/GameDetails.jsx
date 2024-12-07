
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
 
const GameDetails = () => {
  const games=useLoaderData()
  const [game, setGame] = useState(null);
  setGame(games)
  
   
  const navigate = useNavigate();

 

  const handleAddToWatchlist = async () => {
    

    
      fetch(`http://localhost:5000/watchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
      });

      

      
    
  };

  

  

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">{game.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Game Cover Image */}
        <div>
          <img
            src={game.coverImage}
            alt=''
            className="w-full rounded shadow-lg"
          />
        </div>

        {/* Game Details */}
        <div>
          <p className="text-lg mb-4">
            <strong>Description:</strong> {game.description}
          </p>
          <p className="text-lg mb-4">
            <strong>Rating:</strong> {game.rating} / 10
          </p>
          <p className="text-lg mb-4">
            <strong>Genre:</strong> {game.genre}
          </p>
          <p className="text-lg mb-4">
            <strong>Year:</strong> {game.year}
          </p>
          

          {/* Add to Watchlist Button */}
          <button
            onClick={handleAddToWatchlist}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
