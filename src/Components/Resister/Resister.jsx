import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase.init";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
const Resister = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const { createUser } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = e => {
        e.preventDefault()
        const from = e.target;
        const email = from.email.value;
        const password = from.password.value
        const name = from.name.value;
        const photo = from.photo.value;
        const terms = from.terms.checked
        if (!terms) {
            setErrorMessage("Please accept our terms and condition")
            return;
        }
        if (password.length < 6) {
            setErrorMessage('Password should be 6 character or longer')
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-z])[A-Za-z]{6,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage('At Least one uppercase, one lowercase');
            return;
        }
        if (success) {
            toast.success('Resister Successfully', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
        setErrorMessage('')
        setSuccess(false)
        createUser(email, password)
            .then(res => {
                setSuccess(true)
                const creationAt = res.user.metadata.creationTime;
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        const newUser = { name, email, photo, creationAt }
                        fetch('https://chill-gamer-server-chi-lime.vercel.app/users', {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(newUser)
                        })
                            .then(res => res.json())
                            .then(data => console.log(data))
                    })
                from.reset()
                navigate('/')
            })
            .catch(error => {
                setErrorMessage(error.message)
                setSuccess(false)
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen dark:bg-gray-900 dark:text-white">
            <Helmet>
                <title>Resister | Gamer Review</title>
            </Helmet>
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Resister now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Inter Your Name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Inter your email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type={showPassword ? 'text' : 'password'} placeholder="password" className="input input-bordered" required />

                            <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-2 top-12">
                                {
                                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </button>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="text" placeholder="Inter Photo url" name="photo" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label justify-start gap-3 cursor-pointer">
                                <input type="checkbox" name="terms" defaultChecked className="checkbox checkbox-primary" />
                                <span className="label-text">Accept Our Terms and Condition</span>

                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={() => setSuccess(true)} className="btn btn-primary">Resister</button>
                        </div>
                        <div>
                            <p>You have already an Account ? Please <Link className="text-blue-500" to='/login'>Login</Link></p>
                        </div>
                        {
                            errorMessage && <p className="text-red-600">{errorMessage}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Resister;