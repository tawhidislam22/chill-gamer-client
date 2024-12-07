import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const MyReview = ({userReview,reviews}) => {
    const {_id}=userReview
    const navigate=useNavigate()
    const handleDelete = ()=> {
        
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
            console.log(_id)
              fetch(`http://localhost:5000/allgames/${_id}`, {
                  method: "DELETE"
              })
                  .then(res => res.json())
                  .then(data => {
                      if (data.deletedCount > 0) {
                          const newReviews=reviews.filter(review=>review._id!==id)
                          setReviews(newReviews)
                          Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success"
                          });
                      }
                  })
          }
      });
        
          
          
      };
    return (
        <div>
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
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr> 
            </tbody>
          </table>
        </div>
            
        </div>
    );
};

export default MyReview;