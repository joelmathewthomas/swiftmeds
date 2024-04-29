let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  shoppingCart.classList.remove("active");
  uploadForm.classList.remove("active");
};

let shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#cart-btn").onclick = () => {
  shoppingCart.classList.toggle("active");
  searchForm.classList.remove("active");
  uploadForm.classList.remove("active");
};

let uploadForm = document.querySelector(".upload-form");
const defaultBtn = document.querySelector(".default-btn");
const customBtn = document.querySelector(".custom-btn");
const fileName = document.querySelector(".file-name");

let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_]+$/;

function active() {
  defaultBtn.click();
}
defaultBtn.addEventListener("change", function () {
  if (this.value) {
    let nameValue = this.value.match(regExp);
    fileName.textContent = nameValue;
  }
});

window.onscroll = () => {
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  uploadForm.classList.remove("active");
};
