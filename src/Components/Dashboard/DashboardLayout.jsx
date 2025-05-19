import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAuth from '../Hooks/useAuth';

const DashboardLayout = () => {
  const { theme } = useAuth();

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen flex bg-white dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
