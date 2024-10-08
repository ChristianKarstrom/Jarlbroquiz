document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion = 1;
    const totalQuestions = document.querySelectorAll('.question').length;
    const correctAnswers = {
        q1: 'c', // 1% korrekt
        q2: 'a', // Ofärgad plast är lättare att återvinnas
        q3: 'b', // 45 000 st
        q4: 'c', // En blandning av flera syntetiska ämnen
        q5: 'c', // Den bryts aldrig ner
        q6: 'a', // "Glas och gaffel"-symbolen
        q7: 'c', // ca 85%
        q8: 'c'  // 150 kilo
    };

    // Function to highlight the correct answer
    function highlightCorrectAnswer(questionId) {
        const correctAnswer = correctAnswers[questionId];
        const correctLabel = document.querySelector(`input[name="${questionId}"][value="${correctAnswer}"]`).parentElement;
        correctLabel.classList.add('correct-answer');
    }

    // Handle Answer Selection and Fact Display
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            const questionId = this.name;
            const userAnswer = this.value;
            const correctAnswer = correctAnswers[questionId];

            // Always highlight the correct answer
            highlightCorrectAnswer(questionId);

            // If the selected answer is incorrect, highlight it as incorrect
            if (userAnswer !== correctAnswer) {
                this.parentElement.classList.add('incorrect-answer');
            }

            // Disable all radio buttons for this question after selection
            document.querySelectorAll(`input[name="${questionId}"]`).forEach(radio => radio.disabled = true);

            // Show the fact immediately
            document.getElementById(`fact-${questionId}`).style.display = 'block';
            document.querySelector(`#question-${currentQuestion} .next-btn`).style.display = 'inline-block';
        });
    });

    // Update progress bar
    function updateProgressBar() {
        const progressPercent = (currentQuestion / totalQuestions) * 100;
        document.getElementById('progress').style.width = `${progressPercent}%`;
    }

    // Show the current question
    function showQuestion(questionIndex) {
        document.querySelectorAll('.question').forEach((question, index) => {
            question.style.display = (index === questionIndex - 1) ? 'block' : 'none';
        });
    }

    // Handle Next Button Clicks
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!document.querySelector(`input[name="q${currentQuestion}"]:checked`)) {
                alert("Please select an answer before moving on.");
                return;
            }
            currentQuestion = parseInt(this.getAttribute('data-next'));
            updateProgressBar();
            showQuestion(currentQuestion);
            if (currentQuestion === totalQuestions) {
                document.getElementById('submit-btn').style.display = 'block';
            }
        });
    });

    // Handle Previous Button Clicks
    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', function() {
            currentQuestion = parseInt(this.getAttribute('data-prev'));
            updateProgressBar();
            showQuestion(currentQuestion);
            if (currentQuestion < totalQuestions) {
                document.getElementById('submit-btn').style.display = 'none';
            }
        });
    });

    // Handle Quiz Submission
    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        let score = 0; // Initialize score

        // Loop through each question
        Object.keys(correctAnswers).forEach(question => {
            let userAnswer = document.querySelector(`input[name="${question}"]:checked`);
            if (userAnswer && correctAnswers[question] === userAnswer.value) {
                score++; // Increment score if the answer is correct
            }
        });

        const totalQuestions = Object.keys(correctAnswers).length; // Get total number of questions
        const result = `Du fick ${score} av ${totalQuestions} rätt`; // Prepare result message in Swedish
        document.getElementById('result').textContent = result; // Display the result
    });

    // Initialize the quiz
    updateProgressBar();
    showQuestion(currentQuestion);
});
