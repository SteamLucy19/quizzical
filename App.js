import React from 'react'
import StartPage from './startPage'
import QuizPage from './quizPage'

export default function App() {
  const [quizStarted, setQuizStarted] = React.useState(false)

  function startQuiz() {
    setQuizStarted(true)
  }

  return (
    <div className="App">
      {quizStarted ? <QuizPage /> : <StartPage startQuiz={startQuiz} />}
    </div>
  )
}