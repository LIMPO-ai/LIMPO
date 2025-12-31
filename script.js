<<<<<<< HEAD
const supabaseUrl = "sb_publishable_Kwtr59qmzPDmPes_0yKfEA_aPmYE9Zd";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGZudHplZ21paHZjcmZsdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjA4NDcsImV4cCI6MjA4MjM5Njg0N30.GfvKkgLxgFfwDe0XbbE1lzWNQXEHipHDwiHn7i9wZnc";

if (!window._supabaseClient) {
  window._supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
}
const supabase = window._supabaseClient;


async function testConnection() {
  const { data, error } = await supabase.from("users").select("*").limit(1);
  console.log("Supabase test:", data, error);
}

testConnection();



const products = {
  1: { name:"The First Bite", description:"✨ Meet The First Bite Gloss ✨Our very first lip gloss — handmade with love, cruelty-free, and infused with cherry flavor for the perfect glossy finish.   What makes it special?   🌿 With Vitamin E for soft lips   🥥 Coconut Oil for deep hydration   🐰 Handmade & Cruelty-Free", price:29.99, images:["images/The First Bite 1.jpg","images/The First Bite 2.png","images/The First Bite 3.png"] },
  2: { name:"Bee's Bless", description:"✨ Say hello to Bee's Bless ✨Not just a gloss — it’s lip care with a touch of luxury. 💋💎Here’s why you’ll love it:💧 Smooth, effortless glide   🌿 Nourishing with vitamins & oils🍯Honey-inspired glow   🛡️ Hydrates & protects", price:29.99, images:["images/Bee's Bless 1.jpg","images/Bee's Bless 2.jpg"] },
  3: { name:"Pearl Coconut", description:"✨ Pearl Coconut Lip Gloss ✨   🥥 Infused with real coconut essence for a tropical vibe   💧 Packed with hydrating oils to keep your lips soft & smooth   🌟 Pearlescent shine that glows without the sticky feel   Irresistible lips, naturally. 💋", price:29.99, images:["images/Pearl Coconut 1.jfif","images/Pearl Cocnout 2.png"] },
  4: { name:"Toffee Apple", description:"Meet Toffee Apple — our sweetest indulgence yet.   A rich, glossy finish with a hint of warmth that melts into your lips.   Hydrating. Lightweight. Deliciously irresistible. 🍎✨", price:29.99, images:["images/Toffee Apple 1.jfif","images/Toffee Apple 2.jpg"] },
  5: { name:"Grape Glam", description:"Meet Grape Glam 🍇✨   A dark-pink, grape-flavored gloss enriched with Vitamin E and coconut oil for soft, nourished, ultra-glossy lips.   Non-sticky • hydrating • long-lasting   Let your lips shine with Grape Glam 💗", price:29.99, images:["images/Grape Glam 1.jfif"] }
  
};

// OPEN PRODUCT DETAIL
function openProductDetail(id){
  const p = products[id]; 
  if(!p) return;
  document.getElementById("product-detail").style.display="flex";
  document.getElementById("detail-name").textContent=p.name;
  document.getElementById("detail-description").textContent=p.description;
  document.getElementById("detail-price").textContent="AED "+p.price;
  document.getElementById("detail-main-photo").src=p.images[0];
  const thumbs=document.getElementById("detail-thumbnails");
  thumbs.innerHTML="";
  p.images.forEach(img=>{
    const t=document.createElement("img"); 
    t.src=img; 
    t.onclick=()=>document.getElementById("detail-main-photo").src=img;
    thumbs.appendChild(t);
  });
}

// CLOSE PRODUCT DETAIL
document.getElementById("close-detail").onclick=()=>document.getElementById("product-detail").style.display="none";

// PANEL FUNCTIONS
function openMenu(){document.getElementById("side-menu").style.transform="translateX(0)";}
function closeMenu(){document.getElementById("side-menu").style.transform="translateX(-100%)";}
function openCart(){closeSaves(); closeProfile(); document.getElementById("cart-panel").style.transform="translateX(0)";}
function closeCart(){document.getElementById("cart-panel").style.transform="translateX(100%)";}
function openSaves(){closeCart(); closeProfile(); document.getElementById("saves-panel").style.transform="translateX(0)";}
function closeSaves(){document.getElementById("saves-panel").style.transform="translateX(100%)";}
function openProfile(){closeCart(); closeSaves(); document.getElementById("profile-panel").style.transform="translateX(0)";}
function closeProfile(){document.getElementById("profile-panel").style.transform="translateX(100%)";}

// SEARCH FILTER (works for both shop and new arrivals)
document.getElementById("searchInput").addEventListener("input",function(){
  const val=this.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    const name=c.querySelector("h3").textContent.toLowerCase();
    c.style.display=name.includes(val)?"block":"none";
  });
});
=======
const products = {
  1: { name:"The First Bite", description:"✨ Meet The First Bite Gloss ✨Our very first lip gloss — handmade with love, cruelty-free, and infused with cherry flavor for the perfect glossy finish.   What makes it special?   🌿 With Vitamin E for soft lips   🥥 Coconut Oil for deep hydration   🐰 Handmade & Cruelty-Free", price:29.99, images:["images/The First Bite 1.jpg","images/The First Bite 2.png","images/The First Bite 3.png"] },
  2: { name:"Bee's Bless", description:"✨ Say hello to Bee's Bless ✨Not just a gloss — it’s lip care with a touch of luxury. 💋💎Here’s why you’ll love it:💧 Smooth, effortless glide   🌿 Nourishing with vitamins & oils🍯Honey-inspired glow   🛡️ Hydrates & protects", price:29.99, images:["images/Bee's Bless 1.jpg","images/Bee's Bless 2.jpg"] },
  3: { name:"Pearl Coconut", description:"✨ Pearl Coconut Lip Gloss ✨   🥥 Infused with real coconut essence for a tropical vibe   💧 Packed with hydrating oils to keep your lips soft & smooth   🌟 Pearlescent shine that glows without the sticky feel   Irresistible lips, naturally. 💋", price:29.99, images:["images/Pearl Coconut 1.jfif","images/Pearl Cocnout 2.png"] },
  4: { name:"Toffee Apple", description:"Meet Toffee Apple — our sweetest indulgence yet.   A rich, glossy finish with a hint of warmth that melts into your lips.   Hydrating. Lightweight. Deliciously irresistible. 🍎✨", price:29.99, images:["images/Toffee Apple 1.jfif","images/Toffee Apple 2.jpg"] },
  5: { name:"Grape Glam", description:"Meet Grape Glam 🍇✨   A dark-pink, grape-flavored gloss enriched with Vitamin E and coconut oil for soft, nourished, ultra-glossy lips.   Non-sticky • hydrating • long-lasting   Let your lips shine with Grape Glam 💗", price:29.99, images:["images/Grape Glam 1.jfif"] }
  
};

// OPEN PRODUCT DETAIL
function openProductDetail(id){
  const p = products[id]; 
  if(!p) return;
  document.getElementById("product-detail").style.display="flex";
  document.getElementById("detail-name").textContent=p.name;
  document.getElementById("detail-description").textContent=p.description;
  document.getElementById("detail-price").textContent="AED "+p.price;
  document.getElementById("detail-main-photo").src=p.images[0];
  const thumbs=document.getElementById("detail-thumbnails");
  thumbs.innerHTML="";
  p.images.forEach(img=>{
    const t=document.createElement("img"); 
    t.src=img; 
    t.onclick=()=>document.getElementById("detail-main-photo").src=img;
    thumbs.appendChild(t);
  });
}

// CLOSE PRODUCT DETAIL
document.getElementById("close-detail").onclick=()=>document.getElementById("product-detail").style.display="none";

// PANEL FUNCTIONS
function openMenu(){document.getElementById("side-menu").style.transform="translateX(0)";}
function closeMenu(){document.getElementById("side-menu").style.transform="translateX(-100%)";}
function openCart(){closeSaves(); closeProfile(); document.getElementById("cart-panel").style.transform="translateX(0)";}
function closeCart(){document.getElementById("cart-panel").style.transform="translateX(100%)";}
function openSaves(){closeCart(); closeProfile(); document.getElementById("saves-panel").style.transform="translateX(0)";}
function closeSaves(){document.getElementById("saves-panel").style.transform="translateX(100%)";}
function openProfile(){closeCart(); closeSaves(); document.getElementById("profile-panel").style.transform="translateX(0)";}
function closeProfile(){document.getElementById("profile-panel").style.transform="translateX(100%)";}

// SEARCH FILTER (works for both shop and new arrivals)
document.getElementById("searchInput").addEventListener("input",function(){
  const val=this.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    const name=c.querySelector("h3").textContent.toLowerCase();
    c.style.display=name.includes(val)?"block":"none";
  });
});
>>>>>>> cd84e911e2ae7784d26ef196accbab4765bb74f4
