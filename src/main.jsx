import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root.jsx';
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import Login from './Components/Login/Login.jsx';
import Resister from './Components/Resister/Resister.jsx';
import AllReviews from './Components/AllReviews/AllReviews.jsx';
import AddReviews from './Components/AddReviews/AddReviews.jsx';
import MyReviews from './Components/MyReviews/MyReviews.jsx';
import AuthProvider from './Components/AuthProvider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/resister",
        element:<Resister></Resister>
      },
      {
        path:"/allreviews",
        element:<AllReviews></AllReviews>
      },
      {
        path:"/addreviews",
        element:<AddReviews></AddReviews>
      },
      {
        path:"/myreviews",
        element:<MyReviews></MyReviews>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </StrictMode>,
)
