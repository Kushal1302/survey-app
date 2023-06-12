import React, { useState } from 'react';

const questions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', options: [1, 2, 3, 4, 5] },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', options: [1, 2, 3, 4, 5] },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', options: [1, 2, 3, 4, 5] },
  { id: 4, text: 'On a scale of 1-10, how likely are you to recommend us to your friends and family?', type: 'rating', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' }
];

const App = () => {
  const generateSessionId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let sessionId = '';

    for (let i = 0; i < 10; i++) {
      sessionId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return sessionId;
  };
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  let [sessionId] = useState(generateSessionId());

  const handleAnswer = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prevQuestion => prevQuestion - 1);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }
  };

  const handleSubmitSurvey = () => {
    saveAnswers();
    console.log('Survey submitted!');
  };

  const saveAnswers = () => {
    localStorage.setItem('survey' , JSON.stringify(answers))
    console.log('Answers saved:', answers);
  };

  

  const currentQuestionNumber = currentQuestion ;
  const totalQuestions = questions.length;
  const currentQuestionObj = questions[currentQuestion];

  return (
    <div className="App">
      {currentQuestion <= 0 ? (
        <div>
          <h1>Welcome to Our Shop!</h1>
          <button onClick={handleNextQuestion}>Start</button>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestionNumber}/{totalQuestions}</h2>
          <p>{currentQuestionObj.text}</p>
          {currentQuestionObj.type === 'rating' && (
            <div>
              {currentQuestionObj.options.map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`question-${currentQuestionObj.id}`}
                    value={option}
                    onChange={() => handleAnswer(currentQuestionObj.id, option)}
                    checked={answers[currentQuestionObj.id] === option}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
          {currentQuestionObj.type === 'text' && (
            <textarea
              name={`question-${currentQuestionObj.id}`}
              onChange={event => handleAnswer(currentQuestionObj.id, event.target.value)}
              value={answers[currentQuestionObj.id] || ''}
            />
          )}
          <div>
            {currentQuestion > 0 && (
              <button onClick={handlePrevQuestion}>Previous</button>
            )}
            {currentQuestion < totalQuestions - 1 && (
              <button onClick={handleNextQuestion}>Next</button>
            )}
            <button onClick={handleSkipQuestion}>Skip</button>
            {currentQuestion === totalQuestions - 1 && (
              <button onClick={handleSubmitSurvey}>Submit</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
