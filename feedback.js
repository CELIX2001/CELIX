document.getElementById("feedbackForm").addEventListener("submit", submitFeedback);

function submitFeedback(event) {
    event.preventDefault();

    const message = document.getElementById("feedbackMessage").value;

    const feedback = {
        message: message,
    };

    console.log("Feedback:", feedback);
}
