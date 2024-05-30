import React, { useState, useEffect } from 'react';
import Question from './question';

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [playAgainDisabled, setPlayAgainDisabled] = useState(true);
  const [playAgainCountdown, setPlayAgainCountdown] = useState(0); 
  const [countdownInterval, setCountdownInterval] = useState(null);

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdownInterval]);

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch questions');
        }
        return res.json();
      })
      .then(data => {
        setQuestions(data.results);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }

  function handleAnswerSelect(questionIndex, selectedAnswer) {
    setSelectedAnswers(prevAnswers => Object.assign({}, prevAnswers, {
      [questionIndex]: selectedAnswer,
    }));
  }
  
  function checkAnswers() {
    setShowResults(true);
    setPlayAgainDisabled(false); 
    setPlayAgainCountdown(5);

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    const interval = setInterval(() => {
      setPlayAgainCountdown(prevCount => prevCount - 1);
    }, 1000);

    setCountdownInterval(interval);

    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
  }

  function playAgain() {
    setPlayAgainDisabled(true);
    setPlayAgainCountdown(5);

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    const interval = setInterval(() => {
      setPlayAgainCountdown(prevCount => prevCount - 1);
    }, 1000);

    setCountdownInterval(interval);

    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch questions');
        }
        return res.json();
      })
      .then(data => {
        setQuestions(data.results);
        setShowResults(false);
        setSelectedAnswers({});
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      })
      .finally(() => {
        setTimeout(() => {
          setPlayAgainDisabled(false);
          setPlayAgainCountdown(0);
          clearInterval(interval);
        }, 5000);
      });
  }

  return (
    <div className="quiz-card-quizPage">
      {questions.map((question, index) => (
        <Question
          key={index}
          question={question}
          questionIndex={index}
          selectedAnswer={selectedAnswers[index]}
          handleAnswerSelect={handleAnswerSelect}
          showResults={showResults}
          disabled={showResults}
        />
      ))}
      {showResults ? (
        <div className="result-score">
          <p className="quiz-page-score">
            You scored{' '}
            {questions.filter(
              (question, index) => selectedAnswers[index] === question.correct_answer
            ).length}/{questions.length} correct answers
          </p>
          <button 
            className="play-again-button" 
            onClick={playAgain} 
            disabled={playAgainDisabled || playAgainCountdown > 0}
          >
            {playAgainCountdown > 0 ? `Play again (${playAgainCountdown})` : 'Play again'}
          </button>
        </div>
      ) : (
        <div className="checkAnswer">
          <button className="check-button-quizPage" onClick={checkAnswers}>
            Check answers
          </button>
        </div>
      )}
    </div>
  );
}
