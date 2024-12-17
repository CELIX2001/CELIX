let loginForm = document.getElementById("loginForm");
if (loginForm) loginForm.addEventListener("submit", handleLogin);

let regForm = document.getElementById("regForm");
if (regForm) regForm.addEventListener("submit", handleRegister);

function handleLogin(event) {
  event.preventDefault();

  const user = getUserCredentials(["username", "pswd"]);

  console.log("User login attempt:", user);
}

function handleRegister(event) {
  event.preventDefault();

  const user = getUserCredentials(["fullName", "username", "pswd"]);

  displayGreeting(user.username);
  console.log("New User Registration:", user);
}

function getUserCredentials(fields) {
  let userData = {};
  fields.forEach((field) => {
    userData[field] = document.getElementById(field).value;
  });
  return userData;
}

function displayGreeting(username) {
  let greetingElement = document.getElementById("greeting");
  if (greetingElement) {
    greetingElement.innerText = `Welcome ${username}!!!!`;
  }
}
