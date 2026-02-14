const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');

// Initialize Theme
if (themeToggle) themeToggle.innerHTML = sunIcon;
html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

themeToggle?.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Search Logic
if (searchInput) {
    searchInput.addEventListener('keyup', () => {
        const term = searchInput.value.toLowerCase();
        document.querySelectorAll('.post-card').forEach(post => {
            post.style.display = post.innerText.toLowerCase().includes(term) ? 'block' : 'none';
        });
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !window.location.pathname.endsWith('index.html')) {
            const path = window.location.pathname.includes('/posts/') ? '../' : '';
            window.location.href = `${path}index.html?search=${encodeURIComponent(searchInput.value)}`;
        }
    });
}

// Global search param check
window.addEventListener('DOMContentLoaded', () => {
    const query = new URLSearchParams(window.location.search).get('search');
    if (query && searchInput) {
        searchInput.value = query;
        searchInput.dispatchEvent(new Event('keyup'));
    }
});

// Smooth Scroll for ToC
document.querySelectorAll('.toc a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById(this.getAttribute('href').substring(1));
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
});

// Auto-duplicate Ticker Items for seamless loop
const ticker = document.getElementById('tickerContent');
if (ticker) {
    const clone = ticker.innerHTML;
    ticker.innerHTML += clone; // This doubles the content automatically
}
