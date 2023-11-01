"use client";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import React, { useEffect } from "react";
import Header from "@/components/LandingPageHeader/Header";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchLessonApi } from "@/network/lessonApi";
import { getTokenFromLocal } from "@/client-helper/authHelper";
function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    if (getTokenFromLocal()) {
      router.push("/home/learn");
    } else {
      const fetchData = async () => {
        const quizData = await fetchLessonApi("English");
        const { lessons } = quizData;
        const lesson1 = lessons.find((lesson) => lesson.lessonId === 1);

        if (lesson1) {
          const { questions } = lesson1;
          console.log(questions);
        }
      };
      fetchData();
    }
  }, [router]);

  return (
    <>
      <div className="sm:flex sm:flex-col ">
        <div className="flex flex-col gap-y-10 xl:flex-row justify-center xl:justify-between xl:items-top items-center max-w-screen-xl mx-auto  w-[100%]">
          <div className="  xl:w-[600px] xl:h-[600px] top-14 right-5 w-70 h-70 rounded">
            <img src="./image-4.png" alt="" className="p-2" />
          </div>
          <div className="gap-y-2 sm:gap-y-5 flex flex-col justify-center items-center sm:flex sm:flex-col ">
            <h1 className="text-xl text-center sm:text-3xl space-y-20 md:text-5xl text-black max-w-xl font-bold pl-4 xl:pl-0 ">
              The free, fun, and effective way to learn a language!
            </h1>
            <Link
              href={"/signup"}
              className="text-white w-[80%] text-sm sm:text-2xl text-bold hover:opacity-80 bg-green-600 px-4 py-2 rounded-lg text-center"
            >
              Get Started
            </Link>
            <Link
              href={"/login"}
              className="text-black border-2 text-sm sm:text-2xl border-green-500 w-[80%] text-2xl text-bold hover:opacity-80 px-4 py-2 rounded-lg text-center"
            >
              Already have an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
