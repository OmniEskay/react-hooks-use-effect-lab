import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        onAnswered(false); // only call onAnswered when timer hits 0
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered]);

  // Reset timer when the question changes
  useEffect(() => {
    setTimeRemaining(10);
  }, [question]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
