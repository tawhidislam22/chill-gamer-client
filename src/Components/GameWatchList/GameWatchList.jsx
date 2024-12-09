import React, { useContext, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
import { Fade } from 'react-awesome-reveal';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Helmet } from "react-helmet";
const GameWatchList = () => {
    const { user } = useContext(AuthContext);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://chill-gamer-server-chi-lime.vercel.app/watchlist')
            .then((res) => res.json())
            .then((data) => {
                setWatchlist(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch watchlist:', err);
                setLoading(false);
            });
    }, []);

    const handleRemove = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://chill-gamer-server-chi-lime.vercel.app/watchlist/${id}`, { method: 'DELETE' })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            const newWatchList = watchlist.filter((w) => w._id !== id);
                            setWatchlist(newWatchList);
                            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                        }
                    });
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Helmet>
        <title>Game WatchList | Gamer Review</title>
      </Helmet>
                <ClipLoader color="#00bfff" loading={loading} size={50} />
            </div>
        );
    }

    const userWatchList = user ? watchlist.filter((w) => w.email === user.email) : [];

    if (userWatchList.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen dark:bg-gray-900 dark:text-white">
                <Helmet>
                    <title>Game WatchList | Gamer Review</title>
                </Helmet>
                <Fade>
                    <p className="text-lg text-gray-500 mb-4">Your watchlist is currently empty.</p>
                    <a
                        href="/"
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        Explore Games
                    </a>
                </Fade>
            </div>
        );
    }

    return (
        <div className='dark:bg-gray-900 dark:text-white'>
            <div className="max-w-5xl mx-auto p-8 '">
            <Fade >
                <h1 className="text-4xl font-bold mb-6 text-center">My Watchlist</h1>
                <div className='overflow-x-auto'>
                <table className="w-full border-collapse border border-gray-300 dark:bg-gray-800 dark:text-white">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800 dark:text-white">
                            <th className="border border-gray-300 px-4 py-2">Game Title</th>
                            <th className="border border-gray-300 px-4 py-2">Genre</th>
                            <th className="border border-gray-300 px-4 py-2">Year</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userWatchList.map((item) => (

                            <tr>

                                <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.genre}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.year}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                                    >
                                        Remove
                                    </button>
                                </td>

                            </tr>

                        ))}
                    </tbody>
                </table>
                </div>
            </Fade>
        </div>
        </div>
    );
};

export default GameWatchList;
