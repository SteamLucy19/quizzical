import React from 'react';

const StartPage = ({ startQuiz }) => (
  <div className="quiz-card-startPage">
    <h1 className="quiz-card-title">Quizzical</h1>
    <p className="quiz-card-context">Some description if needed</p>
    <button className="start-button-startPage" onClick={startQuiz}>Start quiz</button>
  </div>
);

export default StartPage;
