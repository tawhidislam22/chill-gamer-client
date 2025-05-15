import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root.jsx';
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import Login from './Components/Login/Login.jsx';
import AllReviews from './Components/AllReviews/AllReviews.jsx';
import AddReviews from './Components/AddReviews/AddReviews.jsx';
import MyReviews from './Components/MyReviews/MyReviews.jsx';
import AuthProvider from './Components/AuthProvider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import ReviewDetails from './Components/ReviewDetail/ReviewDetails.jsx';
import UpdateReview from './Components/UpdateReview/UpdateReview.jsx';
import Home from './Components/Home/Home.jsx';
import GameDetails from './Components/GameDetails/GameDetails.jsx';
import GameWatchList from './Components/GameWatchList/GameWatchList.jsx';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import Testimonials from './Components/Testimonial/Testimonial.jsx';
import DashboardLayout from './Components/Dashboard/DashboardLayout.jsx';
import Profile from './Components/Dashboard/Common/Profile.jsx';
import Statistics from './Components/Dashboard/Statistics.jsx';
import Register from './Components/Resister/Register.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/allreviews",
        element: <PrivateRoute><AllReviews></AllReviews></PrivateRoute>
      },
      
      
      
      {
        path: "/details/:id",
        element: <PrivateRoute><ReviewDetails></ReviewDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://chill-gamer-server-chi-lime.vercel.app/allgames/${params.id}`)
      },
      {
        path: "/gameDetails/:id",
        element: <PrivateRoute><GameDetails></GameDetails></PrivateRoute>,
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><UpdateReview></UpdateReview></PrivateRoute>,
        loader: ({ params }) => fetch(`https://chill-gamer-server-chi-lime.vercel.app/allgames/${params.id}`)
      }
    ]
  },
  {
    path:'/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        index:true,
        element:<Statistics></Statistics>
      },
      {
        path:'profile',
        element:<Profile></Profile>
      },
      {
        path: "addreviews",
        element: <PrivateRoute><AddReviews></AddReviews></PrivateRoute>
      },
      {
        path: "myreviews",
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path: "mywatchlist",
        element: <PrivateRoute><GameWatchList></GameWatchList></PrivateRoute>
      }
      ,
      {
        path:'testimonial',
        element:<Testimonials></Testimonials>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />

  </StrictMode>,
)
