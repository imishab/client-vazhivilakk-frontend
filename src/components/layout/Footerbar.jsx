import React from "react";
import { House, Search, Box, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Footerbar() {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <>
      {/* Footer Nav */}
      <div className="footer-nav-area" id="footerNav">
        <div className="footer-nav position-relative footer-style-five shadow-sm">
          <ul className="h-100 d-flex ps-0">
            <li className="">
              <Link href="/">
                <House size={18} color="white" />
              </Link>
            </li>
            <li>
              <Link href="/menu">
                <Box size={18} color="white" />
              </Link>
            </li>
            <li>
              <Link href="/search">
                <Search size={18} color="white" />
              </Link>
            </li>

            <li>
              {user ? (
                <Link href="/profile/myprofile">
                  <CircleUserRound size={18} color="white" />
                </Link>
              ) : (
                <Link href="/auth/signin">
                  <CircleUserRound size={18} color="white" />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
