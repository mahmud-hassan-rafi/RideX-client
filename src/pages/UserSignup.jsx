import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "../features/toast-notify/toastify";
import { useRegisterMutation } from "../features/auth/authApi";

const UserSignup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    role: "user",
  });

  // eslint-disable-next-line no-unused-vars
  const [registerUser, response] = useRegisterMutation();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);

    try {
      const res = await registerUser(userData).unwrap();
      successNotify(res?.message);

      setUserData({
        fullname: {
          firstname: "",
          lastname: "",
        },
        email: "",
        password: "",
        role: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate(error?.data?.navigate);
      if (error?.data?.errors) {
        error?.data?.errors.map((err) => {
          errorNotify(err?.msg);
        });
      } else {
        errorNotify(error?.data?.message || error?.message || error);
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between p-7">
      <div className="">
        <h3 className="font-bold text-3xl">RideX</h3>
        <form className="flex flex-col mt-8" onSubmit={handleOnSubmit}>
          <label htmlFor="name" className="text-[18px] font-bold mb-2">
            Enter your name
          </label>
          <div className="flex gap-x-3">
            <input
              type="text"
              id="firstname"
              value={userData.fullname.firstname}
              onChange={(event) => {
                setUserData((pre) => {
                  return {
                    ...pre,
                    fullname: {
                      ...pre.fullname,
                      firstname: event.target.value,
                    },
                  };
                });
              }}
              required
              placeholder="Firstname"
              className="text-base rounded w-1/2 p-3 bg-[#eeeeee] placeholder:text-base outline-blue-100 mb-6"
            />
            <input
              type="text"
              id="lastname"
              value={userData.fullname.lastname}
              onChange={(event) => {
                setUserData((preData) => {
                  return {
                    ...preData,
                    fullname: {
                      ...preData.fullname,
                      lastname: event.target.value,
                    },
                  };
                });
              }}
              required
              placeholder="Lastname"
              className="text-base rounded w-1/2 p-3 bg-[#eeeeee] placeholder:text-base outline-blue-100 mb-6"
            />
          </div>
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
            Create User Account
          </button>
        </form>
        <span className="flex justify-center gap-x-2 font-semibold mt-2">
          <p>Have an account on RideX?</p>
          <Link to={"/login"} className="text-blue-700">
            Login now
          </Link>
        </span>
      </div>

      <p className="text-sm font-semibold">
        Read our guideline of{" "}
        <span className="underline">Privacy and policy</span> and{" "}
        <span className="underline">Terms and conditions</span>
      </p>
    </div>
  );
};

export default UserSignup;
