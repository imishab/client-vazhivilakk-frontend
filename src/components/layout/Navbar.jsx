import React from "react";
import {
  Heart,
  Menu,
  ShoppingBag,
  User2,
  UserCircle,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* Header */}
      <div className="header-area" id="headerArea">
        <div className="container-md px-3">
          {/* Header Content */}
          <div className="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
            {/* Logo Wrapper */}
            <div className="logo-wrapper">
              <a href="/">
                <img src="/assets/images/logo.png" alt="" />
                {/* <h6 className="mt-2 text-white"> Vazhi Vilakku.</h6> */}
              </a>
            </div>
            {/* Navbar Toggler */}
            <div className="d-flex gap-3 justify-content-between align-items-center">
              <Link href="">
                <Heart size={20} color="white" />
              </Link>
              <Link href="">
                <UserCircle2 size={20} color="white" />
              </Link>
              {/* <div
                className="navbar--toggler"
                id="affanNavbarToggler"
                data-bs-toggle="offcanvas"
                data-bs-target="#affanOffcanvas"
                aria-controls="affanOffcanvas"
              >
                <Menu color="white" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
