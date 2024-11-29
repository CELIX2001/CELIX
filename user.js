document.getElementById("registrationForm").addEventListener("submit", register);

function register(event) {
    event.preventDefault(); 

    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const user = {
        username: username,
        email: email,
        password: password,
    };

    console.log("Registered User:", user);
}
