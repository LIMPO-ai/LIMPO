// ------------------ Supabase ------------------
const supabaseUrl = "sb_publishable_Kwtr59qmzPDmPes_0yKfEA_aPmYE9Zd";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGZudHplZ21paHZjcmZsdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjA4NDcsImV4cCI6MjA4MjM5Njg0N30.GfvKkgLxgFfwDe0XbbE1lzWNQXEHipHDwiHn7i9wZnc";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ---------------------- Products ----------------------
// You can keep hardcoded products for now OR fetch from Supabase later
const products = {
  1: { 
    name: "The First Bite", 
    description: "Handmade lip gloss.", 
    price: 30, 
    images: ["images/The First Bite 1.jpg","images/The First Bite 2.jpg"] 
  },
  2: { 
    name: "Bee's Bless", 
    description: "Handmade cherry-scented lip gloss.", 
    price: 30, 
    images: ["images/Bee's Bless 1.jpg","images/Bee's Bless 2.jpg"] 
  }
};

// ---------------------- Render Products ----------------------
function renderProducts(filter = "") {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  Object.entries(products).forEach(([id, product]) => {
    if (!product.name.toLowerCase().includes(filter.toLowerCase())) return;

    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => openProductDetail(id);

    const img = document.createElement("img");
    img.src = product.images[0];
    img.className = "product-thumbnail";

    const h3 = document.createElement("h3");
    h3.textContent = product.name;

    card.appendChild(img);
    card.appendChild(h3);
    container.appendChild(card);
  });
}

// ---------------------- Product Detail ----------------------
function openProductDetail(id) {
  const product = products[id];
  if (!product) return;

  document.getElementById("product-detail").style.display = "flex";
  document.getElementById("detail-name").textContent = product.name;
  document.getElementById("detail-description").textContent = product.description;
  document.getElementById("detail-price").textContent = "AED " + product.price;
  document.getElementById("detail-main-photo").src = product.images[0];

  const thumbnailsDiv = document.getElementById("detail-thumbnails");
  thumbnailsDiv.innerHTML = "";
  product.images.forEach(imgUrl => {
    const thumb = document.createElement("img");
    thumb.src = imgUrl;
    thumb.onclick = () => document.getElementById("detail-main-photo").src = imgUrl;
    thumbnailsDiv.appendChild(thumb);
  });

  document.getElementById("add-to-cart").onclick = () => {
    const qty = parseInt(document.getElementById("qty").value);
    addToCart(id, qty);
  };
}

document.getElementById("close-detail").onclick = () => 
  document.getElementById("product-detail").style.display = "none";

// ---------------------- Panels ----------------------
function openMenu() { document.getElementById("side-menu").style.transform = "translateX(0)"; }
function closeMenu() { document.getElementById("side-menu").style.transform = "translateX(-100%)"; }

function openCart() { closeSaves(); closeProfile(); document.getElementById("cart-panel").style.transform = "translateX(0)"; showCart(); }
function closeCart() { document.getElementById("cart-panel").style.transform = "translateX(100%)"; }

function openSaves() { closeCart(); closeProfile(); document.getElementById("saves-panel").style.transform = "translateX(0)"; showSaves(); }
function closeSaves() { document.getElementById("saves-panel").style.transform = "translateX(100%)"; }

function openProfile() { closeCart(); closeSaves(); document.getElementById("profile-panel").style.transform = "translateX(0)"; showProfile(); }
function closeProfile() { document.getElementById("profile-panel").style.transform = "translateX(100%)"; }

// ---------------------- Auth ----------------------
function openSignupForm() { document.getElementById("signup-form").style.display = "block"; }
function closeSignupForm() { document.getElementById("signup-form").style.display = "none"; }

function openLoginForm() { document.getElementById("login-form").style.display = "block"; }
function closeLoginForm() { document.getElementById("login-form").style.display = "none"; }

async function submitSignup() {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  if (!name || !email || !password) { alert("Fill all fields!"); return; }

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) { alert(error.message); return; }

  await supabase.from("users").insert([{ id: data.user.id, email, name }]);
  alert("Signed up successfully!");
  closeSignupForm();
}

async function submitLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) { alert(error.message); return; }

  alert("Logged in successfully!");
  closeLoginForm();
}

// ---------------------- Profile ----------------------
async function showProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  const profileDiv = document.getElementById("profile-content");

  if (!user) {
    profileDiv.innerHTML = `<button onclick="openSignupForm()">Sign Up</button>
                            <button onclick="openLoginForm()">Log In</button>`;
    return;
  }

  const { data } = await supabase.from("users").select("*").eq("id", user.id).single();
  profileDiv.innerHTML = `<p><strong>Name:</strong> ${data.name}</p>
                          <p><strong>Email:</strong> ${data.email}</p>`;
}

// ---------------------- Cart & Saves ----------------------
async function addToCart(productId, quantity) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { alert("Log in first"); return; }

  await supabase.from("cart_items").insert([{ user_id: user.id, product_id: productId, quantity }]);
  alert("Added to cart!");
}

async function showCart() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: cartItems } = await supabase.from("cart_items").select("*").eq("user_id", user.id);
  const cartDiv = document.getElementById("cart-items");
  cartDiv.innerHTML = "";

  let total = 0;
  cartItems.forEach(item => {
    const product = products[item.product_id];
    total += product.price * item.quantity;
    cartDiv.innerHTML += `<p>${product.name} x ${item.quantity} = AED ${product.price * item.quantity}</p>`;
  });

  document.getElementById("cart-total").textContent = total;
}

async function showSaves() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: savedItems } = await supabase.from("saved_items").select("*").eq("user_id", user.id);
  const savesDiv = document.getElementById("saves-items");
  savesDiv.innerHTML = "";

  savedItems.forEach(item => {
    const product = products[item.product_id];
    savesDiv.innerHTML += `<p>${product.name}</p>`;
  });
}

// ---------------------- Search ----------------------
document.getElementById("searchInput").addEventListener("input", function() {
  renderProducts(this.value);
});

// ---------------------- Initialize ----------------------
window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  showProfile();
});
