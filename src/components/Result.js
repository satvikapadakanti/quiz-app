import React from "react";

const Result = ({ score, totalQuestions }) => {
  return (
    <div className="result-card">
      <h2>🎉 Quiz Completed! 🎉</h2>
      <p>Your Score: <strong>{score}</strong> / {totalQuestions * 10}</p>
      <p>{score >= (totalQuestions * 10) / 2 ? "Great job! 🚀" : "Try again! 😃"}</p>
      <button onClick={() => window.location.reload(false)}>Restart Quiz</button>
    </div>
  );
};

export default Result;
