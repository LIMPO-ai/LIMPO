// ---------------- Supabase ----------------
const supabaseUrl = 'sb_publishable_Kwtr59qmzPDmPes_0yKfEA_aPmYE9Zd';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGZudHplZ21paHZjcmZsdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjA4NDcsImV4cCI6MjA4MjM5Njg0N30.GfvKkgLxgFfwDe0XbbE1lzWNQXEHipHDwiHn7i9wZnc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ---------------- Products ----------------
const products = {
    1: { name: "The First Bite", description: "Handmade lip gloss with shine.", price: 30, images: ["images/The First Bite 2.png","images/The First Bite 3.png"] },
    2: { name: "Bee's Bless", description: "Handmade cherry-scented lip gloss.", price: 30, images: ["images/lipgloss2-1.jpg","images/lipgloss2-2.jpg"] }
};

// ---------------- Product Detail ----------------
function openProductDetail(id){
    const product = products[id];
    if(!product) return;

    document.getElementById("product-detail").style.display="flex";
    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-description").textContent = product.description;
    document.getElementById("detail-price").textContent = "AED " + product.price;
    document.getElementById("detail-main-photo").src = product.images[0];

    const thumbs = document.getElementById("detail-thumbnails");
    thumbs.innerHTML = "";
    product.images.forEach(img=>{
        const t = document.createElement("img");
        t.src = img;
        t.onclick = ()=>document.getElementById("detail-main-photo").src = img;
        thumbs.appendChild(t);
    });

    document.getElementById("add-to-cart").onclick = ()=>{ 
        const qty = parseInt(document.getElementById("qty").value);
        addToCart(id, qty);
    }
}
document.getElementById("close-detail").onclick = ()=>document.getElementById("product-detail").style.display="none";

// ---------------- Panels ----------------
function openMenu(){ document.getElementById("side-menu").style.transform="translateX(0)"; }
function closeMenu(){ document.getElementById("side-menu").style.transform="translateX(-100%)"; }
function openCart(){ closeSaves(); document.getElementById("cart-panel").style.transform="translateX(0)"; showCart(); }
function closeCart(){ document.getElementById("cart-panel").style.transform="translateX(100%)"; }
function openSaves(){ closeCart(); document.getElementById("saves-panel").style.transform="translateX(0)"; showSaves(); }
function closeSaves(){ document.getElementById("saves-panel").style.transform="translateX(100%)"; }
function openProfile(){ showProfile(); closeCart(); closeSaves(); document.getElementById("profile-panel").style.transform="translateX(0)"; }
function closeProfile(){ document.getElementById("profile-panel").style.transform="translateX(100%)"; }
function openOrders(){ alert("My Orders section coming soon!"); }
function logout(){ alert("Logged out!"); }

// ---------------- Search ----------------
document.getElementById("searchInput").addEventListener("input", function(){
    const searchValue = this.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card=>{
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(searchValue) ? "block" : "none";
    });
});

// ---------------- Signup/Login Forms ----------------
function openSignupForm(){ document.getElementById('signup-form').style.display='block'; }
function closeSignupForm(){ document.getElementById('signup-form').style.display='none'; }
function openLoginForm(){ document.getElementById('login-form').style.display='block'; }
function closeLoginForm(){ document.getElementById('login-form').style.display='none'; }

// ---------------- Supabase Auth ----------------
async function submitSignup(){
    const name=document.getElementById('signup-name').value;
    const email=document.getElementById('signup-email').value;
    const phone=document.getElementById('signup-phone').value;
    const password=document.getElementById('signup-password').value;
    if(!name||!email||!password){ alert('Fill all fields!'); return; }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if(error){ alert(error.message); return; }
    await supabase.from('users').insert([{ id:data.user.id, email, name, phone }]);
    alert('Signed up successfully!'); closeSignupForm(); showProfile();
}

async function submitLogin(){
    const email=document.getElementById('login-email').value;
    const password=document.getElementById('login-password').value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if(error){ alert(error.message); return; }
    alert('Logged in successfully!'); closeLoginForm(); showProfile();
}

// ---------------- Profile ----------------
async function showProfile(){
    const { data: { user } } = await supabase.auth.getUser();
    const profileDiv = document.querySelector('.profile-content');

    if(!user){
        profileDiv.innerHTML = `<button onclick="openSignupForm()">Sign Up</button>
                                <button onclick="openLoginForm()">Log In</button>`;
        return;
    }

    const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
    profileDiv.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <hr>
        <button onclick="openOrders()">My Orders</button>
        <button onclick="openSaves()">Saved Items ❤️</button>
        <button onclick="logout()">Logout</button>
    `;
}

// ---------------- Cart ----------------
async function addToCart(productId, quantity){
    const { data: { user } } = await supabase.auth.getUser();
    if(!user){ alert('Please log in'); return; }
    const { error } = await supabase.from('cart_items').insert([{ user_id:user.id, product_id:productId, quantity }]);
    if(error) alert(error.message); else alert('Added to cart!');
}

async function showCart(){
    const { data: { user } } = await supabase.auth.getUser();
    if(!user) return;
    const { data: cartItems } = await supabase.from('cart_items').select('*').eq('user_id', user.id);
    const cartDiv = document.getElementById('cart-items');
    cartDiv.innerHTML=''; let total=0;
    cartItems.forEach(item=>{
        const p = products[item.product_id];
        total+=p.price*item.quantity;
        cartDiv.innerHTML+=`<p>${p.name} x ${item.quantity} = AED ${p.price*item.quantity}</p>`;
    });
    document.getElementById('cart-total').textContent = total;
}

// ---------------- Saved Items ----------------
async function showSaves(){
    const { data: { user } } = await supabase.auth.getUser();
    if(!user) return;
    const { data: savedItems } = await supabase.from('saved_items').select('*').eq('user_id', user.id);
    const savesDiv = document.getElementById('saves-items');
    savesDiv.innerHTML='';
    savedItems.forEach(item=>{
        const p = products[item.product_id];
        savesDiv.innerHTML+=`<p>${p.name}</p>`;
    });
}
