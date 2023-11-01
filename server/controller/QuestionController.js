/* const Question = require("../models/Question");
const User = require("../models/User");

const getQuestion = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const question = await Question.findOne({ level: user.progress + 1 }).sort({
      _id: -1,
    });

    if (!question)
      return res.status(404).json({ message: "No more questions available" });

    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const submitAnswer = async (req, res) => {
  // accepts req.body having questionId, answer
  try {
    const user = await User.findById(req.params.userId);
    const question = await Question.findById(req.body.questionId);

    if (!user || !question)
      return res.status(404).json({ message: "User or Question not found" });

    if (req.body.answer === question.correctAnswer) {
      user.progress += 1;
      user.score += question.difficultyLevel;
      await user.save();
      return res.json({
        message: "Correct answer!",
        score: user.score,
        progress: user.progress,
      });
    } else {
      return res.json({ message: "Wrong answer! Try again." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuestion,
  submitAnswer,
};
 */