# 🧪 TechLabs | Honest Observations

A minimalist, high-performance static site for documenting technical experiments, troubleshooting notes & daily tech news observations.

## 🚀 Key Features
- **Ultra-Lightweight:** No frameworks, just vanilla HTML, CSS & JS.
- **Dark Mode:** System-aware with manual toggle & persistence.
- **Live Search:** Instant filtering of technical guides on the homepage.
- **News Ticker:** An automated CSS marquee for daily "LATEST" updates.
- **Responsive Tables:** Clean data presentation for "Honest Observation" reports.

## 📁 Project Structure
- `index.html`: The main feed & news marquee.
- `about.html`: Philosophy & contact info.
- `style.css`: Unified styling for light/dark modes.
- `script.js`: Search logic, theme switching & ticker automation.
- `/posts/`: Directory containing all technical guides (HTML).

## 🛠 How to Add a New Post
1. **Create the File:** Copy the template from an existing post into `/posts/your-filename.html`.
2. **Update the Feed:** Add a new `<article class="post-card">` to the `.feed` div in `index.html`.
3. **Update the Ticker:** Add your new headline to the `ticker-content` div in `index.html`. The script will handle the infinite loop automatically.

## 🌐 Deployment
This site is optimized for **GitHub Pages**.
- Push changes to the `main` branch.
- Ensure GitHub Pages is set to deploy from the `/root` directory.
