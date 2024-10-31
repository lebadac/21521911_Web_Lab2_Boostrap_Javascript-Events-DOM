// Create quiz
const quizData = [
    {
        question: "1. What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Rome"
        },
        correctAnswer: "c"
    },
    {
        question: "2.Which planet is known as the Red Planet?",
        answers: {
            a:  "Earth",
            b: "Mars",
            c: "Jupiter",
            d: "Venus"
        },
        correctAnswer: "b"
    },
    {
        question: "3. What is the largest ocean on Earth?",
        answers: {
            a: "Atlantic",
            b: "Indian",
            c: "Arctic",
            d: "Pacific",
        
        },
        correctAnswer: "d"
    }
];

// Get elements
const quiz = document.getElementById('quiz');
const results = document.getElementById('results');
const submit = document.getElementById('submit');

// Build quiz
function buildQuiz() {
    const output = [];

    quizData.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (let letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label><br>`
            );
        }
        output.push(
            `<div class="question" style="margin-bottom: 10px;"><strong>${currentQuestion.question}</strong></div>
            <div class="answers" style="margin-bottom: 20px;">${answers.join('')}</div>`
        );
    });

    quiz.innerHTML = output.join('');
}

// Show results
function showResults() {
    const answerContainers = quiz.querySelectorAll('.answers');
    let numCorrect = 0;

    quizData.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    results.innerHTML = `Your score: ${numCorrect}/${quizData.length}`;
}

// Display quiz
buildQuiz();

// Submit quiz
submit.addEventListener('click', showResults);
