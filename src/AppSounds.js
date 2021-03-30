import React, { useState } from 'react';
import Timer from './Timer';
import c1 from './imgs/c1.png'
import d1 from './imgs/d1.png'
import e1 from './imgs/e1.png'
import f1 from './imgs/f1.png'
import g1 from './imgs/g1.png'
import a1 from './imgs/a1.png'
import b1 from './imgs/b1.png'
import c2 from './imgs/c2.png'
import d2 from './imgs/d2.png'
import e2 from './imgs/e2.png'
import f2 from './imgs/f2.png'
import g2 from './imgs/g2.png'
import a2 from './imgs/a2.png'

const chords = [c1, d1, e1, f1, g1, a1, b1, c2, d2, e2, f2, g2, a2,];
const chords_names = ['c1', 'd1', 'e1', 'f1', 'g1', 'a1', 'b1', 'c2', 'd2', 'e2', 'f2', 'g2', 'a2',];

function generateQuestion() {
  var curr_chord_pos = Math.floor(Math.random() * chords.length);
  
  const qtext = chords[curr_chord_pos];
  
  const helper = chords.slice();
  const random_answers = helper.sort(() => Math.random() - Math.random()).slice(0, 4);
  const answer_pos = Math.floor(Math.random() * 4);
  
  if (!(random_answers.includes(chords[curr_chord_pos]))) {
    random_answers[answer_pos] = chords[curr_chord_pos];
  }

  const answerOptions = random_answers.map(x => {
    const index = chords.indexOf(x);
    console.log(x, index)
    return {'answerText': chords_names[index], 'isCorrect': (x === chords[curr_chord_pos])}
  });

  console.log(random_answers);
  console.log(chords[curr_chord_pos]);
  console.log(answerOptions);

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
              <span>Qual a nota?</span>
              <br></br>
              <img src={question.questionText} alt='question image' className='question-image'/>
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