import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { AiOutlineBars } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import useAuth from '../Hooks/useAuth';

const Sidebar = () => {
  const { signOutUser, theme, toggleTheme } = useAuth();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => setActive(!isActive);

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex justify-between md:hidden'>
        <div className='block cursor-pointer p-4 font-bold'>
          <Link to='/'>
            <img src='https://i.ibb.co/4ZXzmq5/logo.png' alt='logo' width='100' />
          </Link>
        </div>
        <div className='flex items-center'>
          {/* Theme toggle for small screen */}
          <button onClick={toggleTheme} className='mr-4 text-xl'>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={handleToggle} className='mobile-menu-button p-4'>
            <AiOutlineBars className='h-5 w-5' />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden 
        bg-white dark:bg-gray-900 text-gray-800 dark:text-white
        w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform 
        ${isActive ? '-translate-x-full' : ''}
        md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          {/* Top Logo for Desktop */}
          <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 dark:bg-lime-700 mx-auto'>
            <Link to='/' className='text-lg font-semibold'>
              Back
            </Link>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              <MenuItem icon={FcSettings} label='Add Review' address='/dashboard/addreviews' />
              <MenuItem icon={FcSettings} label='My Reviews' address='/dashboard/myreviews' />
              <MenuItem icon={FcSettings} label='My Watch list' address='/dashboard/mywatchlist' />
              <MenuItem icon={FcSettings} label='Testimonial' address='/dashboard/testimonial' />
            </nav>
          </div>
        </div>

        <div>
          <hr className="border-gray-400 dark:border-gray-600" />
          <MenuItem icon={FcSettings} label='Profile' address='/dashboard/profile' />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className='flex w-full items-center px-4 py-2 mt-3 text-sm hover:bg-gray-300 dark:hover:bg-gray-700 rounded transition'
          >
            <span className='text-xl'>{theme === 'light' ? '🌙' : '☀️'}</span>
            <span className='ml-3 font-medium'>Toggle Theme</span>
          </button>

          {/* Logout */}
          <button
            onClick={signOutUser}
            className='flex w-full items-center px-4 py-2 mt-3 text-sm hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 transition rounded'
          >
            <GrLogout className='w-5 h-5' />
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
