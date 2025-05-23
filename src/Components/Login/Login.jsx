import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.init";
import { toast } from "react-toastify";
import googleImage from "./../../assets/google.png"
import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { signInUser, googleSignIn } = useAuth()
    const navigate = useNavigate('')
    const emailRef = useRef()
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(res => {

                form.target.reset()
                navigate('/')

            })
            .catch(err => {
                setErrorMessage(err.message)
            })

    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            setErrorMessage('Please provided a valid email')
        }
        else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.error('password reset email send', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",

                    });

                })
                .catch(error => {
                    setErrorMessage(error.message)
                })
        }
    }
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                navigate('/')
            })
            .catch(err => {
                setErrorMessage(err.message)
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen dark:bg-gray-900 dark:text-white">
            <Helmet>
                <title>Login | Gamer Review</title>
            </Helmet>
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type={showPassword ? 'text' : 'password'} placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-2 top-12">
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </button>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>

                        <div>
                            <p>new to this website? please <Link className="text-blue-400" to="/resister">Resister</Link></p>
                        </div>
                        {
                            errorMessage && <p className="text-red-600">{errorMessage}</p>
                        }
                        <Link className="flex gap-2 border-2 p-1 rounded-md" onClick={handleGoogleSignIn} ><img className="w-8" src={googleImage} alt="" /> LogIn with google</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;