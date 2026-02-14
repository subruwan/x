const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Dark Mode Logic
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Load Saved Theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Simple Search Filter
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', () => {
    const term = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll('.post-card');

    posts.forEach(post => {
        const title = post.querySelector('h2').innerText.toLowerCase();
        post.style.display = title.includes(term) ? 'block' : 'none';
    });
});
