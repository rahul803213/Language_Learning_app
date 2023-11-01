const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String], // An array of strings for options
  correctOption: Number,
  level:Number
  // Other fields as needed
});

const lessonSchema = new mongoose.Schema({
  lessonId: Number,
  language: String,
  questions: [questionSchema], // Define the questions field as an array of question documents
  // Other fields for lessons
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
