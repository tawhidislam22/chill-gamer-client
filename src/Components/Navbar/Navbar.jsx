import React, { useContext } from "react";
import {  NavLink, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Tooltip } from "react-tooltip";
import defaultProfile from "../../assets/defaultProfile.avif";

const Navbar = () => {
  const { user, signOutUser, theme, toggleTheme } = useContext(AuthContext);
  const location=useLocation()
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // Successfully signed out
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          `text-lg font-semibold ${isActive ? "text-blue-500" : ""}`
        }
        to="/"
      >
        <li>Home</li>
      </NavLink>
      {user ? (
        <>
          <NavLink
            className={({ isActive }) =>
              `text-lg font-semibold ${isActive ? "text-blue-500" : ""}`
            }
            to="/allreviews"
          >
            <li>All Reviews</li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-lg font-semibold ${isActive ? "text-blue-500" : ""}`
            }
            to="/addreviews"
          >
            <li>Add Review</li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-lg font-semibold ${isActive ? "text-blue-500" : ""}`
            }
            to="/myreviews"
          >
            <li>My Reviews</li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-lg font-semibold ${isActive ? "text-blue-500" : ""}`
            }
            to="/mywatchlist"
          >
            <li>Game WatchList</li>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className={({ isActive }) =>
              `text-lg font-semibold ${isActive ? "text-blue-500" : ""}`
            }
            to="/login"
          >
            <li>Login</li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-lg font-semibold ${isActive ? "text-blue-500" : ""}`
            }
            to="/register"
          >
            <li>Register</li>
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className={location.pathname==="/"?"navbar w-full py-4 shadow   bg-base-100 dark:bg-gray-900 ":"navbar w-full py-6 shadow bg-base-100 dark:bg-gray-900 "}>
      
      <div className="navbar-start">
        <div className="dropdown ">
          <label
            tabIndex={0}
            role="button"
            className="btn dark:text-gray-500 btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link className="hidden md:block font-semibold text-purple-600 btn btn-ghost text-2xl">
          Game Review
        </Link>
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
      </div>

      
      <div className="navbar-end">
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">
              <img
                className="rounded-full w-10 h-10 border-2 border-purple-600 cursor-pointer"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user?.displayName}
                data-tooltip-place="top"
              
                alt="User Profile"
                src={user ? (user.photoURL ? user.photoURL : defaultProfile) : defaultProfile}
              />
              <Tooltip id="my-tooltip" />
              <button
                onClick={handleSignOut}
                className="ml-3  dark:text-white  btn btn-sm btn-outline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="ml-3 p-2 rounded focus:outline-none"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;