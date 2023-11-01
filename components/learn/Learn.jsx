import React from "react";

const Learn = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl ml-4 text-red-600">Exercises</h1>
      {[1, 2, 3, 4, 5].map((lessonNumber) => (
        <div
          key={lessonNumber}
          className="w-80 p-5 m-4 border-2 border-gray-300 rounded-md text-center hover:bg-yellow-500 hover:text-white transition duration-300"
          // Call the handleLessonClick function
        >
          <p className="text-center">Lesson {lessonNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default Learn;
