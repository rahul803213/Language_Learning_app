"use client";
import React, { useEffect, useState } from "react";
import { FaFire, FaHeart, FaDice, FaStar } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import { getTokenFromLocal } from "@/client-helper/authHelper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "@/redux/user/userSlice";
import { removeTokenFromLocalMeansLogout } from "@/client-helper/authHelper";
import Spinner from "../Spinner/Spinner";
const RightNav = () => {
  const user = useSelector((state) => state.userReducer.user);
  console.log({ "right nav": user });
  const token = getTokenFromLocal();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Router = useRouter();
  useEffect(() => {
    if (!token) {
      // dispatch(removeCurrentUser());
      removeTokenFromLocalMeansLogout();
      Router.push("/login");
    } else {
      const token = getTokenFromLocal();
      dispatch(setCurrentUser(token));
    }
  }, [Router, dispatch]);
  return (
    <div className="w-1/3 h-30  flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <>
          {" "}
          <span className="text-md">Learning:</span>{" "}
          <ReactCountryFlag
            countryCode={user.language_code}
            svg
            style={{ width: "2em", height: "2em" }}
            title="English"
          />
        </>
      </div>
      <div className="flex items-center space-x-2">
        <FaFire className="w-6 h-6 text-blue-500" />
        <span className="text-lg font-semibold">0</span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-md">Hi, {user.displayName}</span>
      </div>
    </div>
  );
};

export default RightNav;
