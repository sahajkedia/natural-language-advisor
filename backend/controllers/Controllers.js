const { v4: uuidv4 } = require("uuid");
const Student = require("../models/StudentSchema");
// const Admin = require('../models/AdminSchema')
const MCQuestion = require("../models/MCQuestionSchema");
const RiddleQuestion = require("../models/RiddleSchema");
const StudentSignup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExists = Student.findOne({ email: email });
  if (userExists) {
    res.status(404).json({
      message: "Not able to Sign up!",
    });
  } else {
    const newStudent = new Student({
      name,
      email,
      password,
    });

    try {
      await newStudent.save();
      res.status(201).json({
        details: newStudent,
      });
    } catch (e) {
      res.status(400).json({
        message: "could not complete your request",
      });
      return next(e);
    }
  }
};

const MCQuestionAdding = (req, res, next) => {
  const { option1, option2, option3, option4, answer, question } = req.body;

  try {
    let quizQs = new MCQuestion({
      id: "Q0",
      qs: question,
      options: [option1, option2, option3, option4],
      ans: answer,
    });
    quizQs.save();

    console.log(quizQs);
    res.status(200).json({
      message: "Khubh Bhalo",
    });
  } catch (c) {
    res.status(404).json({
      msg: "Not Possible",
    });
  }
};

const QuizPage = async (req, res, next) => {
  const circularReplacer = () => {
    // Creating new WeakSet to keep
    // track of previously seen objects
    const seen = new WeakSet();

    return (key, value) => {
      // If type of value is an
      // object or value is null
      if (typeof value === "object" && value !== null) {
        // If it has been seen before
        if (seen.has(value)) {
          return;
        }

        // Add current value to the set
        seen.add(value);
      }

      // return the value
      return value;
    };
  };
  let qs = await MCQuestion.find({});
  console.log(qs);
  //  JSON.stringify(qs,circularReplacer()).toArray( function(err, results) {
  //     console.log(results)
  //  });
  res
    .json({
      questions: qs,
    })
    .status(201);
};

const RiddlesAdding = (req, res, next) => {
  const { answer, qsname } = req.body;

  try {
    let RiddleQs = new RiddleQuestion({
      id: uuidv4(),
      qs: qsname,
      // options:[option1,option2,option3,option4],
      ans: answer,
    });
    RiddleQs.save();

    console.log(RiddleQs);
    res.status(200).json({
      message: "Khubh Bhalo",
    });
  } catch (c) {
    res.status(404).json({
      msg: "Not Possible",
    });
  }
};

exports.StudentSignup = StudentSignup;
exports.MCQuestionAdding = MCQuestionAdding;
exports.QuizPage = QuizPage;
exports.RiddlesAdding = RiddlesAdding;
