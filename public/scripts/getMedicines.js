document.addEventListener("DOMContentLoaded", function () {
  fetch("/getMedicines")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const medicineContainer = document.getElementById("medicine-container");
        data.medicines.forEach((medicine) => {
          if (medicine.quantity > 0) {
            const box = document.createElement("div");
            box.className = "box";

            const slideImg = document.createElement("div");
            slideImg.className = "slide-img";

            const img = document.createElement("img");
            img.src = `/static/medicines/${medicine.img}`;
            const imageurl = "";
            slideImg.appendChild(img);

            const detailBox = document.createElement("div");
            detailBox.className = "detail-box";

            const type = document.createElement("div");
            type.className = "type";
            const typeLink = document.createElement("a");
            typeLink.href = "#";
            typeLink.textContent = medicine.name;
            const typeSpan = document.createElement("span");
            typeSpan.innerHTML = `Available ${medicine.quantity} nos`;
            type.appendChild(typeLink);
            type.appendChild(typeSpan);

            const price = document.createElement("a");
            price.className = "price";
            price.href = "#";
            price.textContent = `Rs${medicine.price}`;

            const overlay = document.createElement("div");
            overlay.className = "overlay";

            const paragraph = document.createElement("p");
            paragraph.textContent = `${medicine.desc}`;

            overlay.appendChild(paragraph);

            detailBox.appendChild(type);
            detailBox.appendChild(price);
            slideImg.appendChild(overlay);

            box.appendChild(slideImg);
            box.appendChild(detailBox);

            ordernowbtn = document.createElement("a");
            addtocartbtn = document.createElement("a");
            ordernowbtn.className = "my-button";
            addtocartbtn.className = "my-button";
            ordernowbtn.href = "#";
            ordernowbtn.title = "Order Now";
            ordernowbtn.textContent = "Order Now";
            addtocartbtn.title = "Add to Cart";
            addtocartbtn.textContent = "Add to Cart";
            addtocartbtn.href = "#";

            box.appendChild(ordernowbtn);
            box.appendChild(addtocartbtn);

            medicineContainer.appendChild(box);
          }
        });
      } else {
        console.log("/getMedicine response failed");
      }
    })
    .catch((error) => {
      console.error("Error fetching medicine data:", error);
    });
});
