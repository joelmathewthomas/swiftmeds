document.addEventListener("DOMContentLoaded", function () {
  // Make a request to fetch session data from the server
  fetch("/getSessionData")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedin) {
        document.getElementById(
          "login-link"
        ).innerHTML = `<i class="fa-solid fa-user"></i> ${data.username}`;
      } else {
      }
    })
    .catch((error) => console.error("Error fetching session data:", error));
});
