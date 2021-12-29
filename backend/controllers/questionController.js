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
  const {question,options,answer,solution,type,difficulty,domain,subDomain,topic,supportingMaterials,createdAt} = req.body;
  const qs = new Question({
    question,options,answer,solution,type:1,difficulty:0,domain,subdomain:subDomain,topic,supportingMaterials,createdAt
  })
  try {
    console.log(req.body);
    await  qs.save(req.body)
    console.log("Saved Successfullly")
  } catch (err) {
    console.log(err)
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
