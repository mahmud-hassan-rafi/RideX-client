import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col gap-y-3 justify-center items-center font-bold text-2xl text-red-500">
      <h3>404 | Page not Found</h3>
      <Link to={"/"} className="text-base text-green-600">
        redirected to home ➡{" "}
      </Link>
    </div>
  );
};

export default PageNotFound;
