

const quizData = [
  {
    qns: "Which CSS property adds a shadow around an element?",
    options: ["text-shadow", "box-shadow", "element-shadow", "border-shadow"],
    correctAnswer: 1,
  },
  {
    qns: "Which JavaScript operator checks both value and data type?",
    options: ["==", "=", "===", "!="],
    correctAnswer: 2,
  },
  {
    qns: "Which CSS property controls the transparency of an element?",
    options: ["visibility", "display", "opacity", "transparent"],
    correctAnswer: 2,
  },
  {
    qns: "Which JavaScript method rounds a number to the nearest integer?",
    options: ["Math.floor()", "Math.round()", "Math.random()", "Math.ceil()"],
    correctAnswer: 1,
  },
  {
    qns: "Which CSS pseudo-class applies styles when the mouse is over an element?",
    options: [":active", ":focus", ":visited", ":hover"],
    correctAnswer: 3,
  },
  {
    qns: "What is the output of typeof null in JavaScript?",
    options: ["null", "object", "undefined", "boolean"],
    correctAnswer: 1,
  },
  {
    qns: "Which CSS property prevents text from overflowing onto a new line?",
    options: ["white-space", "text-align", "word-spacing", "text-indent"],
    correctAnswer: 0,
  },
  {
    qns: "Which JavaScript keyword is used to define a constant?",
    options: ["let", "var", "const", "static"],
    correctAnswer: 2,
  },
  {
    qns: "Which CSS unit is relative to the root element's font size?",
    options: ["px", "em", "rem", "%"],
    correctAnswer: 2,
  },
  {
    qns: "Which JavaScript array method creates a new array by transforming each element?",
    options: ["filter()", "map()", "find()", "reduce()"],
    correctAnswer: 1,
  },
];

const question = document.getElementById("qns");
const options = document.getElementById("options");
const qnsCount = document.getElementById("qnsNum");
const nextBtn = document.getElementById("nextbtn");

let currentIndex = 0; 
let selectAns = null ;
let userAns = [];
let score = 0 ;
let timer = null ;

function loadingQns() {
  let currentQns = quizData[currentIndex];

  qnsCount.innerText = `Qns ${currentIndex + 1}/${quizData.length}`;

  qns.innerText = currentQns.qns;

  options.innerHTML = "";

  currentQns.options.forEach((option, index) => {
    const col = document.createElement("div");

    col.classList.add("col-md-6");

    const button = document.createElement("button");

    button.innerText = option;

    button.classList.add("btn", "option-btn");

    button.onclick = function () {
      selectAns = index;

      console.log("user answer", userAns);

      nextQns();
    };

    options.appendChild(col);

    col.appendChild(button);
  });

  startTimer();
}

loadingQns();

function startTimer(){

  let timerElement = document.getElementById("timer");

  clearInterval(timer);

  timeLeft = 30;

  timerElement.innerText=`time left ${timeLeft}`;

  timer= setInterval(()=>{

    timeLeft -- ;

    timerElement.innerText=`timer left ${timeLeft}`;

    if (timeLeft<=0){
      clearInterval(timer);

      selectAns = null ;

      nextQns();
    }
  },1000);
}


function nextQns() {
  clearInterval(timer);

  if (selectAns === null) {
  }

  userAns.push({
    qns: quizData[currentIndex].qns,
    userSelect: selectAns,
    options: quizData[currentIndex].options,
    correctAnswer: quizData[currentIndex].correctAnswer,
  });

  if (selectAns === quizData[currentIndex].correctAnswer) {
    score++;
  }
  if (currentIndex < quizData.length - 1) {
    selectAns = null;
    currentIndex++;
    loadingQns();
  } else {
    result();
  }
}

function result() {
  let result = document.querySelector(".quiz-card");

  result.innerHTML = "";

  result.innerHTML = `

  <h3 class="text-center mt-3">Quiz result </h3>
  <h4 class=text-center result>Result :-${score}/ ${quizData.length} </h4>

  <div class="mt-4">
  <h3 class="text-center">Review summary</h3>
  <ul class="list-group"> 
  ${userAns.map(
    (ans, index) => `

     <li class="list-group-item">
     <h5 class="text-center">Question No:- ${index + 1} :- ${ans.qns}</h5>
     <br>

     <h5 class="text-center">Your answer:- ${ans.userSelect !== null ? ans.options[ans.userSelect] : "not selected"} </h5>
     <br>

     <h5 class="text-center">Correct answer:- ${ans.options[ans.correctAnswer]}</h5>
     </li>
    `,
  )}
  
 
  </ul>
  </div>
  `;
}