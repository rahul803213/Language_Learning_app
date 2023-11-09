"use client";
import React, { useState, useEffect } from "react";
import { fetchLessonApi } from "@/network/lessonApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions, resetMarks } from "@/redux/question/questionSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";
import {
  removeTokenFromLocalMeansLogout,
  getTokenFromLocal,
} from "@/client-helper/authHelper";
import { setCurrentUser } from "@/redux/user/userSlice";
const Learn = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const token = getTokenFromLocal();
  const dispatch = useDispatch();
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
  // Function to handle lesson click and set the selected lesson
  const handleLessonClick = async (lessonNumber) => {
    setLoading(true);
    const quizData = await fetchLessonApi(user.want_to_learn);
    const { lessons } = quizData;
    const lesson = lessons.find((lesson) => lesson.lessonId === lessonNumber);

    if (lesson) {
      const { questions } = lesson;
      dispatch(setQuestions(questions));
      dispatch(resetMarks());
      Router.push("/home/quiz");
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex w-full justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl ml-4 text-red-600">Exercises</h1>
            {[1].map((lessonNumber) => (
              <div
                key={lessonNumber}
                className={`w-80 p-5 m-4 border-2 border-gray-300 rounded-md text-center hover:bg-yellow-500 hover:text-white transition duration-300 ${
                  selectedLesson === lessonNumber
                    ? "bg-yellow-500 text-white"
                    : ""
                }`}
                onClick={() => handleLessonClick(lessonNumber)}
              >
                <p className="text-center">Lesson {lessonNumber}</p>
              </div>
            ))}
          </div>

          <div className="h-60vh w-30vw bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ul className="list-disc pl-6">
              <li>
                Rule 1: If you complete all lessons all correct your Progress
                will 100%
              </li>
              <li>
                Rule 2: You can go to next and to previous question by clicking
                on button.
              </li>
              <li>
                Rule 3: Once a submit button clicked then test will be end.
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Learn;
