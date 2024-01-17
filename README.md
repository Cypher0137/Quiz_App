#Quiz Application
Quiz Application is a web-based quiz platform built with React.js for the frontend and Node.js for the backend. The application fetches quiz questions from the Open Trivia Database API, presents them to the user, and provides a timer for each quiz session.

#Features
User Authentication: Collects the user's email address before starting the quiz.
Quiz Flow: Presents 15 questions to the user with a countdown timer. Auto-submits when the timer reaches zero.
Navigation: Users can navigate to specific questions and view an overview panel indicating visited and attempted questions.
Quiz Report: Displays a report after the quiz or when the timer ends, showing each question with the user's answer and the correct answer.
Data Source: Fetches quiz questions from Open Trivia Database API.

#Getting Started
To run the project locally, follow these steps:

#Prerequisites
Node.js installed on your machine
Internet connection for fetching quiz questions from the API

#Installation
Clone the repository:

git clone https://github.com/Cypher0137/quiz-application.git
Install dependencies for both the frontend and backend:


cd quiz-application
cd quizapplication-frontend
npm install

cd ..
cd quizapplication-backend
npm install


Usage
Start the backend server:


cd quizapplication-backend
npm start
#The backend server will run on http://localhost:5000.



#Start the frontend development server:

cd quizapplication-frontend
npm start
The React app will run on http://localhost:3000.

Open your browser and navigate to http://localhost:3000 to use the quiz application.

Contributing
Contributions are welcome! Please create a pull request or open an issue if you find any bugs or have suggestions for improvements.
