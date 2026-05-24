/* ==========================================================================
   GHAZAL STUDIO - Theme and Presentation Concerns
   ========================================================================== */

const colorThemes = [
  // Subtle Presets (0 - 5)
  { name: 'Editorial Ivory', pageBg: '#18181b', cardBg: '#faf8f5', lines: '#e5e0d8', tag: '#a8a29e', handle: '#a8a29e', dev: '#292524', meaning: '#a8a29e', roman: '#78716c' },
  { name: 'Graphite Slate', pageBg: '#1e293b', cardBg: '#f8fafc', lines: '#e2e8f0', tag: '#94a3b8', handle: '#94a3b8', dev: '#0f172a', meaning: '#94a3b8', roman: '#64748b' },
  { name: 'Midnight Navy', pageBg: '#020617', cardBg: '#090d16', lines: '#1e293b', tag: '#475569', handle: '#475569', dev: '#e2e8f0', meaning: '#6366f1', roman: '#94a3b8' },
  { name: 'Vintage Sepia', pageBg: '#1b1310', cardBg: '#f3ece3', lines: '#d1c4a5', tag: '#b4a59f', handle: '#b4a59f', dev: '#43302b', meaning: '#a78bfa', roman: '#7a6a58' },
  { name: 'Botanical Sage', pageBg: '#1b231f', cardBg: '#f1f4f0', lines: '#c8d4cd', tag: '#9eb0a2', handle: '#9eb0a2', dev: '#1b2e26', meaning: '#10b981', roman: '#5c7062' },
  { name: 'Dusty Rose', pageBg: '#271c1c', cardBg: '#fdf8f6', lines: '#ebd9d9', tag: '#d2b4b8', handle: '#d2b4b8', dev: '#3f2c2e', meaning: '#ec4899', roman: '#8a6e71' },
  
  // High Contrast Presets (6 - 10)
  { name: 'Editorial B&W', pageBg: '#09090b', cardBg: '#ffffff', lines: '#e4e4e7', tag: '#a1a1aa', handle: '#a1a1aa', dev: '#000000', meaning: '#71717a', roman: '#52525b' },
  { name: 'Cobalt & Slate', pageBg: '#020617', cardBg: '#112240', lines: '#233554', tag: '#64748b', handle: '#64748b', dev: '#ffffff', meaning: '#60a5fa', roman: '#94a3b8' },
  { name: 'Crimson & Taupe', pageBg: '#1c0a0c', cardBg: '#3c1518', lines: '#59272a', tag: '#b48a8f', handle: '#b48a8f', dev: '#f8f4e6', meaning: '#f43f5e', roman: '#d5c3c6' },
  { name: 'Emerald & Moss', pageBg: '#022c22', cardBg: '#064e3b', lines: '#0f766e', tag: '#6e8a80', handle: '#6e8a80', dev: '#ffffff', meaning: '#34d399', roman: '#99f6e4' },
  { name: 'Terra & Clay', pageBg: '#2c150d', cardBg: '#f4dac9', lines: '#dfb9a5', tag: '#a47e70', handle: '#a47e70', dev: '#2c1810', meaning: '#f97316', roman: '#7d5a50' },

  // Two-Tone Presets (11 - 15)
  { name: "Jaun's Parchment", pageBg: '#24201b', cardBg: '#e8e4db', lines: '#d1cbc0', tag: '#a39d93', handle: '#1b1b1b', dev: '#1b1b1b', meaning: '#b91c1c', roman: '#6b2f29' },
  { name: 'Nightfall Olive', pageBg: '#050505', cardBg: '#141517', lines: '#2a2b2f', tag: '#5a5c63', handle: '#ffffff', dev: '#ffffff', meaning: '#84cc16', roman: '#b1be75' },
  { name: 'Poetic Slate', pageBg: '#181e24', cardBg: '#f4f4f4', lines: '#e0e0e0', tag: '#999999', handle: '#1a1a1a', dev: '#1a1a1a', meaning: '#0284c7', roman: '#2c5166' },
  { name: 'Haldi & Kumkum', pageBg: '#291005', cardBg: '#f5e4b3', lines: '#dfca95', tag: '#b8a36d', handle: '#4a2c11', dev: '#4a2c11', meaning: '#dc2626', roman: '#9c2a2a' },
  { name: 'Midnight Gold', pageBg: '#000000', cardBg: '#0f0f0f', lines: '#222222', tag: '#555555', handle: '#f0f0f0', dev: '#f0f0f0', meaning: '#eab308', roman: '#cca352' }
];

let activeThemeIndex = 0;
let customStylingMode = false;

// Initialize theme presets UI grids
function renderThemePresets() {
  const subtleGrid = document.getElementById('themes-subtle');
  const contrastGrid = document.getElementById('themes-contrast');
  const twotoneGrid = document.getElementById('themes-twotone');

  if (!subtleGrid || !contrastGrid || !twotoneGrid) return;

  subtleGrid.innerHTML = '';
  contrastGrid.innerHTML = '';
  twotoneGrid.innerHTML = '';

  colorThemes.forEach((t, index) => {
    const btn = document.createElement('button');
    btn.className = 'ctrl-btn theme-btn';
    btn.id = `theme-btn-${index}`;
    btn.innerText = t.name;
    btn.onclick = () => applyPresetTheme(index);

    if (index >= 0 && index <= 5) {
      subtleGrid.appendChild(btn);
    } else if (index >= 6 && index <= 10) {
      contrastGrid.appendChild(btn);
    } else if (index >= 11 && index <= 15) {
      twotoneGrid.appendChild(btn);
    }
  });
}

function applyPresetTheme(index) {
  if (customStylingMode) {
    const toggle = document.getElementById('toggle-custom-styling');
    if (toggle) toggle.checked = false;
    toggleCustomStylingMode();
  }

  activeThemeIndex = index;
  const t = colorThemes[index];
  const root = document.documentElement;

  root.style.setProperty('--page-bg', t.pageBg);
  root.style.setProperty('--card-bg', t.cardBg);
  root.style.setProperty('--line-color', t.lines);
  root.style.setProperty('--tag-color', t.tag);
  root.style.setProperty('--handle-color', t.handle);
  root.style.setProperty('--dev-color', t.dev);
  root.style.setProperty('--meaning-color', t.meaning);
  root.style.setProperty('--roman-color', t.roman);

  // Sync custom color inputs
  const cpCardBg = document.getElementById('cp-card-bg');
  if (cpCardBg) cpCardBg.value = convertToHex(t.cardBg);
  const cpDev = document.getElementById('cp-dev');
  if (cpDev) cpDev.value = convertToHex(t.dev);
  const cpRoman = document.getElementById('cp-roman');
  if (cpRoman) cpRoman.value = convertToHex(t.roman);
  const cpMeaning = document.getElementById('cp-meaning');
  if (cpMeaning) cpMeaning.value = convertToHex(t.meaning);
  const cpLines = document.getElementById('cp-lines');
  if (cpLines) cpLines.value = convertToHex(t.lines);
  const cpHandle = document.getElementById('cp-handle');
  if (cpHandle) cpHandle.value = convertToHex(t.handle);

  const card = document.getElementById('post-card');
  if (card) card.style.backgroundImage = 'none';
  const blurOverlay = document.getElementById('card-bg-blur-overlay');
  if (blurOverlay) blurOverlay.style.backdropFilter = 'none';

  document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`theme-btn-${index}`);
  if (activeBtn) activeBtn.classList.add('active');
}

function convertToHex(colorStr) {
  if (colorStr.startsWith('#')) return colorStr;
  if (colorStr === 'white') return '#ffffff';
  if (colorStr === 'black') return '#000000';
  return '#ffffff';
}

function toggleCustomStylingMode() {
  const toggle = document.getElementById('toggle-custom-styling');
  const checked = toggle ? toggle.checked : false;
  customStylingMode = checked;
  const panel = document.getElementById('custom-styling-controls');

  if (!panel) return;

  if (checked) {
    panel.style.opacity = '1';
    panel.style.pointerEvents = 'auto';
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    applyCustomColors();
  } else {
    panel.style.opacity = '0.4';
    panel.style.pointerEvents = 'none';
    applyPresetTheme(activeThemeIndex);
  }
}

function applyCustomColors() {
  if (!customStylingMode) return;

  const root = document.documentElement;
  const card = document.getElementById('post-card');
  const selectBg = document.getElementById('select-bg-style');
  const bgStyle = selectBg ? selectBg.value : 'solid';
  const inputBgImg = document.getElementById('input-bg-image');
  const bgImgUrl = inputBgImg ? inputBgImg.value.trim() : '';

  const cardBg = document.getElementById('cp-card-bg').value;
  const devColor = document.getElementById('cp-dev').value;
  const romColor = document.getElementById('cp-roman').value;
  const meanColor = document.getElementById('cp-meaning').value;
  const linesColor = document.getElementById('cp-lines').value;
  const handleColor = document.getElementById('cp-handle').value;

  root.style.setProperty('--card-bg', cardBg);
  root.style.setProperty('--dev-color', devColor);
  root.style.setProperty('--roman-color', romColor);
  root.style.setProperty('--meaning-color', meanColor);
  root.style.setProperty('--line-color', linesColor);
  root.style.setProperty('--tag-color', handleColor);
  root.style.setProperty('--handle-color', handleColor);

  const toggleLines = document.getElementById('toggle-lines-visible');
  const showBorders = toggleLines ? toggleLines.checked : true;
  root.style.setProperty('--card-line-opacity', showBorders ? '1' : '0');

  const gradPickers = document.getElementById('gradient-pickers');
  if (card) {
    if (bgStyle.startsWith('gradient')) {
      if (gradPickers) gradPickers.style.display = 'grid';
      const startColor = document.getElementById('cp-grad-start').value;
      const endColor = document.getElementById('cp-grad-end').value;

      if (bgStyle === 'gradient-linear') {
        card.style.backgroundImage = `linear-gradient(135deg, ${startColor}, ${endColor})`;
      } else {
        card.style.backgroundImage = `radial-gradient(circle, ${startColor}, ${endColor})`;
      }
    } else {
      if (gradPickers) gradPickers.style.display = 'none';
      card.style.backgroundImage = 'none';
    }
  }

  const rangeOpacity = document.getElementById('range-bg-opacity');
  const imgOpacity = rangeOpacity ? rangeOpacity.value : 10;
  const rangeBlur = document.getElementById('range-bg-blur');
  const imgBlur = rangeBlur ? rangeBlur.value : 0;
  const rangePadding = document.getElementById('range-card-padding');
  const paddingVal = rangePadding ? rangePadding.value : 100;

  const labelOpacity = document.getElementById('label-bg-opacity');
  if (labelOpacity) labelOpacity.innerText = `${imgOpacity}%`;
  const labelBlur = document.getElementById('label-bg-blur');
  if (labelBlur) labelBlur.innerText = `${imgBlur}px`;
  const labelPadding = document.getElementById('label-card-padding');
  if (labelPadding) labelPadding.innerText = `${paddingVal}px`;

  root.style.setProperty('--card-padding', `${paddingVal}px`);

  const blurOverlay = document.getElementById('card-bg-blur-overlay');
  if (blurOverlay && card) {
    if (bgImgUrl) {
      card.style.backgroundImage = `url(${bgImgUrl})`;
      blurOverlay.style.background = `rgba(var(--card-bg), ${(100 - imgOpacity) / 100})`;
      blurOverlay.style.backdropFilter = `blur(${imgBlur}px)`;
      blurOverlay.style.webkitBackdropFilter = `blur(${imgBlur}px)`;
    } else {
      blurOverlay.style.background = 'transparent';
      blurOverlay.style.backdropFilter = 'none';
      blurOverlay.style.webkitBackdropFilter = 'none';
    }
  }
}

function handleLocalImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const input = document.getElementById('input-bg-image');
    if (input) input.value = e.target.result;
    applyCustomColors();
  };
  reader.readAsDataURL(file);
}

function applyLayout(type) {
  const card = document.getElementById('post-card');
  if (card) card.setAttribute('data-layout', type);
  
  const btnCentered = document.getElementById('btn-layout-centered');
  if (btnCentered) btnCentered.classList.remove('active');
  const btnLeft = document.getElementById('btn-layout-left');
  if (btnLeft) btnLeft.classList.remove('active');
  
  const btnActive = document.getElementById(`btn-layout-${type}`);
  if (btnActive) btnActive.classList.add('active');
}

function updateFonts() {
  const root = document.documentElement;
  const devSelect = document.getElementById('select-font-dev');
  const devFont = devSelect ? devSelect.value : "'Akshar', sans-serif";
  const romSelect = document.getElementById('select-font-rom');
  const romFont = romSelect ? romSelect.value : "'IM Fell English', serif";

  root.style.setProperty('--font-devnagari', devFont);
  root.style.setProperty('--font-roman', romFont);
}
