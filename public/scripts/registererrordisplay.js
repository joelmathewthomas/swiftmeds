document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("register-username").value;
    var email = document.getElementById("register-email").value;
    var password = document.getElementById("register-password").value;

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.getElementById("register-button").textContent = "Success";

          // Delay reverting the text content back to "Login" after 2 seconds
          setTimeout(function () {
            window.location.href = "/";
          }, 2000);
        } else {
          document.getElementById("register-button").textContent = data.message;

          // Delay reverting the text content back to "Login" after 2 seconds
          setTimeout(function () {
            document.getElementById("register-button").textContent = "Register";
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
