import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RootRedirect = ({ isLoading }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate("/get-started");
    } else if (user?.role === "user") {
      navigate("/user");
    } else if (user?.role === "captain") {
      navigate("/captain");
    }
  }, [user, isLoading, navigate]);

  return <div>redirecting...</div>;
};

export default RootRedirect;
