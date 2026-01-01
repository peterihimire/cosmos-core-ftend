import React from "react";
import { Link } from "react-router-dom";
import Form from "../form"; // Ensure folder casing matches actual folder name
import backgroundImg from "../../../../assets/images/pexels-frans-van-heerden-201846-847371.jpeg";

const Login: React.FC = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Left side */}
      <div
        className="hidden lg:flex relative w-1/2 h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(
            180deg,
            rgba(22, 22, 22, 0.699) 0%,
            rgba(12, 12, 12, 0.82) 46.35%,
            rgba(20, 20, 20, 0.94) 100%
          ), url(${backgroundImg})`,
        }}
      >
        <div className="absolute max-w-md top-[230px] left-[270px] lg:top-[230px] lg:left-[270px] xl:top-[250px] xl:left-[90px]">
          <Link to="/" className="text-white font-bold text-base">
            Back To Home
          </Link>
          <h2 className="text-4xl leading-10 mt-24 max-w-xs">Happy Shopping</h2>
          <p className="text-base leading-5 max-w-xs mt-2">
            Platform that allows you invest securely, safely with guarantee to
            their investment.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-grow w-1/2 h-screen overflow-y-auto lg:w-1/2 p-4 sm:p-4 md:p-8">
        <Form />
      </div>
    </div>
  );
};

export default Login;
