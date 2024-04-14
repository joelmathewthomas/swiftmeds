document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contact-link")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "/contact";
    });

  document
    .getElementById("aboutus-link")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "/aboutus";
    });

  document
    .getElementById("home-link")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "/";
    });

  document
    .getElementById("login-link")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "/login";
    });
});
