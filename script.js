document.addEventListener("DOMContentLoaded", () => {

  // ===== PANEL FUNCTIONS =====
  function openMenu() { document.getElementById("side-menu").style.transform = "translateX(0)"; }
  function closeMenu() { document.getElementById("side-menu").style.transform = "translateX(-100%)"; }

  function openCart() {
    closeSaves(); closeProfile();
    document.getElementById("cart-panel").style.transform = "translateX(0)";
  }
  function closeCart() { document.getElementById("cart-panel").style.transform = "translateX(100%)"; }

  function openSaves() {
    closeCart(); closeProfile();
    document.getElementById("saves-panel").style.transform = "translateX(0)";
  }
  function closeSaves() { document.getElementById("saves-panel").style.transform = "translateX(100%)"; }

  function openProfile() {
    closeCart(); closeSaves();
    document.getElementById("profile-panel").style.transform = "translateX(0)";
  }
  function closeProfile() { document.getElementById("profile-panel").style.transform = "translateX(100%)"; }

  // Make them usable by HTML onclick
  window.openMenu = openMenu;
  window.closeMenu = closeMenu;
  window.openCart = openCart;
  window.closeCart = closeCart;
  window.openSaves = openSaves;
  window.closeSaves = closeSaves;
  window.openProfile = openProfile;
  window.closeProfile = closeProfile;

  // ===== AUTH BUTTON NAVIGATION =====
const loginBtn = document.querySelector(".profile-btn.login");
const registerBtn = document.querySelector(".profile-btn.register");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    window.location.href = "register.html";
  });
}


});
