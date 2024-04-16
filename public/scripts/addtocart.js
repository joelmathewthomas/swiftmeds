document.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("my-button") &&
    event.target.textContent === "Add to Cart"
  ) {
    event.preventDefault();
    const medicineName =
      event.target.parentElement.querySelector(".type a").textContent;
    addToCart(medicineName);

    // Change text content to "Added"
    event.target.textContent = "Added";

    // Revert text content back to "Add to Cart" after 2 seconds
    setTimeout(function () {
      event.target.textContent = "Add to Cart";
    }, 2000);
  }
});

function addToCart(medicineName) {
  // Send a POST request to the server
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
      } else {
        console.error("Failed to add medicine to cart");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
