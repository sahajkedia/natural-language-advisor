const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  options: [
    // store the options in an array
    {
      type: String,
    },
  ],
  answer: {
    // store the answer in a string
    type: String,
    required: [true, "Answer is required"],
  },
  solution: {
    //store the complete solution in a string, if any
    type: String,
  },
  type: {
    //question type, 0 for MCQ, 1 for Subjective
    type: Number,
    required: [true, "Question Type is required"],
  },
  difficulty: {
    //0 for easy, 1 for medium, 2 for hard
    type: Number,
    required: [true, "Difficulty is required"],
  },
  domain: {
    type: String,
  },
  subdomain: {
    type: String,
  },
  topic: {
    type: String,
  },
  supportingMaterials: [
    {
      fileName: {
        type: String,
      },
      filePath: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
