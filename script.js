// ------------------ Supabase ------------------
const supabaseUrl = "sb_publishable_Kwtr59qmzPDmPes_0yKfEA_aPmYE9Zd";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGZudHplZ21paHZjcmZsdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjA4NDcsImV4cCI6MjA4MjM5Njg0N30.GfvKkgLxgFfwDe0XbbE1lzWNQXEHipHDwiHn7i9wZnc";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ------------------ Products ------------------
const products = {
  1: { name: "The First Bite", price: 30, images:["images/The First Bite 1.jpg"] },
  2: { name: "Bee's Bless", price: 30, images:["images/Bee's Bless 1.jpg"] }
};

function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = "";
  for (let id in products) {
    const prod = products[id];
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<img src="${prod.images[0]}"><h3>${prod.name}</h3>`;
    div.onclick = () => alert(`${prod.name} clicked!`);
    container.appendChild(div);
  }
}
renderProducts();

// ------------------ Panels ------------------
function openMenu() { document.getElementById("side-menu").style.transform = "translateX(0)"; }
function closeMenu() { document.getElementById("side-menu").style.transform = "translateX(-100%)"; }
function openCart() { document.getElementById("cart-panel").style.transform = "translateX(0)"; }
function closeCart() { document.getElementById("cart-panel").style.transform = "translateX(100%)"; }
function openSaves() { document.getElementById("saves-panel").style.transform = "translateX(0)"; }
function closeSaves() { document.getElementById("saves-panel").style.transform = "translateX(100%)"; }
function openProfile() { document.getElementById("profile-panel").style.transform = "translateX(0)"; }
function closeProfile() { document.getElementById("profile-panel").style.transform = "translateX(100%)"; }

// ------------------ Forms ------------------
function openSignupForm() { document.getElementById('signup-form').style.display='block'; }
function closeSignupForm() { document.getElementById('signup-form').style.display='none'; }
function openLoginForm() { document.getElementById('login-form').style.display='block'; }
function closeLoginForm() { document.getElementById('login-form').style.display='none'; }

// ------------------ Auth ------------------
async function submitSignup() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;
  if (!name || !email || !password) return alert("Fill all fields!");
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return alert(error.message);
  await supabase.from('users').insert([{id: data.user.id, email, name, phone}]);
  alert("Signed up!");
  closeSignupForm();
}
async function submitLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return alert(error.message);
  alert("Logged in!");
  closeLoginForm();
}
