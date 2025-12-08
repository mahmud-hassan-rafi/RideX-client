import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authApi";

const CaptainSignup = () => {
  const [captainData, setCaptainData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    role: "captain",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [registerCaptain, { isLoading, isError, error }] =
    useRegisterMutation();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(captainData);

    try {
      const res = await registerCaptain(captainData).unwrap();
      console.log("Captain registered:", res?.message);

      setCaptainData({
        fullname: { firstname: "", lastname: "" },
        email: "",
        password: "",
        role: "captain",
        vehicle: {
          color: "",
          plate: "",
          capacity: "",
          vehicleType: "",
        },
      });
      navigate("/");
    } catch (err) {
      // console.log("Registration error:",
      navigate(err?.data?.navigate);
      if (err?.data?.errors) {
        err?.data?.errors?.map((error) => {
          console.log(error?.msg);
        });
      } else {
        console.log(err?.data?.message || err);
      }
    }
  };
  return (
    <div className="h-screen w-full flex flex-col justify-between p-7 overflow-y-auto">
      <div className="">
        <div className="font-bold text-3xl flex gap-x-1.5">
          <h2>RideX</h2> <span className="text-2xl">👮‍♂️</span>
        </div>
        <form className="flex flex-col mt-6 gap-y-3" onSubmit={handleOnSubmit}>
          <label htmlFor="name" className="text-base font-bold">
            Enter your name
          </label>
          <div className="flex gap-x-3">
            <input
              type="text"
              id="firstname"
              value={captainData.fullname.firstname}
              onChange={(event) => {
                setCaptainData((pre) => {
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
              className="text-base rounded w-1/2 p-2 bg-[#eeeeee] placeholder:text-base outline-blue-100"
            />
            <input
              type="text"
              id="lastname"
              value={captainData.fullname.lastname}
              onChange={(event) => {
                setCaptainData((pre) => {
                  return {
                    ...pre,
                    fullname: { ...pre.fullname, lastname: event.target.value },
                  };
                });
              }}
              required
              placeholder="Lastname"
              className="text-base rounded w-1/2 p-2 bg-[#eeeeee] placeholder:text-base outline-blue-100"
            />
          </div>
          <label htmlFor="email" className="text-[16px] font-bold">
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
            className="text-base rounded p-2 bg-[#eeeeee] placeholder:text-base outline-blue-100"
          />
          <label htmlFor="password" className="text-[16px] font-bold">
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
            className="text-base rounded p-2 bg-[#eeeeee] placeholder:text-base outline-blue-100"
          />

          <h3 className="text-[16px] font-bold mt-2">Vehicle Info</h3>
          <div className="flex gap-x-3">
            <div className="flex-1">
              <input
                type="text"
                id="color"
                value={captainData.vehicle.color}
                onChange={(event) => {
                  setCaptainData((pre) => {
                    return {
                      ...pre,
                      vehicle: { ...pre.vehicle, color: event.target.value },
                    };
                  });
                }}
                required
                placeholder="color"
                className="text-base w-full rounded p-2 bg-[#eeeeee] placeholder:text-base outline-blue-100"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                id="plate"
                value={captainData.vehicle.plate}
                onChange={(event) => {
                  setCaptainData((pre) => {
                    return {
                      ...pre,
                      vehicle: { ...pre.vehicle, plate: event.target.value },
                    };
                  });
                }}
                required
                placeholder="License Plate NO."
                className="text-base w-full rounded p-2 bg-[#eeeeee] placeholder:text-base outline-blue-100"
              />
            </div>
          </div>

          <div className="flex gap-x-3">
            <div className="flex-1">
              <input
                type="number"
                id="capacity"
                value={captainData.vehicle.capacity}
                onChange={(event) => {
                  setCaptainData((pre) => {
                    return {
                      ...pre,
                      vehicle: { ...pre.vehicle, capacity: event.target.value },
                    };
                  });
                }}
                required
                min="1"
                placeholder="Capacity"
                className="w-full text-base rounded p-2 bg-[#eeeeee] placeholder:text-base outline-blue-100"
              />
            </div>
            <div className="flex-1">
              <select
                id="vehicleType"
                value={captainData.vehicle.vehicleType}
                onChange={(event) => {
                  setCaptainData((pre) => {
                    return {
                      ...pre,
                      vehicle: {
                        ...pre.vehicle,
                        vehicleType: event.target.value,
                      },
                    };
                  });
                }}
                required
                className="w-full text-base rounded p-2 bg-[#eeeeee] outline-blue-100"
              >
                <option value="">vehicle type</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <button className="bg-black text-[16px] text-white p-2 font-semibold rounded mt-4">
            Create Captain Account
          </button>
        </form>
        <span className="flex justify-center gap-x-2 font-semibold mt-2">
          <p>Already a Captain?</p>
          <Link to={"/captain-login"} className="text-blue-700">
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

export default CaptainSignup;
