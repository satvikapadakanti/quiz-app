import React, { useState } from "react";

const Question = ({ questionData, handleAnswerClick }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (option) => {
    setSelected(option.text);
    setTimeout(() => {
      handleAnswerClick(option.isCorrect);
      setSelected(null);
    }, 500);
  };

  return (
    <div className="question-card">
      <h2>{questionData.question}</h2>
      <div className="options">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            className={selected === option.text ? (option.isCorrect ? "correct" : "incorrect") : ""}
            onClick={() => handleClick(option)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
