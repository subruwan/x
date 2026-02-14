function toggleDarkMode() {
    const body = document.body;
    const toggle = document.getElementById("themeToggle");

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggle.textContent = "🌙";
    }
}

window.onload = function() {
    const toggle = document.getElementById("themeToggle");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        toggle.textContent = "☀️";
    }
};

function searchPosts() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let posts = document.getElementsByClassName("post-preview");

    for (let i = 0; i < posts.length; i++) {
        let title = posts[i].getAttribute("data-title").toLowerCase();

        if (title.includes(input)) {
            posts[i].style.display = "";
        } else {
            posts[i].style.display = "none";
        }
    }
}

window.onload = function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
};
