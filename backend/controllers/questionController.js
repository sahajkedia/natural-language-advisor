const Question = require("../models/QuestionSchema");

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createQuestion = async (req, res) => {
  try {
    console.log(req.body);

    // const question = await Question.create(req.body);
    // res.json(question);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(question);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    res.json(question);
  } catch (err) {
    res.status(400).send(err);
  }
};
