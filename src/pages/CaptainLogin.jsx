import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApi.js";
import { errorNotify } from "../features/toast-notify/toastify.js";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [captainData, setCaptainData] = useState({
    email: "",
    password: "",
  });

  const [login, loginOptions] = useLoginMutation();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(captainData);

    try {
      const res = await login({ ...captainData, role: "captain" }).unwrap();
      if (!res.ok) {
        console.log(res);
      }

      console.log(res);
      setCaptainData((preData) => {
        return { ...preData, email: "", password: "" };
      });
      navigate("/");
    } catch (error) {
      errorNotify(error?.data?.message);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between p-7">
      <div className="">
        <div className="font-bold text-3xl flex gap-x-1.5">
          <h2>RideX</h2> <span className="text-2xl">👮‍♂️</span>
        </div>
        <form className="flex flex-col mt-8" onSubmit={handleOnSubmit}>
          <label htmlFor="email" className="text-[18px] font-bold mb-2">
            What's your email
          </label>
          <input
            type="email"
            id="email"
            value={captainData.email}
            onChange={(event) => {
              setCaptainData((pre) => {
                return { ...pre, email: event.target.value };
              });
            }}
            required
            placeholder="email@example.com"
            className="text-base rounded p-3 bg-[#eeeeee] placeholder:text-base outline-blue-100 mb-6"
          />
          <label htmlFor="password" className="text-[18px] font-bold mb-2">
            Enter Password
          </label>
          <input
            type="password"
            id="password"
            value={captainData.password}
            onChange={(event) => {
              setCaptainData((preData) => {
                return { ...preData, password: event.target.value };
              });
            }}
            required
            placeholder="password"
            className="text-base rounded p-3 bg-[#eeeeee] placeholder:text-base outline-blue-100 mb-6"
          />
          <button className="bg-black text-[18px] text-white p-2.5 font-semibold rounded">
            Login
          </button>
        </form>
        <span className="flex justify-center gap-x-2 font-semibold mt-2">
          <p>Not Captain Yet?</p>
          <Link to={"/captain-signup"} className="text-blue-700">
            Join as a Fleet Partner
          </Link>
        </span>
      </div>

      <Link
        to={"/login"}
        className="bg-amber-800 text-white font-semibold rounded p-3 text-center text-base "
      >
        Log In as User
      </Link>
    </div>
  );
};

export default CaptainLogin;
