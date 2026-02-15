document.addEventListener('DOMContentLoaded', () => {
    // --- 1. THEME TOGGLE ---
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    if (themeToggle) {
        themeToggle.innerHTML = sunIcon;
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- 2. GLOBAL SEARCH & REDIRECT ---
    const searchInput = document.getElementById('searchInput');
    const isHomePage = window.location.pathname === '/x/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '/x';

    if (searchInput) {
        // Live Filter for Home
        searchInput.addEventListener('keyup', () => {
            if (isHomePage) {
                const term = searchInput.value.toLowerCase();
                document.querySelectorAll('.post-card').forEach(card => {
                    card.style.display = card.innerText.toLowerCase().includes(term) ? 'block' : 'none';
                });
            }
        });

        // Redirect for Posts/About
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !isHomePage) {
                window.location.href = `/x/index.html?search=${encodeURIComponent(searchInput.value)}`;
            }
        });

        // Apply URL Search Term on Home
        const urlParams = new URLSearchParams(window.location.search);
        const term = urlParams.get('search');
        if (term && isHomePage) {
            searchInput.value = term;
            setTimeout(() => searchInput.dispatchEvent(new Event('keyup')), 100);
        }
    }

    // --- 3. COLOMBO CLOCK ---
    function updateClock() {
        const clockEl = document.getElementById('clockTime');
        if (clockEl) {
            const options = { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            clockEl.textContent = new Intl.DateTimeFormat('en-GB', options).format(new Date());
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- 4. ACTIVE NAV HIGHLIGHT ---
    document.querySelectorAll('.nav-links a').forEach(link => {
        const path = window.location.pathname;
        const href = link.getAttribute('href').replace('../', '');
        if (path.includes(href) && href !== 'index.html') {
            link.classList.add('active');
        } else if (href === 'index.html' && (path.endsWith('/x/') || path.endsWith('index.html'))) {
            link.classList.add('active');
        }
    });

    // --- 5. READING TIME & GITHUB API ---
    // Reading Time
    document.querySelectorAll('.post-card').forEach(post => {
        const text = post.innerText;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / 200);
        const timeEl = post.querySelector('.reading-time');
        if (timeEl) timeEl.innerText = `${time} min read`;
    });

    // GitHub Last Updated (Only on post pages)
    const updateEl = document.getElementById('lastUpdated');
    if (updateEl && !isHomePage) {
        const fileName = window.location.pathname.split('/').pop();
        fetch(`https://api.github.com/repos/subruwan/x/commits?path=posts/${fileName}&per_page=1`)
            .then(res => res.json())
            .then(data => {
                if (data[0]) {
                    const d = new Date(data[0].commit.committer.date);
                    updateEl.innerText = `Last Updated: ${d.toLocaleDateString('en-GB')}`;
                }
            }).catch(() => updateEl.innerText = "");
    }
});

// --- 6. TICKER ANIMATION ---
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        // Clone the content to create a seamless loop
        const clone = tickerContent.innerHTML;
        tickerContent.innerHTML += clone + clone; // Triple it for safety on wide screens

        let scrollAmount = 0;
        function step() {
            scrollAmount += 0.8; // Speed of scroll
            if (scrollAmount >= tickerContent.scrollWidth / 3) {
                scrollAmount = 0;
            }
            tickerContent.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(step);
        }
        
        // Pause on hover
        let paused = false;
        tickerContent.addEventListener('mouseenter', () => paused = true);
        tickerContent.addEventListener('mouseleave', () => paused = false);

        function animate() {
            if (!paused) step();
            else requestAnimationFrame(animate);
        }
        requestAnimationFrame(step);
    }

// --- 7. SHARE POST FUNCTIONALITY ---
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: document.title,
                text: 'Check out this observation from TechLabs:',
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback for Desktop: Copy to clipboard
                    await navigator.clipboard.writeText(window.location.href);
                    const originalText = shareBtn.innerHTML;
                    shareBtn.innerText = "Link Copied!";
                    setTimeout(() => { shareBtn.innerHTML = originalText; }, 2000);
                }
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
    }

// --- 8. AUTO TABLE OF CONTENTS ---
function generateToC() {
    const tocList = document.getElementById('toc-list');
    const headers = document.querySelectorAll('.post-content h2');
    
    if (!tocList || headers.length === 0) return;

    headers.forEach(header => {
        // Ensure every H2 has an ID
        if (!header.id) {
            header.id = header.textContent.toLowerCase().replace(/\s+/g, '-');
        }

        const link = document.createElement('a');
        link.href = `#${header.id}`;
        link.textContent = header.textContent;
        
        // Smooth scroll effect
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById(header.id).scrollIntoView({ behavior: 'smooth' });
        });

        tocList.appendChild(link);
    });
}
generateToC();
