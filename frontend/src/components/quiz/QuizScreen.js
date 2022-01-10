import QuestionList from "./sample-data.json";
import QuizResult from "./QuizResult.js";
import Question from "./Question.js";
import { useState } from "react";

export default function QuizScreen({ retry }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(QuestionList.length)
  );
  const isQuestionEnd = currentQuestionIndex === QuestionList.length;

  const calculateResult = () => {
    let correct = 0;
    QuestionList.forEach((question, index) => {
      if (question.answer === markedAnswers[index]) {
        correct++;
      }
    });

    return {
      total: QuestionList.length,
      correct,
      percentage: Math.trunc(correct / QuestionList.length) * 100,
    };
  };
  return (
    <div className="quiz-screen">
      {isQuestionEnd ? (
        <QuizResult result={calculateResult()} retry={retry} />
      ) : (
        <Question
          question={QuestionList[currentQuestionIndex]}
          totalQuestion={QuestionList.length}
          currentQuestion={currentQuestionIndex + 1}
          setAnswer={(index) => {
            setMarkedAnswers((arr) => {
              let newArr = [...arr];
              newArr[currentQuestionIndex] = index;
              return newArr;
            });
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }}
        />
      )}
    </div>
  );
}
