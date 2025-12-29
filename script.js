const products = {
    1: {
        name: "The First Bite",
        description: "Handmade lip gloss with nourishing shine and hydration.",
        price: 30,
        images: ["images/The First Bite 2.png", "images/The First Bite 3.png"]
    },
    2: {
        name: "Bee's Bless",
        description: "Handmade cherry-scented lip gloss with soft shine.",
        price: 30,
        images: ["images/lipgloss2-1.jpg", "images/lipgloss2-2.jpg"]
    }
};

function openProductDetail(id) {
    const product = products[id];
    if(!product) return;

    const detail = document.getElementById("product-detail");
    detail.style.display = "flex";

    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-description").textContent = product.description;
    document.getElementById("detail-price").textContent = "AED" + product.price;
    document.getElementById("detail-main-photo").src = product.images[0];

    const thumbnailsDiv = document.getElementById("detail-thumbnails");
    thumbnailsDiv.innerHTML = "";

    product.images.forEach((img) => {
        const thumb = document.createElement("img");
        thumb.src = img;
        thumb.onclick = () => document.getElementById("detail-main-photo").src = img;
        thumbnailsDiv.appendChild(thumb);
    });

    document.getElementById("add-to-cart").onclick = () => {
        const qty = document.getElementById("qty").value;
        alert(`Added ${qty} x ${product.name} ($${product.price}) to cart!`);
    };
}

document.getElementById("close-detail").onclick = () => {
    document.getElementById("product-detail").style.display = "none";
};


function openMenu() {
  document.getElementById("side-menu").style.transform = "translateX(0)";
}

function closeMenu() {
  document.getElementById("side-menu").style.transform = "translateX(-100%)";
}

document.getElementById("searchInput").addEventListener("input", function() {
  const searchValue = this.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    if (name.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});


let cart = [];

function openCart() {
  closeSaves();
  document.getElementById("cart-panel").style.transform = "translateX(0)";
}

function closeCart() {
  document.getElementById("cart-panel").style.transform = "translateX(100%)";
}

function openSaves() {
  closeCart();
  document.getElementById("saves-panel").style.transform = "translateX(0)";
}

function closeSaves() {
  document.getElementById("saves-panel").style.transform = "translateX(100%)";
}

function openProfile() {
  closeCart();
  closeSaves();
  document.getElementById("profile-panel").style.transform = "translateX(0)";
}

function closeProfile() {
  document.getElementById("profile-panel").style.transform = "translateX(100%)";
}

function openOrders() {
  alert("This will open My Orders section (coming soon)!");
}

function logout() {
  alert("Logged out (demo)!");
}

// Signup
async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    alert(error.message);
  } else {
    // Save name in 'users' table
    await supabase.from('users').insert([{ id: data.user.id, email, name }]);
    alert("Registered successfully!");
  }
}

// Login
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) alert(error.message);
  else alert("Logged in!");
}

