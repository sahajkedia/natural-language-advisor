import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export default function Question({
  question,
  totalQuestion,
  currentQuestion,
  setAnswer,
}) {
  const [selectedOption, setSelectOption] = useState(null);
  const timer = useRef(null);
  const progressBar = useRef(null);

  function gottoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    flushSync(() => {
      setAnswer(selectedOption);
    });
    setSelectOption(null);
  }

  useEffect(() => {
    progressBar.current.classList.remove("active");
    setTimeout(() => {
      progressBar.current.classList.add("active");
    }, 0);
    timer.current = setTimeout(gottoNextQuestion, 10 * 1000);
    return gottoNextQuestion;
  }, [question]);

  return (
    <div className="question">
      <div className="progress-bar" ref={progressBar}></div>
      <div className="question-count">
        <b>{currentQuestion}</b>
      </div>
      <div className="main">
        <div className="title">
          <span>Question : </span>
          <p>{question.title}</p>
        </div>
        <div className="options">
          {question.options.map((option, index) => {
            return (
              <div
                className={
                  index === selectedOption ? "option active" : "option"
                }
                key={index}
                onClick={() => setSelectOption(index)}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="control">
        <button className="btn btn--dark" onClick={gottoNextQuestion}>
          Next{" "}
        </button>
      </div>
    </div>
  );
}
