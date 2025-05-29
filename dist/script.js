let navLinks = document.getElementById("navLinks");
let cartLinks = document.getElementById("cartLinks");
let menuIcon = document.getElementById("menuIcon");
let closeIcon = document.getElementById("closeIcon");
let cart = document.getElementById("cart");

cart.addEventListener("click", () => {
  cartLinks.classList.remove("translate-x-full");
  cartLinks.classList.add("translate-x-0");
  if (menuIcon) menuIcon.classList.add("hidden");
  closeIcon.classList.remove("hidden");
});

closeIcon.addEventListener("click", () => {
  cartLinks.classList.remove("translate-x-0");
  cartLinks.classList.add("translate-x-full");

  if (menuIcon) menuIcon.classList.remove("hidden");
  closeIcon.classList.add("hidden");
});

menuIcon.addEventListener("click", () => {
  navLinks.classList.remove("translate-x-full");
  navLinks.classList.add("translate-x-0");
  menuIcon.classList.add("hidden");
  closeIcon.classList.remove("hidden");
});

closeIcon.addEventListener("click", () => {
  navLinks.classList.add("translate-x-full");
  navLinks.classList.remove("translate-x-0");
  closeIcon.classList.add("hidden");
  menuIcon.classList.remove("hidden");
});

let items = document.getElementById("storage");
let search = document.getElementById("searchbar").value;
let cartcount = document.getElementById("cartCount");
let searchbtn = document.getElementById("searchbtn");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((product) => {
      let card = document.createElement("div");
      card.className =
        "rounded-lg shadow-md shadow-yellow-400 overflow-hidden flex flex-col p-4 ml-8 mr-8";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class=" mb-4 aspect-square" />
        <h3 class="text-md font-semibold mb-1">${product.title}</h3>
        <p class="text-lg text-green-500 font-bold mb-4">$${product.price}</p>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2">
            <button class="decrease bg-gray-300 px-2 py-1 rounded text-lg">−</button>
            <span class="quantity text-md font-medium">1</span>
            <button class="increase bg-gray-300 px-2 py-1 rounded text-lg">+</button>
          </div>
        </div>
        <button class="add-to-cart mt-auto bg-yellow-500 md:hover:bg-yellow-600 text-white py-2 rounded font-semibold">
          Add to Cart
        </button>
      `;
      items.appendChild(card);

      let btn = card.querySelector(".add-to-cart");
      let deleteBtn = card.querySelector(".delete-from-cart");

      btn.addEventListener("click", () => {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.push(product);
        localStorage.setItem("cart", JSON.stringify(cartItems));

        let card = document.createElement("div");
        card.className =
          "flex items-center justify-between gap-2 p-2 border-b border-gray-600";

        card.innerHTML = `
            <img src="${product.image}" class="w-10 h-10 object-cover rounded" />
            <span class="text-sm flex-1 ml-2">${product.title}</span>
            <div class="flex items-center space-x-2">
              <button class="decrease px-2 py-1 rounded text-lg">−</button>
              <span class="quantity text-md font-medium">1</span>
              <button class="increase px-2 py-1 rounded text-lg">+</button>
            </div>
            <span class="text-green-500 font-bold text-sm">$${product.price}</span>
            <svg class="delete-from-cart h-6 w-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          `;
        cartLinks.appendChild(card);

        let deleteBtn = card.querySelector(".delete-from-cart");

        deleteBtn.addEventListener("click", () => {
          card.remove();
        });
      });

      let cartCount = 0;


      let cartCountElement = document.getElementById("cartCount");
      function addToCart() {
        cartCount++;
        cartCountElement.textContent = cartCount;
      }
      document.querySelectorAll(".add-to-cart").forEach((btn) => {
        btn.addEventListener("click", addToCart);
      });
    });
  });
