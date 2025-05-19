
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import defaultProfile from "../../assets/defaultProfile.avif";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser, theme, toggleTheme } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser().catch((err) => console.error("Logout failed:", err));
    setMenuOpen(false); // close menu after signout
  };

  const navLinks = [
    { to: "/", label: "Home" },
    ...(user
      ? [
          { to: "/allreviews", label: "All Reviews" },
          { to: "/dashboard", label: "Dashboard" },
        ]
      : [
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ]),
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            <Link to="/">GameReview</Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-base font-medium transition ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-700 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <img
                  tabIndex={0}
                  src={user.photoURL || defaultProfile}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-purple-500 cursor-pointer"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName}
                />
                <Tooltip id="user-tooltip" place="bottom" delayShow={200} />

                {/* Show Sign Out on large screens (≥ 400px) */}
                <button
                  onClick={handleSignOut}
                  className="btn btn-sm btn-outline dark:text-white hidden sm:inline-block"
                >
                  Sign Out
                </button>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              className="text-xl"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl focus:outline-none"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-3 flex flex-col gap-3 bg-white dark:bg-gray-900 shadow-inner">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Show Sign Out inside mobile menu on < 640px (sm) */}
            {user && (
              <button
                onClick={handleSignOut}
                className="btn btn-sm btn-outline dark:text-white sm:hidden"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-[72px]" />
    </>
  );
};

export default Navbar;
