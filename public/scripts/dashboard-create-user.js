document.addEventListener("DOMContentLoaded", function () {
  var createUserButton = document.getElementById(
    "dashboard-create-user-button"
  );
  var createUserPopup = document.getElementById("dashboard-create-user-popup");
  var closePopupButton = document.getElementById(
    "dashboard-close-popup-button"
  );

  createUserButton.addEventListener("click", function () {
    createUserPopup.style.display = "flex";
  });

  closePopupButton.addEventListener("click", function () {
    createUserPopup.style.display = "none";
  });
});

document
  .getElementById("dashboard-create-user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("dashboard-username").value;
    var email = document.getElementById("dashboard-email").value;
    var password = document.getElementById("dashboard-password").value;
    var type = document.getElementById("dashboard-type").value;

    fetch("/dashboardCreateuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        type: type,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
