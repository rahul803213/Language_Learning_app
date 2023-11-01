"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowNextButton } from "@/redux/question/questionSlice";

function AlertBox({ message, type }) {
  const boxStyle = {
    height: "40px",
    width: "100%",
    backgroundColor: type === "correct" ? "green" : "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 999,
  };
  return (
    <div style={boxStyle}>
      <p style={{ color: "white", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}

function Question({
  question,
  options,
  correctOption,
  level,
  saveUserResponse,
  currentLevel,
}) {
  const dispatch = useDispatch();

  let leveltag = "";
  let textcolor = "";
  switch (level) {
    case 1:
      leveltag = "super easy";
      textcolor = "green";
      break;
    // Add more cases for other leveltags if needed
    case 2:
      leveltag = " easy";
      textcolor = "blue";
      break;
    case 3:
      leveltag = "medium";
      textcolor = "yellow";
      break;
    case 4:
      leveltag = "hard";
      textcolor = "pink";
      break;
    case 5:
      leveltag = "very hard";
      textcolor = "red";
      break;
    // Add more cases for additional leveltags as necessary
    default:
      // Handle any other values or cases
      leveltag = "";
      textcolor = "";
      break;
  }
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [run, setRun] = useState(1);
  const checkAnswer = () => {
    if (selectedOption != null) {
      if (selectedOption === correctOption) {
        setAlertType("correct");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 500);
      } else {
        setAlertType("incorrect");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 500);
      }
    }
    dispatch(toggleShowNextButton());
  };
  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex);
    //checkAnswer();
    setRun(run === 1 ? 0 : 1);
  };

  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  useEffect(() => {
    saveUserResponse(selectedOption, correctOption, level, question);
  }, [run, question, selectedOption, correctOption, level]);

  return (
    <div className="text-center py-10 relative">
      {showAlert && (
        <AlertBox
          message={alertType === "correct" ? "Correct" : "Wrong"}
          type={alertType}
        />
      )}
      <p className="text-3xl font-bold mb-6">
        {question}{" "}
        <span className={`text-xl text-${textcolor}-500`}>({leveltag})</span>{" "}
      </p>
      <ul>
        {options.map((option, index) => (
          <li key={index} className="mb-4 w-full">
            <label>
              <input
                type="radio"
                name="options"
                value={index}
                checked={selectedOption === index}
                onChange={() => {
                  handleOptionChange(index);
                }}
                className={`invisible`}
              />
              <span
                className={`ml-2 text-2xl p-1 ${
                  selectedOption === index
                    ? "border-4 w-full px-10 border-green-500 text-red-500"
                    : ""
                } focus:ring-2 focus:ring-red-600`}
              >
                {option}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
