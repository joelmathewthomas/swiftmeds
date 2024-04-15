document.addEventListener("DOMContentLoaded", function () {
  // Make a request to fetch session data from the server
  fetch("/getSessionData")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedin) {
        document.getElementById("login-link").textContent = data.username;
      } else {
      }
    })
    .catch((error) => console.error("Error fetching session data:", error));
});
