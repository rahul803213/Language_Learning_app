// quizController.js
const Lesson = require('../models/Lesson'); // Import your Mongoose model
const  quizData  = require('../models/QuizData'); // Use require for importing modules

// Function to insert quiz data into the database
const insertQuizData = async (req, res) => {
  try {
    for (const lessonData of quizData.lessons) {
      const lesson = new Lesson({
        lessonId: lessonData.lessonId,
        language: lessonData.language,
        questions: lessonData.questions,
      });

      await lesson.save();
    }

    console.log('Quiz data inserted successfully.');
    res.status(200).json({ message: 'Quiz data inserted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert quiz data' });
  }
};


const getLessonsByLanguage = async (req, res) => {
  const { language } = req.params;

  try {
    const lessons = await Lesson.find({ language });
    res.status(200).json({ lessons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve lessons' });
  }
};

module.exports = {
  insertQuizData,
  getLessonsByLanguage,
};
