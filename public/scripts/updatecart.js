document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cart-btn").addEventListener("click", function () {
    fetch("updatecart")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const shoppingCart = document.getElementById("shopping-cart");
          const cart = document.querySelector(".shopping-cart");
          cart.innerHTML = " ";

          data.cart.forEach((item) => {
            if (item.name !== "Empty") {
              const box = document.createElement("div");
              box.className = "box";

              const img = document.createElement("img");
              img.src = `/static/medicines/${item.img}`;

              const content = document.createElement("div");
              content.className = "content";

              const name = document.createElement("h3");
              name.textContent = item.name;

              const price = document.createElement("span");
              price.className = "price";
              price.textContent = `Rs${item.price}`;

              const removeLink = document.createElement("a");
              removeLink.textContent = "Remove";
              removeLink.className = "remove-link";
              removeLink.href = "#";

              content.appendChild(name);
              content.appendChild(price);
              content.appendChild(removeLink);
              box.appendChild(img);
              box.appendChild(content);
              shoppingCart.appendChild(box);
            } else {
              const box = document.createElement("div");
              box.className = "box";

              const img = document.createElement("img");
              img.src = `/static/medicines/${item.img}`;

              const content = document.createElement("div");
              content.className = document.createElement("span");

              const name = document.createElement("h3");
              name.textContent = item.name;

              const price = document.createElement("span");
              price.className = "price";
              price.textContent = ``;

              content.appendChild(name);
              content.appendChild(price);
              box.appendChild(img);
              box.appendChild(content);
              shoppingCart.appendChild(box);
            }
          });
        } else {
          console.error("Failed to update cart: ", data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-link")) {
      event.preventDefault();
      const itemName = event.target.parentElement
        .querySelector("h3")
        .textContent.trim();

      removeFromCart(itemName);

      // Remove the box from the UI
      event.target.closest(".box").remove();
    }
  });

  function removeFromCart(itemName) {
    // Send a POST request to the server to remove the item from the cart
    fetch("/deletefromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Handle success if needed
        } else {
          console.error("Failed to remove item from cart");
        }
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  }
});
