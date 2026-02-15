// Icons
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

// Elements
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const ticker = document.getElementById('tickerContent');

// 1. Initialize Theme
if (themeToggle) themeToggle.innerHTML = sunIcon;
html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

themeToggle?.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 2. Auto-clone Ticker
if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
}

// 3. Search Functionality
if (searchInput) {
    searchInput.addEventListener('keyup', () => {
        const term = searchInput.value.toLowerCase();
        document.querySelectorAll('.post-card').forEach(card => {
            card.style.display = card.innerText.toLowerCase().includes(term) ? 'block' : 'none';
        });
    });
}

// 4. Back to Top
document.getElementById('backToTop')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
