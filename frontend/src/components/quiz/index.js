import QuizScreen from "./QuizScreen";
import JoinScreen from "./JoinScreen";
import NavBar from "./NavBar";
import { useState } from "react";
import "./style.css";

export default function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  return (
    <>
      <NavBar />

      <div className="quiz-container">
        {isQuizStarted ? (
          <QuizScreen retry={() => setIsQuizStarted(false)} />
        ) : (
          <JoinScreen start={() => setIsQuizStarted(true)} />
        )}
      </div>
    </>
  );
}
