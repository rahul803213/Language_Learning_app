// routes/userRoutes.js
const express = require("express");
const { getQuestion, submitAnswer } = require("../controller/QuestionController");
const router = express.Router();

//get a question
router.get("/question/:userId", getQuestion);

// submit an answer
router.post("/submit-answer/:userId", submitAnswer);

module.exports = router;
