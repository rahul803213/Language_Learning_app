"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getTokenFromLocal } from "@/client-helper/authHelper";
import { setCurrentUser } from "@/redux/user/userSlice";
import { auth } from "@/firebase/firebase.utils";
import { updateUserProgress } from "@/firebase/firebase.utils";
import { fetchUserDetails } from "@/firebase/firebase.utils";
import Spinner from "@/components/Spinner/Spinner";
const Profile = () => {
  // Define a state variable for progress
  const user = useSelector((state) => state.userReducer.user);
  const [loading, setLoading] = useState(false);
  // Function to reset progress
  console.log({ user: user });

  const token = getTokenFromLocal();
  const dispatch = useDispatch();
  const Router = useRouter();
  const handleReset = () => {
    setLoading(true);
    updateUserProgress(user.id, "Progress", 0);
    window.location.reload();
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    if (!token) {
      // dispatch(removeCurrentUser());
      removeTokenFromLocalMeansLogout();
      Router.push("/login");
    } else {
      const token = getTokenFromLocal();
      const fetchAndDispatchUserDetails = async () => {
        try {
          const user = await fetchUserDetails(token.id);
          console.log({ user: user });
          dispatch(setCurrentUser(user));
        } catch (error) {
          console.error("Error:", error);
        }
      };

      // Call the async function
      fetchAndDispatchUserDetails();
      setLoading(false);
    }
  }, [Router, dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4 h-15 w-15">
        <div>
          <h1 className="text-2xl font-semibold">{user.displayName}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-lg font-semibold">Proficiency Level</p>
        <p className="text-gray-600">{user.Proficiency_level}</p>
      </div>

      <div className="mt-4">
        <p className="text-lg font-semibold">Learning Language</p>
        <p className="text-gray-600">{user.want_to_learn}</p>
      </div>

      {/* Progress bar */}
      <div className="mt-8">
        <p className="text-lg font-semibold">Progress</p>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {user.Progress}% Complete
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                style={{ width: `${5}%` }}
                className="w-full rounded-full bg-blue-200"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset button */}
      <button
        className="bg-red-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-red-700"
        onClick={() => handleReset()}
      >
        Reset Progress
      </button>
    </div>
  );
};

export default Profile;
