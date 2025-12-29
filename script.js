// ------------------ Products ------------------
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

// ------------------ Product Detail ------------------
function openProductDetail(id) {
    const product = products[id];
    if (!product) return;

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
        const qty = parseInt(document.getElementById("qty").value);
        addToCart(id, qty);
    };
}

document.getElementById("close-detail").onclick = () => {
    document.getElementById("product-detail").style.display = "none";
};

// ------------------ Menu & Panels ------------------
function openMenu() {
    document.getElementById("side-menu").style.transform = "translateX(0)";
}
function closeMenu() {
    document.getElementById("side-menu").style.transform = "translateX(-100%)";
}
function openCart() {
    closeSaves();
    document.getElementById("cart-panel").style.transform = "translateX(0)";
    showCart();
}
function closeCart() {
    document.getElementById("cart-panel").style.transform = "translateX(100%)";
}
function openSaves() {
    closeCart();
    document.getElementById("saves-panel").style.transform = "translateX(0)";
    showSaves();
}
function closeSaves() {
    document.getElementById("saves-panel").style.transform = "translateX(100%)";
}
function openProfile() {
    showProfile();
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

// ------------------ Search ------------------
document.getElementById("searchInput").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(searchValue) ? "block" : "none";
    });
});

// ------------------ Supabase Authentication ------------------
async function signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { alert(error.message); return; }

    await supabase.from('users').insert([{ id: data.user.id, email, name }]);
    alert('Registered successfully!');
}

async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else alert('Logged in!');
}

// ------------------ Profile ------------------
async function showProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    if (data) {
        document.querySelector('.profile-content').innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <hr>
            <button onclick="openOrders()">My Orders</button>
            <button onclick="openSaves()">Saved Items ❤️</button>
            <button onclick="logout()">Logout</button>
        `;
    }
}

// ------------------ Cart ------------------
async function addToCart(productId, quantity) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert('Please log in'); return; }

    const { error } = await supabase.from('cart_items').insert([
        { user_id: user.id, product_id: productId, quantity }
    ]);

    if (error) alert(error.message);
    else alert('Added to cart!');
}

async function showCart() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: cartItems } = await supabase.from('cart_items')
        .select('*')
        .eq('user_id', user.id);

    const cartDiv = document.getElementById('cart-items');
    cartDiv.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const product = products[item.product_id];
        total += product.price * item.quantity;
        cartDiv.innerHTML += `<p>${product.name} x ${item.quantity} = AED ${product.price * item.quantity}</p>`;
    });

    document.getElementById('cart-total').textContent = total;
}

// ------------------ Saved Items ------------------
async function showSaves() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: savedItems } = await supabase.from('saved_items')
        .select('*')
        .eq('user_id', user.id);

    const savesDiv = document.getElementById('saves-items');
    savesDiv.innerHTML = '';

    savedItems.forEach(item => {
        const product = products[item.product_id];
        savesDiv.innerHTML += `<p>${product.name}</p>`;
    });
}
