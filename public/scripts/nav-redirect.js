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

document
  .getElementById("medicine-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/medicine";
  });

document
  .getElementById("dashboard-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/dashboard";
  });

document
  .getElementById("logout-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    fetch("/logout")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/";
        } else {
          window.location.href = "/";
        }
      });
  });
