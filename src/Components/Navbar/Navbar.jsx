
import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import defaultProfile from "../../assets/defaultProfile.avif";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser, theme, toggleTheme } = useAuth();

  const handleSignOut = () => {
    signOutUser().catch((err) => console.error("Logout failed:", err));
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
          { to: "/resister", label: "Register" },
        ]),
  ];

  return (
    <>
      {/* Sticky Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            <Link to="/">GameReview</Link>
          </div>

          {/* Center Nav */}
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

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <img
                  src={user.photoURL || defaultProfile}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-purple-500"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName}
                />
                <Tooltip id="user-tooltip" />
                <button
                  onClick={handleSignOut}
                  className="btn btn-sm btn-outline dark:text-white"
                >
                  Sign Out
                </button>
              </>
            ) : null}

            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              className="text-xl"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden px-4 pb-3 flex flex-wrap gap-4 justify-center">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
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
        </div>
      </header>

      {/* Spacer to push content below fixed navbar */}
      <div className="h-[72px]" />
    </>
  );
};

export default Navbar;
