const supabase = window.supabase;

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("#login-email").value;
    const password = loginForm.querySelector("#login-password").value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      document.getElementById("login-error").textContent = error.message;
    } else {
      window.location.href = "shop.html";
    }
  });
}

// REGISTER
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = registerForm.querySelector("#register-email").value;
    const password = registerForm.querySelector("#register-password").value;

    if (password.length < 6) {
      document.getElementById("register-error").textContent = "Password must be at least 6 characters.";
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      document.getElementById("register-error").textContent = error.message;
    } else {
      window.location.href = "login.html";
    }
  });
}
