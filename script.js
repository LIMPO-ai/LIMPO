// ------------------ Supabase ------------------
const supabaseUrl = "sb_publishable_Kwtr59qmzPDmPes_0yKfEA_aPmYE9Zd";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGZudHplZ21paHZjcmZsdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjA4NDcsImV4cCI6MjA4MjM5Njg0N30.GfvKkgLxgFfwDe0XbbE1lzWNQXEHipHDwiHn7i9wZnc";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ------------------ Products ------------------
const products = {
  1: { name: "The First Bite", description: "Handmade lip gloss", price: 30, images: ["images/The First Bite 2.png","images/The First Bite 3.png"] },
  2: { name: "Bee's Bless", description: "Cherry-scented lip gloss", price: 30, images: ["images/lipgloss2-1.jpg","images/lipgloss2-2.jpg"] }
};

const productsContainer = document.getElementById("products-container");
for (let id in products) {
  const p = products[id];
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${p.images[0]}" class="product-thumbnail"><h3>${p.name}</h3>`;
  card.onclick = () => openProductDetail(id);
  productsContainer.appendChild(card);
}

// ------------------ Product Detail ------------------
function openProductDetail(id) {
  const product = products[id];
  document.getElementById("product-detail").style.display = "flex";
  document.getElementById("detail-name").textContent = product.name;
  document.getElementById("detail-description").textContent = product.description;
  document.getElementById("detail-price").textContent = "AED " + product.price;
  document.getElementById("detail-main-photo").src = product.images[0];

  const thumbs = document.getElementById("detail-thumbnails");
  thumbs.innerHTML = "";
  product.images.forEach(img => {
    const t = document.createElement("img");
    t.src = img;
    t.onclick = () => document.getElementById("detail-main-photo").src = img;
    thumbs.appendChild(t);
  });

  document.getElementById("add-to-cart").onclick = () => {
    const qty = parseInt(document.getElementById("qty").value);
    addToCart(id, qty);
  };
}
document.getElementById("close-detail").onclick = () => {
  document.getElementById("product-detail").style.display = "none";
};

// ------------------ Panels ------------------
function openMenu() { document.getElementById("side-menu").style.transform = "translateX(0)"; }
function closeMenu() { document.getElementById("side-menu").style.transform = "translateX(-100%)"; }
function openCart() { showCart(); document.getElementById("cart-panel").style.transform = "translateX(0)"; }
function closeCart() { document.getElementById("cart-panel").style.transform = "translateX(100%)"; }
function openSaves() { showSaves(); document.getElementById("saves-panel").style.transform = "translateX(0)"; }
function closeSaves() { document.getElementById("saves-panel").style.transform = "translateX(100%)"; }
function openProfile() { showProfile(); document.getElementById("profile-panel").style.transform = "translateX(0)"; }
function closeProfile() { document.getElementById("profile-panel").style.transform = "translateX(100%)"; }
function scrollToSection(id) { document.getElementById(id).scrollIntoView({behavior:"smooth"}); }

// ------------------ Auth ------------------
async function submitSignup() {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const phone = document.getElementById("signup-phone").value;
  const password = document.getElementById("signup-password").value;
  if (!name || !email || !password) return alert("Fill required fields!");
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return alert(error.message);
  await supabase.from("users").insert([{ id: data.user.id, name, email, phone }]);
  alert("Signed up successfully!");
  closeSignupForm();
}
async function submitLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return alert(error.message);
  alert("Logged in successfully!");
  closeLoginForm();
}

// ------------------ Profile ------------------
async function showProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  const profileDiv = document.getElementById("profile-content");
  if (!user) {
    profileDiv.innerHTML = `<button onclick="openSignupForm()">Sign Up</button>
                            <button onclick="openLoginForm()">Log In</button>`;
  } else {
    const { data } = await supabase.from("users").select("*").eq("id", user.id).single();
    profileDiv.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <hr>
      <button onclick="openOrders()">My Orders</button>
      <button onclick="showSaves()">Saved Items</button>
      <button onclick="logout()">Logout</button>
    `;
  }
}

// ------------------ Cart & Saved Items ------------------
let cart = [];
async function addToCart(id, qty) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return alert("Please login first!");
  await supabase.from("cart_items").insert([{ user_id: user.id, product_id: id, quantity: qty }]);
  alert("Added to cart!");
}
async function showCart() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: items } = await supabase.from("cart_items").select("*").eq("user_id", user.id);
  const div = document.getElementById("cart-items");
  div.innerHTML = "";
  let total = 0;
  items.forEach(item => {
    const p = products[item.product_id];
    total += p.price * item.quantity;
    div.innerHTML += `<p>${p.name} x ${item.quantity} = AED ${p.price * item.quantity}</p>`;
  });
  document.getElementById("cart-total").textContent = total;
}
async function showSaves() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: items } = await supabase.from("saved_items").select("*").eq("user_id", user.id);
  const div = document.getElementById("saves-items");
  div.innerHTML = "";
  items.forEach(item => { const p = products[item.product_id]; div.innerHTML += `<p>${p.name}</p>`; });
}

// ------------------ Forms ------------------
function openSignupForm() { document.getElementById("signup-form").style.display = "block"; }
function closeSignupForm() { document.getElementById("signup-form").style.display = "none"; }
function openLoginForm() { document.getElementById("login-form").style.display = "block"; }
function closeLoginForm() { document.getElementById("login-form").style.display = "none"; }

// ------------------ Other ------------------
function openOrders() { alert("My Orders coming soon!"); }
function logout() { alert("Logged out (demo)"); }
