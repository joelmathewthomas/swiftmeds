document.addEventListener("DOMContentLoaded", function () {
  var deleteUserButton = document.getElementById(
    "dashboard-delete-user-button"
  );
  var deleteUserPopup = document.getElementById("dashboard-delete-user-popup");
  var cancelDeleteButton = document.getElementById(
    "dashboard-delete-close-popup-button"
  );

  deleteUserButton.addEventListener("click", function () {
    deleteUserPopup.style.display = "flex";
  });
  cancelDeleteButton.addEventListener("click", function () {
    deleteUserPopup.style.display = "none";
  });
});

document
  .getElementById("dashboard-delete-user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("dashboard-delete-username");

    fetch("/dashboardDeleteuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/dashboard";
        } else {
          document.getElementById("dashboard-popup-delete").textContent =
            data.message;
          setTimeout(function () {
            document.getElementById("dashboard-popup-delete").textContent =
              "Delete";
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
