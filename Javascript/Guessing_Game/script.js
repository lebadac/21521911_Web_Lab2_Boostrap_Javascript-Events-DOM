const randomNumber = Math.floor(Math.random() * 100) + 1;

const guess = document.getElementById('guess');
const feedback = document.getElementById('feedback');
const submitGuess = document.getElementById('submitGuess');

submitGuess.addEventListener('click', function() {
    const userGuess = Number(guess.value);

    if (userGuess < randomNumber) {
        feedback.textContent = 'Too low!';
    } else if (userGuess > randomNumber) {
        feedback.textContent = 'Too high!';
    } else if (userGuess === randomNumber) {
        feedback.textContent = 'Correct! You guessed it!';
    } else {
        feedback.textContent = 'Please enter a valid number.';
    }
});
