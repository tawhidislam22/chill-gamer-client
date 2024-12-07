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
import ReviewDetails from './Components/ReviewDetail/ReviewDetails.jsx';
import UpdateReview from './Components/UpdateReview/UpdateReview.jsx';
import Home from './Components/Home/Home.jsx';
import GameDetails from './Components/GameDetails/GameDetails.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
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
      },
      {
        path:"/details/:id",
        element:<ReviewDetails></ReviewDetails>,
        loader:({params})=>fetch(`http://localhost:5000/allgames/${params.id}`)
      },
      {
        path:"/gameDetails/:id",
        element:<GameDetails></GameDetails>,
        loader:({params})=>fetch(`http://localhost:5000/games/${params.id}`)
      },
      {
        path:"/update/:id",
        element:<UpdateReview></UpdateReview>,
        loader:({params})=>fetch(`http://localhost:5000/allgames/${params.id}`)
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
