document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("my-button") &&
      event.target.textContent === "Add to Cart"
    ) {
      const medicineName =
        event.target.parentElement.querySelector(".type a").textContent;
      console.log(medicineName);
    }
  });
});
