import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Tooltip } from 'react-tooltip'
import defaultProfile from './../../assets/defaultProfile.avif'
const Navbar = () => {
    const { user,signOutUser } = useContext(AuthContext)
    const handleSignOut=()=>{
        signOutUser()
        .then(()=>{
            
        })
        .catch(error=>{
            
        })
    }
    const links = <>
        <Link className="text-lg font-semibold" to='/'><li><a>Home</a></li></Link>
        {
            user ? <>
                <NavLink className="text-lg font-semibold" to='/allreviews'><li><a>All Reviews</a></li></NavLink>
                <NavLink className="text-lg font-semibold" to='/addreviews'><li><a>Add Review</a></li></NavLink>
                <NavLink className="text-lg font-semibold" to='/myreviews'><li><a>My Reviews </a></li></NavLink>
            </> : <>
                <NavLink className="text-lg font-semibold" to='/login'><li><a>Login</a></li></NavLink>
                <NavLink className="text-lg font-semibold" to='/resister'><li><a>Resister</a></li></NavLink>

            </>
        }

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}

                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className="flex justify-center items-center">
                            
                            <img className="rounded-full  w-16 border-2 border-purple-600 cursor-pointer"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={user?.displayName }
                                data-tooltip-place="top"
                                alt=""
                                src={user?user.photoURL?user.photoURL:defaultProfile:defaultProfile} />
                            <Tooltip id="my-tooltip" />
                            <Link onClick={handleSignOut} to='/login' className="ml-2 btn">Sign Out</Link>
                        </div>
                        :
                        <Link to="/login" className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;