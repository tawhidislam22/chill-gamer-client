import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
const AddReviews = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const coverImage = form.coverImage.value;
        const title = form.title.value;
        const description = form.description.value;
        const rating = form.rating.value;
        const year = form.year.value;
        const genre = form.genre.value;
        const name = form.name.value;
        const email = form.email.value;
        const newGame = { coverImage, title, description, rating, year, genre, name, email };
        console.log(newGame);

        fetch('http://localhost:5000/allgames', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newGame),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: "Your Review Added!",
                    text: "Please Check The My Review Page!",
                    icon: "success",
                });
                e.target.reset();
                navigate('/');
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-8  text-gray-900 rounded-lg shadow-xl dark:bg-gray-900 dark:text-white">
            <Helmet>
                <title>Add Reviews | Gamer Review</title>
            </Helmet>
            <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-400">Add Your Game Review</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cover Image URL */}
                <div>
                    <label className="block mb-2 font-semibold">Game Cover Image URL:</label>
                    <input
                        type="text"
                        name="coverImage"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter the image URL"
                        required
                    />
                </div>

                {/* Game Title */}
                <div>
                    <label className="block mb-2 font-semibold">Game Title:</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter the game title"
                        required
                    />
                </div>

                {/* Review Description */}
                <div>
                    <label className="block mb-2 font-semibold">Review Description:</label>
                    <textarea
                        name="description"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Share your thoughts about the game"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Rating */}
                <div>
                    <label className="block mb-2 font-semibold">Rating (1-10):</label>
                    <input
                        type="number"
                        name="rating"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your rating"
                        min="1"
                        max="10"
                        required
                    />
                </div>

                {/* Publishing Year */}
                <div>
                    <label className="block mb-2 font-semibold">Publishing Year:</label>
                    <input
                        type="number"
                        name="year"
                        min={2021}
                        max={2024}
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter the year of release"
                        required
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block mb-2 font-semibold">Genre:</label>
                    <select
                        name="genre"
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    >
                        <option value="">Select a Genre</option>
                        <option value="Action">Action</option>
                        <option value="RPG">RPG</option>
                        <option value="Adventure">Adventure</option>
                        <option value="FPS">FPS</option>
                    </select>
                </div>

                {/* User Name */}
                <div>
                    <label className="block mb-2 font-semibold">Your Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user?.displayName}
                        readOnly
                        className="w-full px-4 py-2 rounded bg-gray-600 text-gray-400 cursor-not-allowed"
                    />
                </div>

                {/* User Email */}
                <div>
                    <label className="block mb-2 font-semibold">Your Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user?.email}
                        readOnly
                        className="w-full px-4 py-2 rounded bg-gray-600 text-gray-400 cursor-not-allowed"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default AddReviews;
