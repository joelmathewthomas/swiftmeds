document.addEventListener("DOMContentLoaded", function () {
  var createUserButton = document.getElementById(
    "dashboard-create-user-button"
  );
  var createUserPopup = document.getElementById("dashboard-create-user-popup");
  var closePopupButton = document.getElementById(
    "dashboard-close-popup-button"
  );

  createUserButton.addEventListener("click", function () {
    createUserPopup.style.display = "block";
  });

  closePopupButton.addEventListener("click", function () {
    createUserPopup.style.display = "none";
  });
});
