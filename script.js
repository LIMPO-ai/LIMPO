const supabaseUrl = 'sb_publishable_Kwtr59qmzPDmPes_0yKfEA_aPmYE9Zd';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGZudHplZ21paHZjcmZsdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjA4NDcsImV4cCI6MjA4MjM5Njg0N30.GfvKkgLxgFfwDe0XbbE1lzWNQXEHipHDwiHn7i9wZnc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Products
const products = {
    1: { name: "The First Bite", description: "Handmade lip gloss", price: 30, images:["images/The First Bite 2.png","images/The First Bite 3.png"] },
    2: { name: "Bee's Bless", description: "Handmade cherry lip gloss", price: 30, images:["images/lipgloss2-1.jpg","images/lipgloss2-2.jpg"] }
};

// Panels open/close
function openMenu(){document.getElementById("side-menu").style.transform="translateX(0)";}
function closeMenu(){document.getElementById("side-menu").style.transform="translateX(-100%)";}
function openCart(){document.getElementById("cart-panel").style.transform="translateX(0)"; showCart();}
function closeCart(){document.getElementById("cart-panel").style.transform="translateX(100%)";}
function openSaves(){document.getElementById("saves-panel").style.transform="translateX(0)"; showSaves();}
function closeSaves(){document.getElementById("saves-panel").style.transform="translateX(100%)";}
function openProfile(){showProfile(); document.getElementById("profile-panel").style.transform="translateX(0)";}
function closeProfile(){document.getElementById("profile-panel").style.transform="translateX(100%)";}

// Product Detail
function openProductDetail(id){
    const p=products[id]; if(!p) return;
    document.getElementById("product-detail").style.display="flex";
    document.getElementById("detail-name").textContent=p.name;
    document.getElementById("detail-description").textContent=p.description;
    document.getElementById("detail-price").textContent="AED "+p.price;
    document.getElementById("detail-main-photo").src=p.images[0];
    const thumbs=document.getElementById("detail-thumbnails"); thumbs.innerHTML="";
    p.images.forEach(img=>{const t=document.createElement("img"); t.src=img; t.onclick=()=>document.getElementById("detail-main-photo").src=img; thumbs.appendChild(t);});
    document.getElementById("add-to-cart").onclick=()=>{ const qty=parseInt(document.getElementById("qty").value); addToCart(id, qty);};
}
function closeProductDetail(){document.getElementById("product-detail").style.display="none";}

// Supabase Auth
async function signUp(email,password,name,phone){
    const {data,error}=await supabase.auth.signUp({email,password});
    if(error){alert(error.message); return;}
    await supabase.from('users').insert([{id:data.user.id,email,name,phone}]);
    alert("Signed up!"); showProfile();
}
async function login(email,password){
    const {data,error}=await supabase.auth.signInWithPassword({email,password});
    if(error){alert(error.message); return;}
    alert("Logged in!"); showProfile();
}

// Profile panel content
async function showProfile(){
    const {data:{user}}=await supabase.auth.getUser();
    const content=document.getElementById("profile-content");
    if(!user){
        content.innerHTML=`<h3>Login / Sign Up</h3>
        <input type="text" id="signup-name" placeholder="Name"><br><br>
        <input type="email" id="signup-email" placeholder="Email"><br><br>
        <input type="text" id="signup-phone" placeholder="Phone"><br><br>
        <input type="password" id="signup-password" placeholder="Password"><br><br>
        <button onclick="submitSignup()">Sign Up</button>
        <hr>
        <input type="email" id="login-email" placeholder="Email"><br><br>
        <input type="password" id="login-password" placeholder="Password"><br><br>
        <button onclick="submitLogin()">Login</button>`;}
    else{
        const {data,error}=await supabase.from('users').select('*').eq('id',user.id).single();
        if(data){
            content.innerHTML=`<p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <hr>
            <button onclick="logout()">Logout</button>`;}
    }
}

async function submitSignup(){
    const name=document.getElementById('signup-name').value;
    const email=document.getElementById('signup-email').value;
    const phone=document.getElementById('signup-phone').value;
    const password=document.getElementById('signup-password').value;
    if(!name||!email||!password){alert("Fill required!"); return;}
    await signUp(email,password,name,phone);
}
async function submitLogin(){
    const email=document.getElementById('login-email').value;
    const password=document.getElementById('login-password').value;
    await login(email,password);
}

// Cart / Saved Items
async function addToCart(pid,qty){const {data:{user}}=await supabase.auth.getUser(); if(!user){alert("Login first"); return;}
const {error}=await supabase.from('cart_items').insert([{user_id:user.id,product_id:pid,quantity:qty}]); if(error)alert(error.message); else alert("Added to cart!"); showCart();}
async function showCart(){const {data:{user}}=await supabase.auth.getUser(); if(!user)return; const {data:items}=await supabase.from('cart_items').select('*').eq('user_id',user.id); let total=0; let html=""; items.forEach(i=>{const p=products[i.product_id]; total+=p.price*i.quantity; html+=`<p>${p.name} x ${i.quantity} = AED ${p.price*i.quantity}</p>`;}); document.getElementById('cart-items').innerHTML=html; document.getElementById('cart-total').textContent=total;}
async function showSaves(){const {data:{user}}=await supabase.auth.getUser(); if(!user)return; const {data:items}=await supabase.from('saved_items').select('*').eq('user_id',user.id); let html=""; items.forEach(i=>{const p=products[i.product_id]; html+=`<p>${p.name}</p>`;}); document.getElementById('saves-items').innerHTML=html;}
function logout(){supabase.auth.signOut(); alert("Logged out"); showProfile();}

// Search
document.getElementById("searchInput").addEventListener("input",function(){const v=this.value.toLowerCase(); document.querySelectorAll(".card").forEach(c=>{const n=c.querySelector("h3").textContent.toLowerCase(); c.style.display=n.includes(v)?"block":"none";})});
