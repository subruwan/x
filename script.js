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
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const term = searchInput.value.toLowerCase();
            const isHomePage = window.location.pathname === '/x/' || window.location.pathname.endsWith('index.html');

            if (!isHomePage) {
                // Redirect to home with the search term as a URL parameter
                window.location.href = `/x/index.html?search=${encodeURIComponent(term)}`;
            }
        }
    });

    // If we are on the home page, check if there's a search term in the URL
    window.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        if (searchTerm) {
            searchInput.value = searchTerm;
            // Trigger the search filter logic
            const event = new Event('keyup');
            searchInput.dispatchEvent(event);
        }
    });
}

// 4. Back to Top
document.getElementById('backToTop')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function updateClock() {
    const clockElement = document.getElementById('clockTime');
    if (!clockElement) return;

    const options = {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const srilankaTime = new Intl.DateTimeFormat('en-GB', options).format(new Date());
    clockElement.textContent = srilankaTime;
}

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

function calculateReadingTime() {
    const posts = document.querySelectorAll('.post-card');
    const wordsPerMinute = 200;

    posts.forEach(post => {
        // Get text from title and summary
        const text = post.querySelector('h2').innerText + " " + post.querySelector('p').innerText;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wordsPerMinute);
        
        const timeElement = post.querySelector('.reading-time');
        if (timeElement) {
            timeElement.innerText = `${time} min read`;
        }
    });
}

// Run it after the page loads
window.addEventListener('DOMContentLoaded', calculateReadingTime);

// Highlight Active Page in Nav
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        // Check if the link's href matches the current path
        if (currentPath.includes(link.getAttribute('href').replace('../', ''))) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('DOMContentLoaded', highlightActiveNav);

document.getElementById('shareBtn')?.addEventListener('click', async () => {
    const shareData = {
        title: document.title,
        text: 'Check out this observation from TechLabs:',
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: Copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
            const btn = document.getElementById('shareBtn');
            const originalText = btn.innerHTML;
            btn.innerText = "Link Copied!";
            setTimeout(() => { btn.innerHTML = originalText; }, 2000);
        }
    } catch (err) {
        console.log('Error sharing:', err);
    }
});

async function getGitHubLastUpdated() {
    const statusElement = document.getElementById('lastUpdated');
    if (!statusElement) return;

    // This gets the filename from the URL (e.g., "sri-lanka.html")
    const pathArray = window.location.pathname.split('/');
    const fileName = pathArray[pathArray.length - 1];
    
    // Change 'subruwan' and 'x' to your actual GitHub username and repo name
    const repo = 'subruwan/x'; 
    const apiUrl = `https://api.github.com/repos/${repo}/commits?path=posts/${fileName}&page=1&per_page=1`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            const lastUpdate = new Date(data[0].commit.committer.date);
            const formattedDate = lastUpdate.toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            });
            statusElement.innerText = `System Last Updated: ${formattedDate}`;
        } else {
            statusElement.innerText = "Status: Static Observation";
        }
    } catch (err) {
        statusElement.innerText = "Status: Offline Mode";
    }
}

window.addEventListener('DOMContentLoaded', getGitHubLastUpdated);
