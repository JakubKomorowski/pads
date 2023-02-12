import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/nav/Navbar";
import Cart from "../components/Cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Cart>
      <div className="h-screen flex flex-col ">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </Cart>
  );
}

export default MyApp;
