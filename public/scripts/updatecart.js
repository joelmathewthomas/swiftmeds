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
            price.textContent = `Rs${item.price}`;

            content.appendChild(name);
            content.appendChild(price);
            box.appendChild(img);
            box.appendChild(content);
            shoppingCart.appendChild(box);
          });
        } else {
          console.error("Failed to update cart: ", data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  });
});
