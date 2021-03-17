import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import Timer from './Timer';

const chords_symbols = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const chords_names = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

function generateQuestion(questions) {
  var curr_chord_pos = Math.floor(Math.random() * questions.length);
  
  const possible_pos = [-1, 1];
  var pos = possible_pos[Math.floor(Math.random() * possible_pos.length)];
  var next_chord_pos = (((curr_chord_pos + pos) % questions.length) + questions.length) % questions.length;
  
  const qtext = `${pos === 1 ? 'Depois de' : 'Antes de'} ${questions[curr_chord_pos]}`;
  
  const helper = questions.slice();
  const random_answers = helper.sort(() => Math.random() - Math.random()).slice(0, 4);
  const answer_pos = Math.floor(Math.random() * 4);
  
  if (!(random_answers.includes(questions[next_chord_pos]))) {
    random_answers[answer_pos] = questions[next_chord_pos];
  }

  const answerOptions = random_answers.map(x => {
    return {'answerText': x, 'isCorrect': (x === questions[next_chord_pos])}
  });

  const question = {
    questionText: qtext,
    answerOptions: answerOptions
  }
  
  return question;
}

function getTime(streak) {
  return Math.max(Math.floor(-6/25*streak + 20), 1);
}

function Game(questions) {
  const question = generateQuestion(questions);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastRight, setLastRight] = useState(null);
  
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setLastRight(true);
    } else {
      setStreak(0);
      setLastRight(false);
    }
    
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
  }
  
  return (
    <div className='wrapper'>
      <div className='app'>
          <div className='question-section'>
            <div className='question-title'>
              <span>{question.questionText}</span>
            </div>
            <br></br>
            <div className='score-data feedback'>{lastRight==undefined?'Vamo que vamo' : lastRight ? 'Certo!':'Errado =('}</div>
            <div className='score-data'>Streak {streak}</div>
            <div className='score-data'>Certas {score} / {currentQuestion}</div>
          </div>
          <div className='answer-section'>
            {question.answerOptions.map((answerOption) => (
              <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
              ))}
          </div>
      </div>
      
      <Timer time={getTime(streak)} question={currentQuestion}/>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default function App() {
  return <h2>Home</h2>;

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/symbols">Chord Symbols</Link>
          </li>
          <li>
            <Link to="/names">Chord Names</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/symbols">
            <Game chords_symbols/>
          </Route>
          <Route path="/names">
            <Game chords_names/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}