
import { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { MdRateReview, MdPlaylistAddCheck, MdLogout, MdOutlineDashboard, MdDarkMode, MdLightMode, MdListAlt, MdPerson } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Sidebar = () => {
  const { signOutUser, theme, toggleTheme } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setActive(!isActive);

  const handleNavClick = (to) => {
    setActive(false); // close sidebar on mobile
    navigate(to);
  };

  const navItems = [
    { label: 'Dashboard', address: '/dashboard', icon: MdOutlineDashboard },
    { label: 'Add Review', address: '/dashboard/addreviews', icon: MdRateReview },
    { label: 'My Reviews', address: '/dashboard/myreviews', icon: MdListAlt },
    { label: 'My Watch List', address: '/dashboard/mywatchlist', icon: MdPlaylistAddCheck },
    { label: 'Profile', address: '/dashboard/profile', icon: MdPerson },
  ];

  return (
    <>
      {/* Top bar for mobile */}
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex justify-between items-center md:hidden px-4 py-3 shadow">
        <Link to="/">
          <img src="https://i.ibb.co/4ZXzmq5/logo.png" alt="logo" width="100" />
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="text-xl">
            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <button onClick={handleToggle}>
            <AiOutlineBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`z-20 md:fixed h-screen flex flex-col justify-between overflow-x-hidden 
        bg-white dark:bg-gray-900 text-gray-800 dark:text-white
        w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform 
        ${isActive ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative md:top-0 transition duration-200 ease-in-out`}
      >
        <div>
          {/* Logo for desktop */}
          <div className="hidden md:flex justify-center items-center py-3 mb-6 bg-lime-100 dark:bg-lime-700 rounded-lg shadow">
            <Link to="/" className="text-lg font-semibold">
              GameReview
            </Link>
          </div>

          {/* Navigation items */}
          <nav className="flex flex-col gap-2">
            {navItems.map(({ label, address, icon: Icon }) => (
              <button
                key={address}
                onClick={() => handleNavClick(address)}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
              >
                <Icon className="w-5 h-5" />
                <span className="ml-3 font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom controls */}
        <div>
          <hr className="border-gray-400 dark:border-gray-600 my-3" />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition"
          >
            {theme === 'light' ? (
              <MdDarkMode className="w-5 h-5" />
            ) : (
              <MdLightMode className="w-5 h-5" />
            )}
            <span className="ml-3 font-medium">Toggle Theme</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              setActive(false);
              signOutUser();
            }}
            className="flex w-full items-center px-4 py-2 mt-3 text-sm hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 transition rounded"
          >
            <MdLogout className="w-5 h-5" />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
