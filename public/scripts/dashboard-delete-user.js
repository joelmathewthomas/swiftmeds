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
