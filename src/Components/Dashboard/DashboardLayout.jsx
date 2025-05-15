import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAuth from '../Hooks/useAuth';

const DashboardLayout = () => {
  const { theme } = useAuth();

  return (
    <div className={`relative min-h-screen md:flex bg-white ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Left Side: Sidebar Component */}
      <Sidebar />

      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1 md:ml-64 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
