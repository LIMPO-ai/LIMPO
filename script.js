// Supabase client
const supabaseUrl = "sb_publishable_Kwtr59qmzPDmPes_0yKfEA_aPmYE9Zd";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGZudHplZ21paHZjcmZsdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjA4NDcsImV4cCI6MjA4MjM5Njg0N30.GfvKkgLxgFfwDe0XbbE1lzWNQXEHipHDwiHn7i9wZnc";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Panel controls
function openMenu(){ document.getElementById("side-menu").style.left="0"; }
function closeMenu(){ document.getElementById("side-menu").style.left="-100%"; }
function openCart(){ document.getElementById("cart-panel").style.right="0"; }
function closeCart(){ document.getElementById("cart-panel").style.right="-100%"; }
function openSaves(){ document.getElementById("saves-panel").style.right="0"; }
function closeSaves(){ document.getElementById("saves-panel").style.right="-100%"; }
function openProfile(){ document.getElementById("profile-panel").style.right="0"; showProfile(); }
function closeProfile(){ document.getElementById("profile-panel").style.right="-100%"; }

// Show login/signup in profile
async function showProfile(){
    const { data: { user } } = await supabase.auth.getUser();
    const content = document.getElementById("profile-content");
    if(!user){
        content.innerHTML = `
            <h3>Login / Sign Up</h3>
            <input id="email" placeholder="Email"><br><br>
            <input id="password" type="password" placeholder="Password"><br><br>
            <button onclick="login()">Login</button>
            <button onclick="signup()">Sign Up</button>
        `;
    } else {
        content.innerHTML = `<p>Logged in as ${user.email}</p><button onclick="logout()">Logout</button>`;
    }
}

// Auth functions
async function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) alert(error.message);
    else showProfile();
}

async function signup(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const { error } = await supabase.auth.signUp({ email, password });
    if(error) alert(error.message);
    else showProfile();
}

async function logout(){
    await supabase.auth.signOut();
    showProfile();
}
