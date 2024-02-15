const questions = [
    {
        question: " What is the primary goal of cybersecurity?",
        answers: [
            { text: "Enhancing internet speed", correct: false},
            { text: "Protecting digital assets from cyber threats", correct: true},
            { text: "Creating new computer technologies", correct: false},
            { text: " Increasing social media engagement", correct: false},
        ]
    },
    {
        question: " Which is the common method for enhancing authentication security?",
        answers: [
            { text: "Ignoring password changes", correct: false},
            { text: "Using easily guessable passwords", correct: false},
            { text: "Two-factor authentication", correct: true},
            { text: "Sharing passwords with colleagues", correct: false},
        ]
    },
    {
        question: "What does encryption do for data?",
        answers: [
            { text: " Makes it publicly accessible", correct: false},
            { text: "Converts it into an unreadable format", correct: true},
            { text: "Deletes it permanently", correct: false},
            { text: "Enhances its speed of transmission", correct: false},
        ]
    },
    {
        question: " Which practice helps prevent unauthorized access to digital systems?",
        answers: [
            { text: " Sharing passwords with friends", correct: false},
            { text: "Ignoring software updates", correct: false},
            { text: "Using strong, unique passwords", correct: true},
            { text: " Keeping sensitive information in plain text files", correct: false},
        ]
    },
    {
        question: "How can individuals and employees contribute to cybersecurity?",
        answers: [
            { text: "By clicking on suspicious links", correct: false},
            { text: "By sharing sensitive information online", correct: false},
            { text: " By ignoring cybersecurity training", correct: false},
            { text: " By recognizing common phishing tactics and social engineering schemes", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const levelButton = document.getElementById("levelup-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
    levelButton.innerHTML = "Next Level";
    levelButton.style.display = "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();