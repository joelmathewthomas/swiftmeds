document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("my-button") &&
      event.target.textContent === "Add to Cart"
    ) {
      const medicineName =
        event.target.parentElement.querySelector(".type a").textContent;
      console.log(medicineName);
      addToCart(medicineName);
    }
  });
});

function addToCart(medicineName) {
  // Send a POST request to /addtocart endpoint with the medicine name
  fetch("/addtocart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: medicineName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Medicine added to cart successfully");
      } else {
        console.log("Failed to add medicine to cart");
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
