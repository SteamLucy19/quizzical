import React from 'react';
import { decode } from 'html-entities';

const Question = ({
  question,
  questionIndex,
  selectedAnswer,
  handleAnswerSelect,
  showResults,
  disabled,
}) => {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    const shuffledOptions = shuffle([...question.incorrect_answers, question.correct_answer]);
    setOptions(shuffledOptions);
  }, [question]);

  return (
    <div className="question">
      <h2 className="question-title">{decode(question.question)}</h2>
      <div className="options">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = showResults && option === question.correct_answer;
          const isIncorrect = showResults && selectedAnswer === option && option !== question.correct_answer;
          return (
            <button
              key={index}
              className={`option-button ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`}
              onClick={() => handleAnswerSelect(questionIndex, option)}
              disabled={disabled}
            >
              {decode(option)}
            </button>
          );
        })}
      </div>
      <hr className="line"></hr>
    </div>
  );
};

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default Question;
