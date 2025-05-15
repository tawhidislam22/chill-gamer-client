import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '', rating: 5 });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('https://chill-gamer-server-chi-lime.vercel.app/testimonials');
        setTestimonials(res.data);
      } catch (err) {
        console.error('Failed to load testimonials', err);
      }
    };
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://your-server-url.com/testimonials', {
        ...formData,
        date: new Date(),
      });
      setTestimonials([res.data, ...testimonials]); // prepend new testimonial
      setFormData({ name: '', message: '', rating: 5 });
    } catch (err) {
      console.error('Submit failed', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Testimonials</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded shadow">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Your Name"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Your Testimonial"
          required
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className="w-full border p-2 rounded"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
      </form>

      {/* Display testimonials */}
      <div className="space-y-6">
        {testimonials.map((t) => (
          <div key={t._id} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="font-bold text-lg">{t.name}</h3>
            <p className="text-sm text-gray-700">{t.message}</p>
            <p className="text-yellow-500">Rating: {t.rating}⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
