  let navLinks = document.getElementById("navLinks");
  let menuIcon = document.getElementById("menuIcon");
  let closeIcon = document.getElementById("closeIcon");

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
  let search = document.getElementById("searchbar")
  let cartCountDisplay = document.getElementById("cartCount");
  let allProducts = [];

  fetch("https://fakestoreapi.com/products").then((res) => res.json()).then((data) => {
    console.log(data)
    data.forEach((product) => {
      let card = document.createElement("div");
      card.className =
        "bg-slate-500 rounded-lg shadow-md overflow-hidden flex flex-col p-4 ml-8 mr-8";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="h-48 mb-4" />
        <h3 class="text-md font-semibold mb-1">${product.title}</h3>
        <p class="text-sm text-white mb-2">${product.description}...</p>
        <p class="text-lg text-green-500 font-bold mb-4">$${product.price}</p>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2">
            <button class="decrease bg-gray-300 px-2 py-1 rounded text-lg">−</button>
            <span class="quantity text-md font-medium">1</span>
            <button class="increase bg-gray-300 px-2 py-1 rounded text-lg">+</button>
          </div>
        </div>
        <button class="add-to-cart mt-auto bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-semibold">
          Add to Cart
        </button>
      `;
      items.appendChild(card);
    });
  });

let addToCartBtn = card.querySelector(".add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    cartCount++;
    cartCountDisplay.forEach(el => el.textContent = cartCount);
  });