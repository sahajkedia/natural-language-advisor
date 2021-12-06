const router = require('express').Router();
const reff = require('../controllers/Controllers')

router.get('/mcquiz_page/', reff.QuizPage)
router.post('/signup/',reff.StudentSignup)
router.post('/mcqquestionadding',reff.MCQuestionAdding)
router.post('/riddlesquestionadding',reff.RiddlesAdding)

module.exports = router;