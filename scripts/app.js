const products = [
  {
    id: 1,
    name: "Fresh Bread Loaf",
    category: "Bakery",
    price: 70,
    transportCost: 120,
    location: "Nairobi",
    description: "Soft, freshly baked white bread for morning toast or sandwiches.",
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 95,
    transportCost: 120,
    location: "Nairobi",
    description: "Healthy whole wheat bread packed with fiber and nutrients.",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Fresh Milk 500ml",
    category: "Dairy",
    price: 60,
    transportCost: 90,
    location: "Nairobi",
    description: "Pasteurized fresh milk ideal for tea, coffee, or cereal.",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Blue Band Margarine 250g",
    category: "Dairy",
    price: 120,
    transportCost: 80,
    location: "Nairobi",
    description: "Classic Blue Band margarine for spreading and baking.",
    image:
      "https://images.unsplash.com/photo-1589987607627-616cac1b8b19?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Orange Juice 1L",
    category: "Beverages",
    price: 180,
    transportCost: 110,
    location: "Nairobi",
    description: "Refreshing orange juice packed with vitamin C.",
    image:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Breakfast Cakes (6 pcs)",
    category: "Bakery",
    price: 210,
    transportCost: 130,
    location: "Nairobi",
    description: "Assorted mini cakes perfect for morning meetings or school snacks.",
    image:
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Premium Tea Leaves 250g",
    category: "Beverages",
    price: 220,
    transportCost: 70,
    location: "Nairobi",
    description: "Kenyan tea leaves with a rich aroma for the perfect brew.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Ground Coffee 200g",
    category: "Beverages",
    price: 260,
    transportCost: 90,
    location: "Nairobi",
    description: "Smooth roasted coffee, ready for moka pots or drip brew.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Sugar 1kg",
    category: "Pantry",
    price: 150,
    transportCost: 60,
    location: "Nairobi",
    description: "Fine white sugar for tea, coffee, and baking.",
    image:
      "https://images.unsplash.com/photo-1588750903149-91e2b9d87dff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Breakfast Cereal 500g",
    category: "Pantry",
    price: 280,
    transportCost: 90,
    location: "Nairobi",
    description: "Crunchy cereal for a quick, nourishing breakfast.",
    image:
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Eggs (Tray of 30)",
    category: "Protein",
    price: 420,
    transportCost: 140,
    location: "Nairobi",
    description: "Fresh eggs sourced daily for omelets and baking.",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Honey 500g",
    category: "Pantry",
    price: 360,
    transportCost: 80,
    location: "Nairobi",
    description: "Pure honey to sweeten tea or drizzle over toast.",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e7848a0?auto=format&fit=crop&w=800&q=80",
  },
];

const cart = [];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const locationSelect = document.getElementById("locationSelect");
const categorySelect = document.getElementById("categorySelect");
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");
const cartCount = document.getElementById("cartCount");
const checkoutButton = document.getElementById("checkoutButton");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutSummary = document.getElementById("checkoutSummary");
const confirmationModal = document.getElementById("confirmationModal");
const confirmationBody = document.getElementById("confirmationBody");
const closeConfirmation = document.getElementById("closeConfirmation");
const productModal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const shopNow = document.getElementById("shopNow");
const viewPolicies = document.getElementById("viewPolicies");

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);

const renderCategories = () => {
  const categories = Array.from(new Set(products.map((product) => product.category)));
  categorySelect.innerHTML = `
    <option value="">All categories</option>
    ${categories.map((category) => `<option value="${category}">${category}</option>`).join("")}
  `;
};

const getFilteredProducts = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedLocation = locationSelect.value;
  const selectedCategory = categorySelect.value;

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesLocation = selectedLocation ? product.location === selectedLocation : true;
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesLocation && matchesCategory;
  });
};

const renderProducts = () => {
  const filteredProducts = getFilteredProducts();
  const categories = Array.from(new Set(filteredProducts.map((product) => product.category)));

  if (!filteredProducts.length) {
    productsContainer.innerHTML =
      '<p class="notice">No products match your search. Try a different keyword.</p>';
    return;
  }

  productsContainer.innerHTML = categories
    .map((category) => {
      const items = filteredProducts.filter((product) => product.category === category);
      const itemCards = items
        .map(
          (product) => `
        <article class="product-card">
          <div class="product-image" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
          </div>
          <div class="product-meta">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
          </div>
          <div>
            <p class="price">${formatCurrency(product.price)}</p>
            <p class="transport">Transport: ${formatCurrency(product.transportCost)} (paid by customer)</p>
          </div>
          <div class="product-actions">
            <button class="secondary" data-action="details" data-id="${product.id}">Details</button>
            <button class="primary" data-action="add" data-id="${product.id}">Add to cart</button>
          </div>
        </article>
      `
        )
        .join("");

      return `
        <div class="category-block">
          <div class="category-header">
            <h3>${category}</h3>
            <span>${items.length} item(s)</span>
          </div>
          <div class="product-grid">${itemCards}</div>
        </div>
      `;
    })
    .join("");
};

const openModal = (modal) => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModalView = (modal) => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

const addToCart = (productId) => {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
};

const updateQuantity = (productId, delta) => {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    const index = cart.findIndex((entry) => entry.id === productId);
    cart.splice(index, 1);
  }
  renderCart();
};

const getCartTotals = () => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const transportTotal = cart.reduce((sum, item) => sum + item.transportCost, 0);
  const total = subtotal + transportTotal;
  return { subtotal, transportTotal, total };
};

const renderCart = () => {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!cart.length) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartSummary.innerHTML = "";
    checkoutButton.disabled = true;
    return;
  }

  checkoutButton.disabled = false;
  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <div class="cart-item-header">
          <strong>${item.name}</strong>
          <span>${formatCurrency(item.price)}</span>
        </div>
        <div class="cart-item-controls">
          <button data-action="decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button data-action="increase" data-id="${item.id}">+</button>
          <span class="transport">Transport: ${formatCurrency(item.transportCost)}</span>
        </div>
      </div>
    `
    )
    .join("");

  const { subtotal, transportTotal, total } = getCartTotals();
  cartSummary.innerHTML = `
    <div><span>Subtotal</span><strong>${formatCurrency(subtotal)}</strong></div>
    <div><span>Transport (paid by customer)</span><strong>${formatCurrency(transportTotal)}</strong></div>
    <div><span>Total</span><strong>${formatCurrency(total)}</strong></div>
  `;

  checkoutSummary.innerHTML = cartSummary.innerHTML;
};

const showProductDetails = (productId) => {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  modalBody.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <div class="price">${formatCurrency(product.price)}</div>
    <div class="transport">Transport: ${formatCurrency(product.transportCost)} (paid by customer)</div>
    <p><strong>Delivery location:</strong> ${product.location}</p>
    <button class="primary full" data-action="add" data-id="${product.id}">Add to cart</button>
  `;
  openModal(productModal);
};

const confirmOrder = (formData) => {
  const { subtotal, transportTotal, total } = getCartTotals();
  const orderId = `DL-${Date.now().toString().slice(-6)}`;

  confirmationBody.innerHTML = `
    <h2>Order confirmed 🎉</h2>
    <p>Thank you, ${formData.name}. Your order has been received.</p>
    <div class="checkout-summary">
      <div><span>Order ID</span><strong>${orderId}</strong></div>
      <div><span>Delivery location</span><strong>${formData.location}</strong></div>
      <div><span>Address</span><strong>${formData.address}</strong></div>
      <div><span>Subtotal</span><strong>${formatCurrency(subtotal)}</strong></div>
      <div><span>Transport cost</span><strong>${formatCurrency(transportTotal)}</strong></div>
      <div><span>Total</span><strong>${formatCurrency(total)}</strong></div>
    </div>
    <p>We will reach you at ${formData.phone} to confirm payment and delivery timing.</p>
    <p>
      Need help? Call or WhatsApp <strong>0711595171</strong> anytime.
    </p>
  `;
  openModal(confirmationModal);
};

productsContainer.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  const id = Number(event.target.dataset.id);

  if (action === "add") {
    addToCart(id);
  }

  if (action === "details") {
    showProductDetails(id);
  }

  if (event.target.closest(".product-image")) {
    const imageId = Number(event.target.closest(".product-image").dataset.id);
    showProductDetails(imageId);
  }
});

modalBody.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  const id = Number(event.target.dataset.id);
  if (action === "add") {
    addToCart(id);
    closeModalView(productModal);
    openModal(cartDrawer);
  }
});

cartItems.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  const id = Number(event.target.dataset.id);
  if (action === "increase") updateQuantity(id, 1);
  if (action === "decrease") updateQuantity(id, -1);
});

searchInput.addEventListener("input", renderProducts);
locationSelect.addEventListener("change", renderProducts);
categorySelect.addEventListener("change", renderProducts);

cartButton.addEventListener("click", () => openModal(cartDrawer));
closeCart.addEventListener("click", () => closeModalView(cartDrawer));
closeModal.addEventListener("click", () => closeModalView(productModal));
checkoutButton.addEventListener("click", () => openModal(checkoutModal));
closeCheckout.addEventListener("click", () => closeModalView(checkoutModal));
closeConfirmation.addEventListener("click", () => closeModalView(confirmationModal));

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) return;

  const formData = Object.fromEntries(new FormData(checkoutForm));
  confirmOrder(formData);
  checkoutForm.reset();
  cart.splice(0, cart.length);
  renderCart();
  closeModalView(checkoutModal);
});

shopNow.addEventListener("click", () => {
  document.getElementById("filters").scrollIntoView({ behavior: "smooth" });
});

viewPolicies.addEventListener("click", () => {
  document.getElementById("policies").scrollIntoView({ behavior: "smooth" });
});

renderCategories();
renderProducts();
renderCart();
