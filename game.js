const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "  What is the name of the iconic book that contained insults about almost every person in the school?",
    choice1: "Burn Book",
    choice2: " The Bible",
    choice3: "Gossip Lounge",
    choice4: "The Fetch",
    answer: 1
  },
  {
    question: "What is the name of the Math Club that Cady was in ?",
    choice1: "Calculus Hero",
    choice2: "Calc-oholics",
    choice3: "Mathletes",
    choice4: "Axis Anything",
    answer: 3
  },
  {
    question: "Which member was NOT part of the plastics?",
    choice1: "Gretchen Wieners",
    choice2: "Regina George",
    choice3: "Karen Smith",
    choice4: "Lizzy Peters",
    answer: 4
  },
  {
    question: "Who are the first friends that Cady makes on her first day of school?",
    choice1: "Janis Ian and Damian Leigh",
    choice2: "Lizzy Caplan Niel Flynn",
    choice3: "Ely Henry and Daria Malen",
    choice4: "Jane Morrison and Alan Skye",
    answer: 1
  }
];

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  acceptingAnswer = true;
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    // end the game
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${ questionCounter}  / ${ MAX_QUESTIONS}`;
//Update the progress bar//

progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;
};


choices.forEach(choice => {
  choice.addEventListener('click', e => {
    handleChoiceSelection(e.target);
  });

   choice.addEventListener('touchstart', e => {
    handleChoiceSelection(e.target);
  });
}); 
    
    
    
    
handleChoiceSelection = selectedChoice => {
  if (!acceptingAnswer) return;
  acceptingAnswer = false;
  const selectedAnswer = selectedChoice.dataset["number"];
  const classToApply = 
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  if(classToApply === 'correct'){
    incrementScore(CORRECT_BONUS);
  }
  selectedChoice.parentElement.classList.add(classToApply);
  setTimeout( () =>{
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  },1000);
};

 incrementScore = num => {
   score +=num;
   scoreText.innerText = score;
 };
startGame();