 // ===== Supabase Setup =====
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

// ===== Products =====
const products = {
  1: { name:"The First Bite", description:"✨ Meet The First Bite Gloss ✨ ...", price:29.99, images:["images/The First Bite 1.jpg","images/The First Bite 2.png","images/The First Bite 3.png"] },
  2: { name:"Bee's Bless", description:"✨ Say hello to Bee's Bless ✨ ...", price:29.99, images:["images/Bee's Bless 1.jpg","images/Bee's Bless 2.jpg"] },
  3: { name:"Pearl Coconut", description:"✨ Pearl Coconut Lip Gloss ✨ ...", price:29.99, images:["images/Pearl Coconut 1.jfif","images/Pearl Cocnout 2.png"] },
  4: { name:"Toffee Apple", description:"Meet Toffee Apple — ...", price:29.99, images:["images/Toffee Apple 1.jfif","images/Toffee Apple 2.jpg"] },
  5: { name:"Grape Glam", description:"Meet Grape Glam 🍇✨ ...", price:29.99, images:["images/Grape Glam 1.jfif"] }
};

// ===== Product Detail =====
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

document.getElementById("close-detail").onclick = () => document.getElementById("product-detail").style.display="none";

// ===== Panel Functions =====
function openMenu(){document.getElementById("side-menu").style.transform="translateX(0)";}
function closeMenu(){document.getElementById("side-menu").style.transform="translateX(-100%)";}
function openCart(){closeSaves(); closeProfile(); document.getElementById("cart-panel").style.transform="translateX(0)";}
function closeCart(){document.getElementById("cart-panel").style.transform="translateX(100%)";}
function openSaves(){closeCart(); closeProfile(); document.getElementById("saves-panel").style.transform="translateX(0)";}
function closeSaves(){document.getElementById("saves-panel").style.transform="translateX(100%)";}
function openProfile(){closeCart(); closeSaves(); document.getElementById("profile-panel").style.transform="translateX(0)";}
function closeProfile(){document.getElementById("profile-panel").style.transform="translateX(100%)";}

// ===== Search Filter =====
document.getElementById("searchInput").addEventListener("input", function(){
  const val=this.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    const name=c.querySelector("h3").textContent.toLowerCase();
    c.style.display = name.includes(val) ? "block" : "none";
  });
});
