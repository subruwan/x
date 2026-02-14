/* ===== Dark Mode Toggle ===== */
function toggleDarkMode() {
    const body = document.body;
    const toggle = document.getElementById("themeToggle");

    body.classList.toggle("dark");
    toggle.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
}

window.onload = function() {
    const toggle = document.getElementById("themeToggle");
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        toggle.textContent = "☀️";
    }
};

/* ===== Search ===== */
function searchPosts() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let posts = document.getElementsByClassName("post-preview");

    for (let i = 0; i < posts.length; i++) {
        let title = posts[i].getAttribute("data-title").toLowerCase();
        posts[i].style.display = title.includes(input) ? "" : "none";
    }
}
