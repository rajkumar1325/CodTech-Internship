const questions = document.querySelectorAll('.question');
const progressBar = document.querySelector('.progress-bar');
const scoreElement = document.getElementById('score');
const feedback = document.querySelector('.feedback');
let currentQuestion = 0;
let score = 0;

function initializeQuiz() {
    questions.forEach(question => {
        const options = question.querySelectorAll('button');
        options.forEach((button, index) => {
            button.addEventListener('click', () => checkAnswer(index, question));
        });
    });
}

function checkAnswer(selectedIndex, question) {
    const correctIndex = parseInt(question.dataset.correct);
    const options = question.querySelectorAll('button');

    options.forEach(button => button.disabled = true);

    if (selectedIndex === correctIndex) {
        score++;
        scoreElement.textContent = score;
        feedback.textContent = 'Correct!';
    } else {
        feedback.textContent = 'Incorrect!';
    }

    updateProgress();
    setTimeout(() => moveToNextQuestion(), 1000);
}

function moveToNextQuestion() {
    questions[currentQuestion].classList.remove('active');
    currentQuestion++;

    if (currentQuestion < questions.length) {
        questions[currentQuestion].classList.add('active');
        feedback.textContent = '';
    } else {
        feedback.textContent = `Quiz completed! Final score: ${score}/5`;
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

initializeQuiz();
