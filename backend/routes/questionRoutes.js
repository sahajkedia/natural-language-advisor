const router = require("express").Router();
const questionController = require("../controllers/questionController");

router
  .route("/")
  .get(questionController.getAllQuestions)
  .post(questionController.createQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;
