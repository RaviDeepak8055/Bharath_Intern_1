const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const explanationElement = document.getElementById("explanation");

let currentQuestionIndex = 0;
let score = 0;
let timer;

const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false},
            { text: "Paris", correct: true},
            { text: "Rome", correct: false},
            { text: "London", correct: false},
        ]
    },
    {
        question: "Which river is the longest in the world?",
        answers: [
            { text: "Amazon", correct: false},
            { text: "Nile", correct: true},
            { text: "Yangtze", correct: false},
            { text: "Mississippi", correct: false},
        ]
    },
    {
        question: "In which continent is the Sahara Desert located?",
        answers: [
            { text: "Africa", correct: true},
            { text: "Asia", correct: false},
            { text: "South America", correct: false},
            { text: "Australia", correct: false},
        ]
    },
    {
        question: "What is the highest mountain in the world?",
        answers: [
            { text: "Mount Kilimanjaro", correct: false},
            { text: "Kangchenjunga", correct: false},
            { text: "Mount Everest", correct: true},
            { text: "Denali", correct: false},
        ]
    },
    {
        question: "Which country is known as the 'Land of the Rising Sun'?",
        answers: [
            { text: "China", correct: false},
            { text: "Japan", correct: true},
            { text: "South Korea", correct: false},
            { text: "Vietnam", correct: false},
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false},
            { text: "Nauru", correct: false},
            { text: "Vatican City", correct: true},
            { text: "San Marino", correct: false},
        ]
    },
    {
        question: "Which ocean is the largest?",
        answers: [
            { text: "Indian Ocean", correct: false},
            { text: "Atlantic Ocean", correct: false},
            { text: "Southern Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
        ]
    },
    {
        question: "What is the capital of Australia?",
        answers: [
            { text: "Sydney", correct: false},
            { text: "Melbourne", correct: false},
            { text: "Canberra", correct: true},
            { text: "Brisbane", correct: false},
        ]
    },
    {
        question: "Which country is known as the 'Pearl of Africa'?",
        answers: [
            { text: "Tanzania", correct: false},
            { text: "Uganda", correct: true},
            { text: "Kenya", correct: false},
            { text: "Rwanda", correct: false},
        ]
    },
    {
        question: "In which mountain range is Mount Everest located?",
        answers: [
            { text: "Andes", correct: false},
            { text: "Rocky Mountains", correct: false},
            { text: "Himalayas", correct: true},
            { text: "Alps", correct: false},
        ]
    },
    // Add more questions here...
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    resetTimer();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });

    startTimer();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
    resetExplanation();
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    showExplanation("Correct answer: Paris");
}

function showScore() {
    resetState();
    resetTimer();
    questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length + '!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function startTimer() {
    let timeRemaining = 20; // Set the time limit for each question in seconds
    timer = setInterval(() => {
        timerElement.innerHTML = "Time: " + timeRemaining + "s";
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer);
            handleNextButton();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timerElement.innerHTML = "";
}

function showExplanation(explanation) {
    explanationElement.innerHTML = explanation;
    explanationElement.style.display = "block";
}

function resetExplanation() {
    explanationElement.innerHTML = "";
    explanationElement.style.display = "none";
}

startQuiz();
