import { useRouter } from "next/router";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "../components/layout/Navbar";
import { useDispatch } from "react-redux";
import { loadUserDetails } from "../redux/slices/pageSlice"; // Adjust path as needed
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isAuthPage =
    router.pathname === "/auth/signin" ||
    router.pathname === "/auth/zone-signin" ||
    router.pathname === "/auth/signup";

  return (
    <Provider store={store}>
      <ReduxInitializer>
        <ToastContainer />
        {!isAuthPage && <Navbar />}
        {!isAuthPage ? (
          <div className="page-content-wrapper">
            <Component {...pageProps} />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
        {/* {!isAuthPage && <Footerbar />} */}
      </ReduxInitializer>
    </Provider>
  );
}

function ReduxInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserDetails());
  }, [dispatch]);

  return <>{children}</>;
}
