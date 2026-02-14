const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const html = document.documentElement;

// Initialize
if (themeToggle) themeToggle.innerHTML = sunIcon;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Theme Switcher
themeToggle?.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Search Logic
if (searchInput) {
    searchInput.addEventListener('keyup', () => {
        const term = searchInput.value.toLowerCase();
        const posts = document.querySelectorAll('.post-card');
        posts.forEach(post => {
            const text = post.innerText.toLowerCase();
            post.style.display = text.includes(term) ? 'block' : 'none';
        });
    });

    // Enter to search from sub-pages
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !window.location.pathname.endsWith('index.html')) {
            window.location.href = (window.location.pathname.includes('/posts/')) 
                ? '../index.html?search=' + encodeURIComponent(searchInput.value)
                : 'index.html?search=' + encodeURIComponent(searchInput.value);
        }
    });
}

// Handle incoming search queries
window.addEventListener('DOMContentLoaded', () => {
    const query = new URLSearchParams(window.location.search).get('search');
    if (query && searchInput) {
        searchInput.value = query;
        searchInput.dispatchEvent(new Event('keyup'));
    }
});
