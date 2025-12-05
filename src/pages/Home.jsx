import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-between bg-no-repeat bg-[url(src/assets/rideX-get-started-bg.jpg)] bg-cover bg-center">
      <h1 className="text-4xl font-bold m-7">RideX</h1>
      <div className="bg-white flex flex-col gap-y-6 px-3 pt-5 pb-6">
        <h1 className="text-3xl font-bold">Get started with RideX</h1>
        <Link
          className="bg-black text-white w-full py-3 rounded text-center text-2xl"
          to={"/login"}
        >
          continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
