"use client";
import React, { useState, useEffect } from "react";
import Question from "@/components/question/Question";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getTokenFromLocal } from "@/client-helper/authHelper";
import { setCurrentUser } from "@/redux/user/userSlice";
import { updateUserProgress } from "@/firebase/firebase.utils";
import {
  setCurrentQuestionIndexToZero,
  toggleShowNextButton,
  resetMarks,
  setFullMarks,
} from "@/redux/question/questionSlice";
import { nextQuestion } from "@/redux/question/questionSlice";
import Spinner from "@/components/Spinner/Spinner";
import ResultCard from "@/components/resultcard/ResultCard";
function Page() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const questions = useSelector((state) => state.questionReducer.questions);
  const showNextButton = useSelector(
    (state) => state.questionReducer.showNextButton
  );
  const currentQuestionIndex = useSelector(
    (state) => state.questionReducer.currentQuestionIndex
  );
  const [previousQuestion, setPreviousQuestion] = useState(null);
  const full_marks = useSelector((state) => state.questionReducer.fullmarks);
  const user = useSelector((state) => state.userReducer.user);
  console.log({ quiz: user });
  const token = getTokenFromLocal();
  //const QuestionInTheQuiz =5;
  const Router = useRouter();
  console.log({ questions: questions });
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

  // State to store user responses
  const [userResponses, setUserResponses] = useState([]);
  const [consecutiveMistakes, setConsecutiveMistakes] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1); // Start at level 1
  const [showResultCard, setShowResultCard] = useState(false);
  // State to store the user's name and score for the result card
  const [userName, setUserName] = useState("");
  const [userScore, setUserScore] = useState(0);

  // Function to display the result card
  const showResult = (userName, userScore) => {
    setUserName(userName);
    setUserScore(userScore);
    setShowResultCard(true);
    console.log("rahul");
  };
  // Function to select a question based on the current level
  const selectQuestion = () => {
    let randomQuestion;

    // Keep looping until a new question is selected
    do {
      // Filter questions by level
      const filteredQuestions = questions.filter(
        (question) => question.level === currentLevel
      );

      // Randomly select a question from the filtered questions
      randomQuestion =
        filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    } while (randomQuestion === previousQuestion);

    // Set the selected question as the previous question
    setPreviousQuestion(randomQuestion);
    const temfullmarks = full_marks + questions[currentQuestionIndex].level;
    dispatch(setFullMarks(temfullmarks));
    return randomQuestion;
  };

  // Calculate progress
  const totalQuestions = 15;
  const questionsDone = currentQuestionIndex + 1;
  const progress = (questionsDone / totalQuestions) * 100;

  // Check if there are more questions to display
  const hasNextQuestion = currentQuestionIndex < totalQuestions - 1;
  const hasPrevQuestion = currentQuestionIndex > 0;

  const handleNextQuestion = () => {
    // Select the next question
    const nextQuestion2 = selectQuestion();
    dispatch(nextQuestion(nextQuestion2));
    dispatch(toggleShowNextButton());
  };

  const handlePrevQuestion = () => {
    dispatch(prevQuestion());
  };

  // Function to save user responses
  const saveUserResponse = (response, correctAnswer, level, questionName) => {
    // Check if the response is correct
    const isCorrect = response === correctAnswer;

    // Update consecutive mistakes and correct answers
    if (isCorrect) {
      setConsecutiveMistakes(0);
      setConsecutiveCorrect(consecutiveCorrect + 1);

      // Increase question level if there are three consecutive correct answers
      if (consecutiveCorrect >= 2 && currentLevel < 5) {
        setCurrentLevel(currentLevel + 1);
        setConsecutiveCorrect(0);
      }
    } else {
      setConsecutiveMistakes(consecutiveMistakes + 1);

      // Decrease question level if there are three consecutive mistakes and the level is greater than 1
      if (consecutiveMistakes >= 2 && currentLevel > 1) {
        setCurrentLevel(currentLevel - 1);
        setConsecutiveMistakes(0);
      }
    }

    // Check if there's a duplicate entry
    const duplicateIndex = userResponses.findIndex(
      (entry) => entry.questionName === questionName
    );

    if (duplicateIndex !== -1) {
      // Duplicate found, update the response
      const updatedResponses = userResponses.map((entry, index) => {
        if (index === duplicateIndex) {
          return { questionName, response, correctAnswer, level };
        }
        return entry;
      });
      setUserResponses(updatedResponses);

      console.log("Updated Response:", response);
      console.log("Correct Answer:", correctAnswer);
      console.log("Level:", level);
      console.log("Question Name:", questionName);
    } else {
      // No duplicate, add the response
      const updatedResponses = [
        ...userResponses,
        { questionName, response, correctAnswer, level },
      ];
      setUserResponses(updatedResponses);

      console.log("Saved Response:", response);
      console.log("Correct Answer:", correctAnswer);
      console.log("Level:", level);
      console.log("Question Name:", questionName);
    }

    // Handle saving the user response and other logic
    // ...
    // You can update the userResponses state with the response, correctAnswer, level, and questionName here.
  };

  // Function to submit the test
  const submitTest = () => {
    setLoading(true);
    // Initialize marks as 0
    let totalMarks = 0;
    // Iterate through userResponses to calculate marks
    userResponses.forEach((response) => {
      // Check if the response is correct
      if (response.response === response.correctAnswer) {
        // Increment marks by the level
        totalMarks += response.level;
      }
    });

    // Log the total marks to the console
    console.log("Total Marks:", totalMarks);
    console.log(full_marks);
    console.log(userResponses);
    const percentage = (totalMarks / full_marks) * 100;
    console.log({ percentage: percentage });
    updateUserProgress(user.id, "Progress", Math.floor(percentage));
    dispatch(setFullMarks(0));
    dispatch(setCurrentQuestionIndexToZero());

    setLoading(false);
    showResult(user.displayName, percentage);
    // You can now use the 'totalMarks' for your evaluation and submission logic.
  };

  return !showResultCard ? (
    <div>
      <div className="bg-gray-200 h-6 rounded-full w-full mt-4">
        <div
          className="bg-blue-500 h-6 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {currentQuestionIndex < totalQuestions ? (
        <Question
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          correctOption={questions[currentQuestionIndex].correctOption}
          level={questions[currentQuestionIndex].level}
          currentLevel={questions[currentQuestionIndex].level}
          // Pass props to the Question component to save user responses
          saveUserResponse={saveUserResponse}
        />
      ) : (
        <p>No more questions to display.</p>
      )}

      <div className="flex justify-between mt-2">
        <p>
          {questionsDone}/{totalQuestions} Questions Done
        </p>
        <div>
          {currentQuestionIndex < totalQuestions - 1 && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover-bg-blue-700"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}

          {/* Submit button for the test */}
          {currentQuestionIndex == totalQuestions - 1 && (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover-bg-green-700"
              onClick={submitTest}
            >
              {loading ? <Spinner /> : "Submit Test"}
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    showResultCard && <ResultCard userName={userName} score={userScore} />
  );
}

export default Page;
