// Login Page
const login = () => {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (username === "" && password === "") {
    const navigator = document.querySelector("#navigator");
    navigator.resetToPage("home.html");
  } else {
    ons.notification.alert("Wrong username/password combination");
  }
};
