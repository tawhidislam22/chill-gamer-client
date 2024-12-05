import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200  py-8">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div>
            <h2 className="text-lg font-semibold mb-4">About Chill Gamer</h2>
            <p className="text-sm">
              Chill Gamer is your go-to platform for exploring and sharing game reviews. Discover trending games, top-rated titles, and connect with fellow gamers.
            </p>
          </div>

          
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/allreviews" className="hover:underline">
                  All Reviews
                </a>
              </li>
              <li>
                <a href="/addreviews" className="hover:underline">
                  Add Review
                </a>
              </li>
              <li>
                <a href="/myreviews" className="hover:underline">
                  My Reviews
                </a>
              </li>
            </ul>
          </div>

          
          <div >
            <h2 className="text-lg font-semibold mb-4">Connect with Us</h2>
            <p className="text-sm mb-4">Have questions or feedback? Reach out to us:</p>
            <ul className="space-y-2 text-sm">
              <li>Email: chillgamer@gmail.com</li>
              <li>Phone: +123 456 7890</li>
            </ul>
            <div className="flex mt-4 space-x-4 w-full items-center justify-center">
              <a href="#" className="text-gray-400 hover:text-gray-100">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-100">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-100">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-100">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} Chill Gamer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


