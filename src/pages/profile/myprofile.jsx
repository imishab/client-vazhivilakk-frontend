import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { clearUserDetails } from "../../redux/slices/pageSlice";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MyProfile() {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUserDetails()); // Clear user details from Redux and localStorage
    router.push("/auth/signin"); // Redirect to the sign-in page
  };
  return (
    <div className="container pt-4 pb-4">
      {/* User Information*/}
      {/* <div className="card user-info-card mb-3">
        <div className="card-body d-flex align-items-center">
          <div className="user-profile me-3">
            <img src="/assets/img/bg-img/2.jpg" alt="" />
            <i className="bi bi-pencil" />
            <form action="#">
              <input className="form-control" type="file" />
            </form>
          </div>
          <div className="user-info">
            <div className="d-flex align-items-center">
              <h5 className="mb-1">{user?.name}</h5>
            </div>
            <p className="mb-0">{user?.email}</p>
          </div>
        </div>
      </div> */}
      {/* User Meta Data*/}
      <div className="card user-data-card">
        <div className="card-body">
          <div className="d-flex gap-4">
            <Link href="/">
              <ArrowLeft color="black" />
            </Link>

            <h5>My Profile</h5>
          </div>
          <hr />
          <form action="#">
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="fullname">
                Full Name
              </label>
              <input
                className="form-control"
                id="fullname"
                value={user?.name}
                type="text"
                placeholder="Full Name"
                readOnly=""
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                className="form-control"
                id="email"
                type="text"
                value={user?.email}
                placeholder="Email Address"
                readOnly=""
              />
            </div>

            {/* <button className="btn btn-success w-100" type="submit">
              Update Now
            </button> */}

            <button
              onClick={handleLogout}
              className="btn btn-danger mt-2 w-100"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
