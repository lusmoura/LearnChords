import React, { useState } from 'react';
import Timer from './Timer';

const chords = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

function generateQuestion() {
  var curr_chord_pos = Math.floor(Math.random() * chords.length);
  
  const possible_pos = [-1, 1];
  var pos = possible_pos[Math.floor(Math.random() * possible_pos.length)];
  var next_chord_pos = (((curr_chord_pos + pos) % chords.length) + chords.length) % chords.length;
  
  const qtext = `${pos === 1 ? 'Depois de' : 'Antes de'} ${chords[curr_chord_pos]}`;
  
  const helper = chords.slice();
  const random_answers = helper.sort(() => Math.random() - Math.random()).slice(0, 4);
  const answer_pos = Math.floor(Math.random() * 4);
  
  if (!(random_answers.includes(chords[next_chord_pos]))) {
    random_answers[answer_pos] = chords[next_chord_pos];
  }

  const answerOptions = random_answers.map(x => {
    return {'answerText': x, 'isCorrect': (x === chords[next_chord_pos])}
  });

  const question = {
    questionText: qtext,
    answerOptions: answerOptions
  }
  
  return question;
}

function getTime(streak) {
  return Math.max(Math.floor(-6/25*streak + 20), 2);
}

export default function App() {
  const question = generateQuestion();

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