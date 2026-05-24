# 🌌 Ghazal Engine & Creative Post Studio

Ghazal Engine is a premium, interactive, web-based creative suite that lets you write, customize, annotate, and export gorgeous poetry/sher cards ready for Instagram, Twitter, or Pinterest. 

Featuring standard **Classic Centered** and **Modern Left-Aligned** layouts, 16+ curated aesthetic color themes, custom typography, image overlay controls, and a fully interactive **dynamic annotation engine** to add handwriting word meanings inline.

---

## ✨ Features

- ✍️ **Dynamic Poetry Editor**: Compose and preview lines in Hindi (Devnagari) and English (Roman transcription) in real-time.
- 🏷️ **Dynamic Word Annotations**: Easily add inline handwritten annotations for difficult words (e.g. `शजर-ए-रहगुज़र` ➔ *रास्ते का पेड़*) which appear above or below the text automatically.
- 🎨 **State-of-the-Art Styling**: Customize background solid colors, designer gradients, or upload custom background images (with overlay, blur, and opacity settings).
- 🗂️ **Poetry Organizer (LocalStorage)**: Create a curated catalog of your favorite couplets, reorder them, add new items, and export/import them as JSON files.
- 🚀 **16 Presets**: Switch instantly between editorial themes like Editorial Ivory, Graphite Slate, Jaun's Parchment, Haldi & Kumkum, and Midnight Navy.
- 📸 **High-Fidelity Export**: Export individual cards or download the entire collection in one batch with optimized resolution using `html2canvas`.

---

## 🚀 Instant Deployment to GitHub Pages

Since Ghazal Engine is built completely on vanilla frontend technologies (HTML, CSS, and JS), it is exceptionally lightweight and perfectly suited for **GitHub Pages**.

To publish your own personal instance online in **less than 2 minutes**:

### Step 1: Create a GitHub Repository
1. Go to your GitHub account and create a new repository (e.g., `ghazal-engine`).
2. Do **not** initialize it with a README, `.gitignore`, or license.

### Step 2: Push your local codebase to GitHub
Open your terminal in this project directory and run the following commands:

```bash
# Add files and commit
git add .
git commit -m "feat: initial commit of the premium ghazal engine editor"

# Link to your new repository and push
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ghazal-engine.git
git push -u origin main
```

### Step 3: Turn on GitHub Pages
1. Navigate to your repository on GitHub.
2. Click on **Settings** (gear icon) in the top tabs.
3. On the left sidebar, click **Pages** under the "Code and automation" section.
4. Under **Build and deployment** ➔ **Branch**:
   - Set the branch to `main`.
   - Set the folder to `/ (root)`.
5. Click **Save**.

Your custom Ghazal Studio will be live at:
`https://YOUR-USERNAME.github.io/ghazal-engine/`

---

## 🛠️ Code Structure

- `index.html`: Houses the clean, responsive semantic layout and panels.
- `styles.css`: Powerhouse behind the elegant dark glassmorphic styling, custom scrollbars, and card rendering engine.
- `app.js`: State management, rendering logic, annotation handler, and file export utilities.

---

## 📜 Fonts Included
We load and bundle elite font styles from the Google Fonts API:
* **Devnagari**: Akshar, Kalam, Rozha One, Yatra One, Montserrat.
* **Roman / English**: IM Fell English, Playfair Display, Montserrat, Cormorant Garamond, Cinzel, Great Vibes.

---

## 🤝 Contributing & License
Contributions, feedback, and forks are highly appreciated! Released under the MIT License. Created with ❤️ for Urdu/Hindi poetry lovers.
