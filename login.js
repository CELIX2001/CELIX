document.getElementById("loginForm").addEventListener("submit", login);

function login(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const loginUser = {
        email: email,
        password: password,
    };

    console.log("Login User:", loginUser);
}
