const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnlogin-popup");
const iconClose = document.querySelector(".icon-close");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

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
    window.location.href = "/home";
  });

document
  .getElementById("dashboard-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/dashboard";
  });
