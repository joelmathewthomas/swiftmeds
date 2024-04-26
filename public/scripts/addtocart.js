document.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("my-button") &&
    event.target.textContent === "Add to Cart"
  ) {
    event.preventDefault();
    const medicineName =
      event.target.parentElement.querySelector(".type a").textContent;
    const priceText =
      event.target.parentElement.querySelector(".price").textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, ""));

    // Call addToCart and handle the Promise
    addToCart(medicineName, price)
      .then((isExist) => {
        if (!isExist) {
          // Change text content to "Added"
          event.target.textContent = "Added";
        } else {
          event.target.textContent = "Exists";
        }

        // Revert text content back to "Add to Cart" after 2 seconds
        setTimeout(function () {
          event.target.textContent = "Add to Cart";
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

function addToCart(medicineName, price) {
  // Send a POST request to the server
  return fetch("/addtocart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: medicineName, price: price }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        return false;
      } else if (!data.success) {
        console.error("Failed to add medicine to cart");
        return true;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
