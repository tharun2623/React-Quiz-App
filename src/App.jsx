import React, { useState, useEffect } from 'react';
import "./App.css";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: "William Shakespeare",
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(60); // 60 seconds
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleNext();
          return 60; // Reset timer after auto-move
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQuestionIndex]); // reset timer when question changes

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setSelectedOption("");

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(60); // Reset timer
    } else {
      setShowScore(true);
    }
  };

  return (
    <>
      <div className="navbar">🔥 Ultimate Quiz Challenge 🔥</div>

      <div className="app-container">
        {showScore ? (
          <div className="score-container">
            <h2>🏆 Quiz Completed!</h2>
            <p>Your Score: {score} / {questions.length}</p>
          </div>
        ) : (
          <>
            <div className="timer-container">
              <div className="timer-circle">
                {timer}s
              </div>
            </div>

            <div className="question-container">
              <h2>{questions[currentQuestionIndex].question}</h2>

              <div className="options-container">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${
                      selectedOption === option ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button className="next-btn" onClick={handleNext}>
                Next Question
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
