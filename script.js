document.addEventListener("DOMContentLoaded", () => {

  // ===== PANEL FUNCTIONS =====
  function openMenu(){ document.getElementById("side-menu").style.transform="translateX(0)"; }
  function closeMenu(){ document.getElementById("side-menu").style.transform="translateX(-100%)"; }

  function openCart(){ closeSaves(); closeProfile(); document.getElementById("cart-panel").style.transform="translateX(0)"; }
  function closeCart(){ document.getElementById("cart-panel").style.transform="translateX(100%)"; }

  function openSaves(){ closeCart(); closeProfile(); document.getElementById("saves-panel").style.transform="translateX(0)"; }
  function closeSaves(){ document.getElementById("saves-panel").style.transform="translateX(100%)"; }

  function openProfile(){ closeCart(); closeSaves(); document.getElementById("profile-panel").style.transform="translateX(0)"; }
  function closeProfile(){ document.getElementById("profile-panel").style.transform="translateX(100%)"; }

  window.openMenu = openMenu;
  window.closeMenu = closeMenu;
  window.openCart = openCart;
  window.closeCart = closeCart;
  window.openSaves = openSaves;
  window.closeSaves = closeSaves;
  window.openProfile = openProfile;
  window.closeProfile = closeProfile;

  // ===== PRODUCTS =====
const products = {
  1: { 
    name: "The First Bite", 
    description: "🍒✨ Introducing LIMPO’s First Lip Gloss called The First Bite ✨🍒 Our debut gloss is here — a luscious cherry-red shade with a sweet cherry flavor you’ll fall in love with.    💄 Handmade with care      🐰 100% cruelty-free    🍒 Cherry-flavored for a juicy finish", 
    price: 29.99, 
    images: [
      "images/The First Bite 1.jpg",
      "images/The First Bite 2.png",
      "images/The First Bite 3.png"
    ] 
  },

  2: { 
    name: "Bee's Bless", 
    description: "✨ Introducing our latest lip gloss creation ✨  Meet Bee's Bless — where elegance meets shine. 💎💋   This luxurious gloss sits beautifully in its sleek container, with a soft applicator brush designed for perfect precision. Surrounded by nature’s own golden honeycomb, it’s a treat for both your lips and your style. 🍯✨   💧 Smooth.     🌿 Nourishing.   💎 Irresistibly glossy.", 
    price: 29.99, 
    images: [
      "images/Bee's Bless 1.jpg",
      "images/Bee's Bless 2.jpg",
    ] 
  },

  3: { 
    name: "Pearl Coconut", 
    description: "✨ Pearl Coconut Lip Gloss ✨  🥥 Infused with real coconut essence for a tropical vibe   💧 Packed with hydrating oils to keep your lips soft & smooth   🌟 Pearlescent shine that glows without the sticky feel   Irresistible lips, naturally. 💋", 
    price: 29.99, 
    images: [
      "images/Pearl Coconut 1.jfif",
      "images/Pearl Coconut 2.png",
    ] 
  },

  4: { 
    name: "Toffee Apple", 
    description: "Meet Toffee Apple — our sweetest indulgence yet.   A rich, glossy finish with a hint of warmth that melts into your lips.   Hydrating. Lightweight. Deliciously irresistible. 🍎✨", 
    price: 29.99, 
    images: [
      "images/Toffee Apple 1.jfif",
      "images/Toffee Apple 2.jpg",
    ] 
  },

  5: { 
    name: "Grape Glam", 
    description: "Meet Grape Glam 🍇✨   A dark-pink, grape-flavored gloss enriched with Vitamin E and coconut oil for soft, nourished, ultra-glossy lips.   Non-sticky • hydrating • long-lasting    Let your lips shine with Grape Glam 💗", 
    price: 29.99, 
    images: [
      "images/Grape Glam 1.jfif",
    ] 
  }
};


  window.openProductDetail = function(id){
    const p = products[id];
    if(!p) return;

    const detail = document.getElementById("product-detail");
    detail.style.display = "flex";

    document.getElementById("detail-name").textContent = p.name;
    document.getElementById("detail-description").textContent = p.description;
    document.getElementById("detail-price").textContent = "AED " + p.price;

    const mainPhoto = document.getElementById("detail-main-photo");
    mainPhoto.src = p.images[0];
    mainPhoto.classList.remove("zoomed");

    const thumbs = document.getElementById("detail-thumbnails");
    thumbs.innerHTML = "";

    p.images.forEach(img => {
      const t = document.createElement("img");
      t.src = img;
      t.onclick = () => {
        mainPhoto.src = img;
        mainPhoto.classList.remove("zoomed");
      };
      thumbs.appendChild(t);
    });

    // ===== ZOOM EFFECT =====
mainPhoto.onclick = () => {
  mainPhoto.classList.toggle("zoomed");
};
};

  const closeBtn = document.getElementById("close-detail");
  if(closeBtn){
    closeBtn.onclick = () => document.getElementById("product-detail").style.display = "none";
  }

  // ===== AUTH BUTTONS =====
  const loginBtn = document.querySelector(".profile-btn.login");
  const registerBtn = document.querySelector(".profile-btn.register");

  if(loginBtn) loginBtn.onclick = () => window.location.href = "login.html";
  if(registerBtn) registerBtn.onclick = () => window.location.href = "register.html";


  async function loadProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error) return console.log(error);

  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.images[0]}" onclick="openProductDetail(${p.id})">
      <p>${p.description}</p>
      <p>AED ${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

loadProducts();

async function loadProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) return console.log(error);

  const container = document.getElementById("products-list");
  container.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${p.images[0]}" onclick="openProductDetail(${p.id})">
      <h3>${p.name}</h3>
      <p>AED ${p.price}</p>
    `;
    container.appendChild(card);
  });
}
loadProducts();

});
