document.addEventListener("DOMContentLoaded", function () {
  // Make a request to fetch session data from the server
  fetch("/getSessionData")
    .then((response) => response.json())
    .then((data) => {
      if (data.loggedin) {
        console.log("User is logged in as:", data.username);
        document.getElementById("btn-login-username").textContent =
          data.username;
        console.log("User type:", data.type);
      } else {
        console.log("User is not logged in");
      }
    })
    .catch((error) => console.error("Error fetching session data:", error));
});
