import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase.init";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const terms = form.terms.checked;

    if (!terms) {
      setErrorMessage("Please accept our terms and condition");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must include at least one uppercase and one lowercase letter");
      return;
    }

    try {
      const res = await createUser(email, password);
      const creationAt = res.user.metadata.creationTime;

      await sendEmailVerification(auth.currentUser);

      const newUser = { name, email, photo, creationAt };
      await fetch('https://chill-gamer-server-chi-lime.vercel.app/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      toast.success("Registration Successful! Please verify your email.", {
        position: "top-center",
        autoClose: 2000,
      });

      form.reset();
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen dark:bg-gray-900 dark:text-white">
      <Helmet>
        <title>Register | Gamer Review</title>
      </Helmet>

      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold text-center">Register Now!</h1>

        <div className="card bg-base-100 w-full max-w-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label"><span className="label-text">Name</span></label>
              <input type="text" name="name" placeholder="Enter your name" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" name="email" placeholder="Enter your email" className="input input-bordered" required />
            </div>

            <div className="form-control relative">
              <label className="label"><span className="label-text">Password</span></label>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="input input-bordered" required />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-2 top-12"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Photo URL</span></label>
              <input type="text" name="photo" placeholder="Enter photo URL" className="input input-bordered" required />
            </div>

            <div className="form-control mt-2">
              <label className="label justify-start gap-3 cursor-pointer">
                <input type="checkbox" name="terms" className="checkbox checkbox-primary" />
                <span className="label-text">Accept our terms and conditions</span>
              </label>
            </div>

            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>

            <p className="mt-3">
              Already have an account? <Link className="text-blue-500" to="/login">Login</Link>
            </p>

            {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
