const express = require('express');
const router = express.Router();
const lessonController = require('../controller/LessonController');

// Route to insert quiz data
router.post('/insertQuizData', lessonController.insertQuizData);

// Route to retrieve lessons by language
router.get('/:language', lessonController.getLessonsByLanguage);

module.exports = router;
