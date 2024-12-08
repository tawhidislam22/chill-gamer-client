import React, { useState } from "react";
import { toast } from "react-toastify";
const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscription = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribe Successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      });
      setEmail("");
    } else {
      toast.warn('Please input your email!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
    }
  };

  return (
    <section className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-12 rounded-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6">
          Subscribe to our newsletter and never miss an update on the latest
          coupons and deals.
        </p>
        <form
          onSubmit={handleSubscription}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md text-gray-800 w-full md:w-1/2"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-gray-100"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
