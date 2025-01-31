import React, { useState, useEffect } from "react";
import { fetchQuizData } from "../api";
import Question from "./Question";
import Result from "./Result";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await fetchQuizData();
      if (data && data.questions.length > 0) {
        setQuestions(data.questions);
      }
    };
    loadQuiz();
  }, []);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 10);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        questions.length > 0 ? (
          <>
            <h2>Question {currentQuestion + 1} / {questions.length}</h2>
            {/* Progress Bar */}
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <Question
              questionData={questions[currentQuestion]}
              handleAnswerClick={handleAnswerClick}
            />
            {/* Score Counter */}
            <div className="score-counter">Score: {score}</div>
          </>
        ) : (
          <p>Loading questions...</p>
        )
      ) : (
        <Result score={score} totalQuestions={questions.length} />
      )}
    </div>
  );
};

export default Quiz;
