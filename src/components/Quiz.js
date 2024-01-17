// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(30 * 60); // Initial timer set to 30 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetching questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(countdownTimer);
  }, []);

  // Function to handle user answer selection
  const handleAnswerSelect = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedAnswer,
    }));
  };

  // Function to navigate to a specific question
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Function to navigate to the next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex === questions.length - 1) {
      // Last question, mark the quiz as completed
      setQuizCompleted(true);
    }
  };

  // Function to restart the quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizCompleted(false);
  };

  // Function to render the quiz report
  const renderQuizReport = () => {
    return (
      <div className='report'>
        <h2>Quiz Report</h2>
        <ul>
          {questions.map((question, index) => (
            <li className=" reportli" key={index}>
              <h3>Question {index + 1}:</h3>
              <h5>Your Answer: {userAnswers[index]}</h5>
              <h5>Correct Answer: {question.correctAnswer}</h5>
            </li>
          ))}
        </ul>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  };

  // Function to render the question panel
  const renderQuestionPanel = () => {
    return (
      <div className="questionPanel">
        <h3>Question Panel</h3>
        <ul>
          {questions.map((question, index) => (
            <li
              key={index}
              onClick={() => goToQuestion(index)}
              className={`questionPanelItem ${
                userAnswers[index]
                  ? 'answered' // answered (green)
                  : currentQuestionIndex === index
                  ? 'not-attempted' // current question not attempted (red)
                  : ''
              }`}
            >
              Q {index + 1}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="Quiz">
      {loading ? (
        <p>Loading questions...</p>
      ) : quizCompleted ? (
        renderQuizReport()
      ) : (
        <div className="quizContainer">
          <div className="quizComponent">
            <h2>Quiz Component</h2>
            <p>
              Timer: {Math.floor(timer / 60)}:{(timer % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}
            </p>

            {/* Displaying current question */}
            {questions.length > 0 && currentQuestionIndex < questions.length && (
              <div>
                <p>Question {currentQuestionIndex + 1}:</p>
                <p>{questions[currentQuestionIndex].question}</p>

                {/* Displaying choices */}
                <ul className="optionsList">
                  {questions[currentQuestionIndex].choices.map((choice, index) => (
                    <li key={index}>
                      <label>
                        <input
                          type="radio"
                          value={choice}
                          checked={userAnswers[currentQuestionIndex] === choice}
                          onChange={() => handleAnswerSelect(choice)}
                        />
                        {choice}
                      </label>
                    </li>
                  ))}
                </ul>

                {/* Next button */}
                <button onClick={handleNextQuestion} className='button'>Next</button>
              </div>
            )}
          </div>

          {renderQuestionPanel()}
        </div>
      )}
    </div>
  );
};

export default Quiz;
