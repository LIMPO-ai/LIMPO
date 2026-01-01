document.addEventListener("DOMContentLoaded", () => {

  // ===== PANEL FUNCTIONS =====
  function openMenu(){document.getElementById("side-menu").style.transform="translateX(0)";}
  function closeMenu(){document.getElementById("side-menu").style.transform="translateX(-100%)";}
  function openCart(){closeSaves(); closeProfile(); document.getElementById("cart-panel").style.transform="translateX(0)";}
  function closeCart(){document.getElementById("cart-panel").style.transform="translateX(100%)";}
  function openSaves(){closeCart(); closeProfile(); document.getElementById("saves-panel").style.transform="translateX(0)";}
  function closeSaves(){document.getElementById("saves-panel").style.transform="translateX(100%)";}
  function openProfile(){closeCart(); closeSaves(); document.getElementById("profile-panel").style.transform="translateX(0)";}
  function closeProfile(){document.getElementById("profile-panel").style.transform="translateX(100%)";}

  // Expose to HTML
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
    1: { name:"The First Bite", description:"✨ Meet The First Bite Gloss ✨", price:29.99, images:["images/The First Bite 1.jpg"] },
    2: { name:"Bee's Bless", description:"✨ Say hello to Bee's Bless ✨", price:29.99, images:["images/Bee's Bless 1.jpg"] },
    3: { name:"Pearl Coconut", description:"✨ Pearl Coconut Lip Gloss ✨", price:29.99, images:["images/Pearl Coconut 1.jfif"] },
    4: { name:"Toffee Apple", description:"Meet Toffee Apple —", price:29.99, images:["images/Toffee Apple 1.jfif"] },
    5: { name:"Grape Glam", description:"Meet Grape Glam 🍇✨", price:29.99, images:["images/Grape Glam 1.jfif"] }
  };

  function openProductDetail(id){
    const p = products[id]; 
    if(!p) return;

    const detail = document.getElementById("product-detail");
    if(!detail) return;

    detail.style.display = "flex";
    document.getElementById("detail-name").textContent = p.name;
    document.getElementById("detail-description").textContent = p.description;
    document.getElementById("detail-price").textContent = "AED " + p.price;

    const mainPhoto = document.getElementById("detail-main-photo");
    mainPhoto.src = p.images[0];

    const thumbs = document.getElementById("detail-thumbnails");
    thumbs.innerHTML = "";
    p.images.forEach(img => {
      const t = document.createElement("img");
      t.src = img;
      t.onclick = () => mainPhoto.src = img;
      thumbs.appendChild(t);
    });
  }

  // Expose product detail to HTML
  window.openProductDetail = openProductDetail;

  const closeDetailBtn = document.getElementById("close-detail");
  if(closeDetailBtn) closeDetailBtn.onclick = () => document.getElementById("product-detail").style.display = "none";

  // ===== SEARCH =====
  const searchInput = document.getElementById("searchInput");
  if(searchInput){
    searchInput.addEventListener("input", function(){
      const val = this.value.toLowerCase();
      document.querySelectorAll(".card").forEach(c => {
        const name = c.querySelector("h3").textContent.toLowerCase();
        c.style.display = name.includes(val) ? "block" : "none";
      });
    });
  }

  // ===== LOGIN & REGISTER =====
  const loginBtn = document.querySelector(".profile-btn.login");
  const registerBtn = document.querySelector(".profile-btn.register");
  const profileStatus = document.querySelector(".profile-content p strong");

  if(loginBtn){
    loginBtn.onclick = async () => {
      const email = prompt("Enter your email:");
      const password = prompt("Enter your password:");
      if(!email || !password) return;

      const { data, error } = await window.supabase.auth.signInWithPassword({ email, password });
      if(error) alert(error.message);
      else profileStatus.textContent = "Logged in";
    }
  }

  if(registerBtn){
    registerBtn.onclick = async () => {
      const email = prompt("Enter your email:");
      const password = prompt("Enter your password:");
      if(!email || !password) return;

      const { data, error } = await window.supabase.auth.signUp({ email, password });
      if(error) alert(error.message);
      else alert("Account created! Check your email to confirm.");
    }
  }

});


// ===== Login =====
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.log(error.message); // you can display error in a div on page instead
  } else {
    window.location.href = "shop.html"; // redirect after successful login
  }
});


// ===== Register =====
const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    console.log(error.message); // show error on page
  } else {
    window.location.href = "login.html"; // redirect to login page after signup
  }
});
