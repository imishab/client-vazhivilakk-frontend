import React, { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "../redux/api/UserApi";
import Link from "next/link";
import { Italic } from "lucide-react";

export default function index() {
  const { data: categories, isError, refetch } = useGetCategoriesQuery("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  return (
    <>
      {/* Tiny Slider One Wrapper */}
      <div className="tiny-slider-one-wrapper">
        <div className="tiny-slider-one">
          {/* Single Hero Slide */}
          <div>
            <div
              className="single-hero-slide "
              style={{ backgroundColor: "#15463f" }}
            >
              <div className="h-100 d-flex align-items-center text-center">
                <div className="container">
                  <h5 className="text-white mb-1">Welcome to VazhiVilakk</h5>
                  <p className="text-white mb-4">
                    We will give you what you need.
                  </p>

                  <Link
                    className="btn btn-creative btn-dark"
                    href="/auth/signin"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Single Hero Slide */}
        </div>
      </div>
      <div className="pt-3" />

      <div className="top-products-area product-list-wrap">
        <div className="container">
          <div className="row g-3">
            {isLoading ? (
              <>
                <div className="d-flex justify-content-center align-items-center mt-5 w-100">
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <p className="text-center">
                  Loading... <br />{" "}
                  <span className="quote-text">
                    "Showing patience is from Iman"
                  </span>
                </p>
              </>
            ) : (
              categories?.map((category) => (
                <div className="col-6 col-lg-3" key={category._id}>
                  <div className="card shadow single-product-card">
                    <Link href={`/voices?categoryId=${category._id}`}>
                      <div className="card-body p-3">
                        {/* Product Thumbnail */}
                        <center>
                          <div className="product-thumbnail d-flex justify-content-center align-items-center">
                            <img
                              src={`https://client-vazhivilakk-backend.onrender.com${category.image}`}
                              width={50}
                              className="img-fluid"
                            />
                          </div>
                        </center>
                        {/* Product Title */}
                        <div className="product-title mt-3 d-block text-center">
                          {category.title}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="pb-3" />
    </>
  );
}
