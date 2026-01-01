// ========== SUPABASE CONNECTION ==========
const supabaseUrl = "sb_publishable_Kwtr59qmzPDmPes_0yKfEA_aPmYE9Zd";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGZudHplZ21paHZjcmZsdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjA4NDcsImV4cCI6MjA4MjM5Njg0N30.GfvKkgLxgFfwDe0XbbE1lzWNQXEHipHDwiHn7i9wZnc";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ========== LOGIN ==========
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (!error) {
      window.location.href = "shop.html";
    } else {
      document.getElementById("login-error").textContent = error.message;
    }
  });
}

// ========== REGISTER ==========
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (!error) {
      window.location.href = "login.html";
    } else {
      document.getElementById("register-error").textContent = error.message;
    }
  });
}
