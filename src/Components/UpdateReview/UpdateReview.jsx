

import { useNavigate, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";
const UpdateReview = () => {

    const review = useLoaderData()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const coverImage = form.coverImage.value;
        const title = form.title.value;
        const description = form.description.value;
        const rating = form.rating.value;
        const year = form.year.value;
        const genre = form.genre.value;
        const updatedReview = { coverImage, title, description, rating, year, genre }
        fetch(`https://chill-gamer-server-chi-lime.vercel.app/allgames/${review._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReview),
        })
            .then(res => res.json())
            .then(data => {

                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Review Updated Done!",
                        text: "Please Checked The All Review Page!",
                        icon: "success"
                    });
                    navigate('/myreviews')
                }
            })


    };



    return (
        <div className="max-w-4xl mx-auto p-8 dark:bg-gray-900 dark:text-white">
            <Helmet>
                <title>Update Review | Gamer Review</title>
            </Helmet>
            <h1 className="text-3xl font-bold mb-6 text-center">Update Review</h1>

            <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Game Title */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Game Title</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={review.title}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Game Cover Image URL</label>
                        <input
                            type="text"
                            name="coverImage"
                            defaultValue={review.coverImage}
                            className="w-full border px-4 py-2 rounded"
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Rating</label>
                        <input
                            type="text"
                            name="rating"
                            defaultValue={review.rating}
                            className="w-full border px-4 py-2 rounded"

                            required
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Year</label>
                        <input
                            type="number"
                            name="year"
                            defaultValue={review.year}
                            className="w-full border px-4 py-2 rounded"
                            min={2021}
                            max={2024}
                            required
                        />
                    </div>

                    {/* Genre */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Genre</label>
                        <select
                            name="genre"
                            defaultValue={review.genre}
                            className="w-full border px-4 py-2 rounded"
                            required
                        >
                            <option value="Action">Action</option>
                            <option value="RPG">RPG</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Shooter">FPS</option>

                        </select>
                    </div>

                    {/* Review Description */}
                    <div className="md:col-span-2">
                        <label className="block text-lg font-semibold mb-2">Review Description</label>
                        <textarea
                            name="description"
                            defaultValue={review.description}
                            className="w-full border px-4 py-2 rounded"
                            rows="5"
                            required
                        />
                    </div>

                    {/* User Name (Read-Only) */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">User Name</label>
                        <input
                            type="text"
                            value={review.name}
                            className="w-full border px-4 py-2 rounded bg-gray-100 cursor-not-allowed"
                            readOnly
                        />
                    </div>

                    {/* User Email (Read-Only) */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">User Email</label>
                        <input
                            type="email"
                            value={review.email}
                            className="w-full border px-4 py-2 rounded bg-gray-100 cursor-not-allowed"
                            readOnly
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
                >
                    Update Review
                </button>
            </form>
        </div>
    );
};

export default UpdateReview;
