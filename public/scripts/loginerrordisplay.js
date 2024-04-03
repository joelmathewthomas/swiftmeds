document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get username and password from the form
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    // Send a POST request to the server
    fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/home"; // Redirect to /home on successful login
        } else {
          // Display error message
          // Change the text content of the button element
          document.getElementById("login-button").textContent = data.message;

          // Delay reverting the text content back to "Login" after 2 seconds
          setTimeout(function () {
            document.getElementById("login-button").textContent = "Login";
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
