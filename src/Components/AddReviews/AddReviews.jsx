import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AddReviews = () => {
    const {user}=useContext(AuthContext)
    const navigate=useNavigate()
    const handleSubmit =  (e) => {
        e.preventDefault();
        const form=e.target;
        const coverImage=form.coverImage.value;
        const title=form.title.value;
        const description=form.description.value;
        const rating=form.rating.value;
        const year=form.year.value;
        const genre=form.genre.value;
        const name=form.name.value;
        const email=form.email.value;
        const newGame={coverImage,title,description,rating,year,genre,name,email}
        console.log(newGame)
         
        fetch('http://localhost:5000/allgames', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(newGame)
          })
          .then(res=>res.json())
          .then(data=>{
            console.log(data)
            Swal.fire({
              title: "Your Review Added!",
              text: "Please Checked The My Review Page!",
              icon: "success"
            });
            e.target.reset()
            navigate('/')
          })
    
          
        
      };
    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Add New Review</h2>
        
  
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block mb-2">Game Cover Image URL:</label>
            <input
              type="text"
              name="coverImage"
              
              
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
  
          
          <div className="mb-4">
            <label className="block mb-2">Game Title:</label>
            <input
              type="text"
              name="title"
              
              
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
  
          
          <div className="mb-4">
            <label className="block mb-2">Review Description:</label>
            <textarea
              name="description"
              
              
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              rows="4"
              required
            ></textarea>
          </div>
  
          {/* Rating */}
          <div className="mb-4">
            <label className="block mb-2">Rating (1-10):</label>
            <input
              type="text"
              name="rating"
             
              
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              
              required
            />
          </div>
  
          {/* Publishing Year */}
          <div className="mb-4">
            <label className="block mb-2">Publishing Year:</label>
            <input
              type="number"
              name="year"
              
              
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
  
          {/* Genre */}
          <div className="mb-4">
            <label className="block mb-2">Genre:</label>
            <select
              name="genre"
              
              
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              required
            >
              <option value="">Select a Genre</option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Adventure">Adventure</option>
              <option value="FPS">FPS</option>
            </select>
          </div>
  
          {/* User Info */}
          <div className="mb-4">
            <label className="block mb-2">Your Name:</label>
            <input
              type="text"
              name='name'
              value={user?.displayName}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Your Email:</label>
            <input
              type="email"
              name='email'
              value={user.email}
      
              className="w-full px-4 py-2 rounded bg-gray-700 text-white cursor-not-allowed"
            />
          </div>
  
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>
    );
};

export default AddReviews;