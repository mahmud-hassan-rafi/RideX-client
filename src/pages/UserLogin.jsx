import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApi.js";

const UserLogin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await login({ ...userData, role: "user" }).unwrap(); // ✅ THIS IS THE KEY

      console.log("Login success:", res);

      setUserData({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      console.log("Login error:", err.data.message);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between p-7">
      <div className="">
        <h3 className="font-bold text-3xl">RideX</h3>
        <form className="flex flex-col mt-8" onSubmit={handleOnSubmit}>
          <label htmlFor="email" className="text-[18px] font-bold mb-2">
            What's your email
          </label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={(event) => {
              setUserData((pre) => {
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
            value={userData.password}
            onChange={(event) => {
              setUserData((preData) => {
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
          <p>New to RideX?</p>
          <Link to={"/signup"} className="text-blue-700">
            Create new Account
          </Link>
        </span>
      </div>

      <Link
        to={"/captain-login"}
        className="bg-green-600 text-white font-semibold rounded p-3 text-center text-base "
      >
        Log In as Captain
      </Link>
    </div>
  );
};

export default UserLogin;
