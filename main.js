var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  }
});

const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');

cartIcon.addEventListener('click', () => cartTab.classList.add('cart-tab-active'));
closeBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));

// ✅ JSON data embedded directly — no fetch needed (works when opening HTML file directly)
const productList = [
  { id: 1, name: "Double Beef Burger", price: 200, image: "burger.png" },
  { id: 2, name: "Chicken Roll", price: 300, image: "chicken-roll.png" },
  { id: 3, name: "Fried Chicken", price: 300, image: "fried-chicken.png" },
  { id: 4, name: "Lasagna", price: 300, image: "lasagna.png" },
  { id: 5, name: "Pizza", price: 100, image: "pizza.png" },
  { id: 6, name: "Sandwich", price: 300, image: "sandwich.png" },
  { id: 7, name: "Spaghetti", price: 300, image: "spaghetti.png" },
  { id: 8, name: "Spring Roll", price: 300, image: "spring-roll.png" }
];

// Cart state
let cart = [];

const updateCart = () => {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.classList.add('item');
    cartItem.innerHTML = `
      <div class="item-image">
        <img src="${item.image}">
      </div>
      <div>
        <h4>${item.name}</h4>
        <h4 class="item-total">$${item.price * item.quantity}</h4>
      </div>
      <div class="flex">
        <a href="#" class="quantity-btn minus-btn" data-id="${item.id}">
          <i class="fa-solid fa-minus"></i>
        </a>
        <h4 class="quantity-value">${item.quantity}</h4>
        <a href="#" class="quantity-btn plus-btn" data-id="${item.id}">
          <i class="fa-solid fa-plus"></i>
        </a>
      </div>
    `;
    cartList.appendChild(cartItem);
  });

  cartTotal.textContent = `$${total}.00`;
  cartValue.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Plus / Minus buttons
  document.querySelectorAll('.plus-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      const item = cart.find(p => p.id === id);
      if (item) item.quantity++;
      updateCart();
    });
  });

  document.querySelectorAll('.minus-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      const index = cart.findIndex(p => p.id === id);
      if (index !== -1) {
        cart[index].quantity--;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
      }
      updateCart();
    });
  });
};

const showCards = () => {
  cardList.innerHTML = '';
  productList.forEach(product => {
    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');
    orderCard.innerHTML = `
      <div class="card-image">
        <img src="${product.image}">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">$${product.price}</h4>
      <a href="#" class="btn add-to-cart" data-id="${product.id}">Add to cart</a>
    `;
    cardList.appendChild(orderCard);
  });

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.id);
      const product = productList.find(p => p.id === id);
      const existing = cart.find(p => p.id === id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCart();
      cartTab.classList.add('cart-tab-active');
    });
  });
};

showCards();
