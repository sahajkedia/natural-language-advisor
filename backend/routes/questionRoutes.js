const router = require("express").Router();
const questionController = require("../controllers/questionController");

router.get("/mcquiz_page", questionController.QuizPage);
router.post("/signup", questionController.StudentSignup);
router.post("/mcqquestionadding", questionController.MCQuestionAdding);
router.post("/riddlesquestionadding", questionController.RiddlesAdding);

module.exports = router;
