import React, { useState, useEffect } from "react";
import { useSigninMutation } from "../../redux/api/UserApi"; // RTK Query API Slice
import { useRouter } from "next/router";
import { setUserDetails } from "../../redux/slices/pageSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  const [signin, { isLoading, isSuccess }] = useSigninMutation();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await signin({ email, password }).unwrap();
      dispatch(setUserDetails({ userInfo: response, token: response.token }));
      if (response.token) {
        router.push("/");
      }
    } catch (err) {
      setErrors(err?.data?.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hey 👋 Welcome to Vazhivilakk!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <div className="login-back-button">
        <Link href="/">
          <i className="bi bi-arrow-left-short" />
        </Link>
      </div>
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4 mt-5">
            <img
              className="login-intro-img"
              src="/assets/images/signin.png"
              alt="Signin"
            />
          </div>
          <div className="register-form mt-4">
            <h6 className="mb-3 text-center">
              Log in to continue to Vazhivilakk
            </h6>
            <form onSubmit={handleSubmit}>
              {errors.api && (
                <div className="alert alert-danger">{errors.api}</div>
              )}
              <div className="form-group">
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  type="text"
                  id="username"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group position-relative">
                <input
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="psw-input"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a
                  className="float-end forgot-password d-block mt-3 mb-1"
                  href="/"
                >
                  <p>
                    <u>Forgot Password?</u>
                  </p>
                </a>
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <button
                className="btn btn-dark w-100"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
          <div className="login-meta-data mt-3 text-center mb-5">
            <p className="mb-0">
              Didn't have an account?{" "}
              <Link className="stretched-link" href="/auth/signup">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
