// src/App.js
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    if (isValidEmail(email)) {
      setQuizStarted(true);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="App">
      {!quizStarted ? (
        <div className='login'>
          <h1>Quiz Application</h1>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="startbutton" onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
