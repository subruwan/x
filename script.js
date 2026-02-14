function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

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
