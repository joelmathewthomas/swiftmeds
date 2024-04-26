document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cart-btn").addEventListener("click", function () {
    fetch("/updatecart")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const shoppingCart = document.getElementById("shopping-cart");
          const cart = document.querySelector(".shopping-cart");
          cart.innerHTML = "";

          data.cart.forEach((item) => {
            if (item.name !== "Empty") {
              console.log(`Price of ${item.name} is ${item.price}`);
              const box = document.createElement("div");
              box.className = "box";

              const img = document.createElement("img");
              img.src = `/static/medicines/${item.img}`;

              const content = document.createElement("div");
              content.className = "content";

              const name = document.createElement("h3");
              name.textContent = item.name;

              const quantityLabel = document.createElement("span");
              quantityLabel.textContent = " 10 "; // Placeholder for quantity, replace with actual quantity

              const decreaseButton = document.createElement("button");
              decreaseButton.className = "decrease";
              decreaseButton.textContent = "-";
              decreaseButton.addEventListener("click", () =>
                decreaseQuantity(item.name)
              );

              const increaseButton = document.createElement("button");
              increaseButton.className = "increase";
              increaseButton.textContent = "+";
              increaseButton.addEventListener("click", () =>
                increaseQuantity(item.name)
              );

              const removeLink = document.createElement("a");
              removeLink.textContent = "Remove";
              removeLink.className = "remove-link";
              removeLink.href = "#";

              content.appendChild(name);

              content.appendChild(decreaseButton);
              content.appendChild(quantityLabel);
              content.appendChild(increaseButton);

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
              content.className = "content";

              const name = document.createElement("h3");
              name.textContent = item.name;

              content.appendChild(name);
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

  function decreaseQuantity(itemName) {
    let stock = "";
    cartquantity.forEach((item) => {
      if (item.medicine === itemName) {
        stock = item.quantity;
      }
    });

    console.log("i am asking for sessiondata for increasing quantity");
    fetch("/getSessionData")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          data.cart.forEach((cartItem) => {
            if (cartItem.medicine === itemName) {
              if (cartItem.quantity - 1 >= 0) {
                fetch("/manipulateQuantity", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    medicine: itemName,
                    mode: "decrease",
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (!data.success) {
                      console.log("Failed to decrease quantity for ", itemName);
                    }
                  });
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }

  function increaseQuantity(itemName) {
    let stock = "";
    cartquantity.forEach((item) => {
      if (item.medicine === itemName) {
        stock = item.quantity;
      }
    });

    console.log("i am asking for sessiondata for increasing quantity");
    fetch("/getSessionData")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          data.cart.forEach((cartItem) => {
            if (cartItem.medicine === itemName) {
              if (cartItem.quantity + 1 <= stock) {
                fetch("/manipulateQuantity", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    medicine: itemName,
                    mode: "increase",
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (!data.success) {
                      console.log("Failed to increase quantity for ", itemName);
                    }
                  });
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }

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
