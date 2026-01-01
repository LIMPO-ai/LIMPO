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
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

if(registerBtn){
  registerBtn.addEventListener("click", () => {
    window.location.href = "register.html";
  });
}
});


const supabase = window._supabaseClient || window.supabase;

async function updateProfileUI() {
  const { data: { user } } = await supabase.auth.getUser();

  const status = document.getElementById("profile-status");
  const email = document.getElementById("profile-email");
  const loginBtn = document.getElementById("go-login");
  const registerBtn = document.getElementById("go-register");
  const logoutBtn = document.getElementById("logout-btn");

  if (user) {
    status.textContent = "Logged In";
    email.textContent = user.email;
    email.style.display = "block";

    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    status.textContent = "Guest";
    email.style.display = "none";

    loginBtn.style.display = "block";
    registerBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
}

document.getElementById("go-login").onclick = () => location.href = "login.html";
document.getElementById("go-register").onclick = () => location.href = "register.html";
document.getElementById("logout-btn").onclick = async () => {
  await supabase.auth.signOut();
  updateProfileUI();
};

updateProfileUI();
