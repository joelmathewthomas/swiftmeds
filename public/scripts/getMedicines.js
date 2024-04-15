document.addEventListener("DOMContentLoaded", function () {
  fetch("/getMedicines")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const medicineContainer = document.getElementById("medicine-container");
        data.medicines.forEach((medicine) => {
          const box = document.createElement("div");
          box.className = "box";

          const slideImg = document.createElement("div");
          slideImg.className = "slide-img";

          const img = document.createElement("img");
          img.src = `/static/${medicine.img}`;
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
          typeSpan.textContext = `${medicine.quantity}`;
          type.appendChild(typeLink);
          type.appendChild(typeSpan);

          const price = document.createElement("a");
          price.className = "price";
          price.href = "#";
          price.textContent = `Rs${medicine.price}`;

          detailBox.appendChild(type);
          detailBox.appendChild(price);

          box.appendChild(slideImg);
          box.appendChild(detailBox);

          medicineContainer.appendChild(box);
        });
      } else {
        console.log("/getMedicine response failed");
      }
    })
    .catch((error) => {
      console.error("Error fetching medicine data:", error);
    });
});
