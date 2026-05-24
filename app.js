/* ==========================================================================
   GHAZAL STUDIO - CORE APPLICATION LOGIC
   ========================================================================== */

// 1. TABS SYSTEM
function switchTab(tabId) {
  // Toggle tab buttons active status
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  // Find button by onclick matching substring or index
  const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => 
    b.getAttribute('onclick').includes(tabId)
  );
  if (btn) btn.classList.add('active');

  // Toggle tab content active status
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) activeContent.classList.add('active');
}

// 2. 16 PROFESSIONALLY CURATED THEMES
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

// Initialize theme presets UI grids
function renderThemePresets() {
  const subtleGrid = document.getElementById('themes-subtle');
  const contrastGrid = document.getElementById('themes-contrast');
  const twotoneGrid = document.getElementById('themes-twotone');

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

let activeThemeIndex = 0;
let customStylingMode = false;

function applyPresetTheme(index) {
  if (customStylingMode) {
    // Disable custom mode if clicking preset
    document.getElementById('toggle-custom-styling').checked = false;
    toggleCustomStylingMode();
  }

  activeThemeIndex = index;
  const t = colorThemes[index];
  const root = document.documentElement;

  // Apply to card preview variables
  root.style.setProperty('--page-bg', t.pageBg);
  root.style.setProperty('--card-bg', t.cardBg);
  root.style.setProperty('--line-color', t.lines);
  root.style.setProperty('--tag-color', t.tag);
  root.style.setProperty('--handle-color', t.handle);
  root.style.setProperty('--dev-color', t.dev);
  root.style.setProperty('--meaning-color', t.meaning);
  root.style.setProperty('--roman-color', t.roman);

  // Sync custom color pickers to match theme for easy tweaking
  document.getElementById('cp-card-bg').value = convertToHex(t.cardBg);
  document.getElementById('cp-dev').value = convertToHex(t.dev);
  document.getElementById('cp-roman').value = convertToHex(t.roman);
  document.getElementById('cp-meaning').value = convertToHex(t.meaning);
  document.getElementById('cp-lines').value = convertToHex(t.lines);
  document.getElementById('cp-handle').value = convertToHex(t.handle);

  // Reset gradient and background images variables on preset select
  const card = document.getElementById('post-card');
  card.style.backgroundImage = 'none';
  document.getElementById('card-bg-blur-overlay').style.backdropFilter = 'none';

  // Toggle active button status
  document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`theme-btn-${index}`);
  if (activeBtn) activeBtn.classList.add('active');
}

// Convert common hex colors or rgb, default to white/black
function convertToHex(colorStr) {
  if (colorStr.startsWith('#')) return colorStr;
  // Fallback for simple names
  if (colorStr === 'white') return '#ffffff';
  if (colorStr === 'black') return '#000000';
  return '#ffffff';
}

// Custom Styling Toggle Action
function toggleCustomStylingMode() {
  const checked = document.getElementById('toggle-custom-styling').checked;
  customStylingMode = checked;
  const panel = document.getElementById('custom-styling-controls');

  if (checked) {
    panel.style.opacity = '1';
    panel.style.pointerEvents = 'auto';
    // Remove theme button active class
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    applyCustomColors();
  } else {
    panel.style.opacity = '0.4';
    panel.style.pointerEvents = 'none';
    applyPresetTheme(activeThemeIndex);
  }
}

// Apply Custom Color & Gradients & Background Images
function applyCustomColors() {
  if (!customStylingMode) return;

  const root = document.documentElement;
  const card = document.getElementById('post-card');
  const bgStyle = document.getElementById('select-bg-style').value;
  const bgImgUrl = document.getElementById('input-bg-image').value.trim();

  // Basic colors
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

  // Borders Visibility
  const showBorders = document.getElementById('toggle-lines-visible').checked;
  root.style.setProperty('--card-line-opacity', showBorders ? '1' : '0');

  // Background Style options (Solid, Gradient)
  const gradPickers = document.getElementById('gradient-pickers');
  if (bgStyle.startsWith('gradient')) {
    gradPickers.style.display = 'grid';
    const startColor = document.getElementById('cp-grad-start').value;
    const endColor = document.getElementById('cp-grad-end').value;

    if (bgStyle === 'gradient-linear') {
      card.style.backgroundImage = `linear-gradient(135deg, ${startColor}, ${endColor})`;
    } else {
      card.style.backgroundImage = `radial-gradient(circle, ${startColor}, ${endColor})`;
    }
  } else {
    gradPickers.style.display = 'none';
    card.style.backgroundImage = 'none';
  }

  // Handle Background Image uploader & opacity & blur
  const imgOpacity = document.getElementById('range-bg-opacity').value;
  const imgBlur = document.getElementById('range-bg-blur').value;
  const paddingVal = document.getElementById('range-card-padding').value;

  document.getElementById('label-bg-opacity').innerText = `${imgOpacity}%`;
  document.getElementById('label-bg-blur').innerText = `${imgBlur}px`;
  document.getElementById('label-card-padding').innerText = `${paddingVal}px`;

  // Apply layout card padding
  root.style.setProperty('--card-padding', `${paddingVal}px`);

  const blurOverlay = document.getElementById('card-bg-blur-overlay');
  
  if (bgImgUrl) {
    card.style.backgroundImage = `url(${bgImgUrl})`;
    // Adjust overlay cover colors
    blurOverlay.style.background = `rgba(var(--card-bg), ${(100 - imgOpacity) / 100})`;
    blurOverlay.style.backdropFilter = `blur(${imgBlur}px)`;
    blurOverlay.style.webkitBackdropFilter = `blur(${imgBlur}px)`;
  } else {
    blurOverlay.style.background = 'transparent';
    blurOverlay.style.backdropFilter = 'none';
    blurOverlay.style.webkitBackdropFilter = 'none';
  }
}

// Local image file upload
function handleLocalImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('input-bg-image').value = e.target.result;
    applyCustomColors();
  };
  reader.readAsDataURL(file);
}


// 3. CATALOG & LOCALSTORAGE SYSTEM
const DEFAULT_PRESET_SHERS = [
  {
    d: "डरते हैं अपने दिल में दबी, दिल्लगी से हम\nकरता हो जो ग़ुलाम, ऐसी आशिक़ी से हम",
    r: "darte hain apne dil mein dabi, dillagi se hum,\nkarta ho jo ghulam, aisi aashiqi se hum.",
    tag: "ग़ज़ल",
    handle: "@thoughtskumar",
    annotations: []
  },
  {
    d: "एक नौकरी, एक छोकरी, और ज़िंदगी ये व्यस्त\nनहीं चाहते, बस ज़िंदगी, इस ज़िंदगी से हम",
    r: "ek naukri, ek chhokri, aur zindagi yeh vyast,\nnahi chahte, bas zindagi, iss zindagi se hum.",
    tag: "ग़ज़ल",
    handle: "@thoughtskumar",
    annotations: []
  },
  {
    d: "जिन्हें मंज़िलों की प्यास, काटें शजर-ए-रहगुज़र\nहमें प्यार की तलाश, मिलेंगे हर कली से हम",
    r: "jinhe manzilon ki pyaas, kaate shajar-e-rehguzar,\nhume pyaar ki talaash, milenge har kali se hum.",
    tag: "ग़ज़ल",
    handle: "@thoughtskumar",
    annotations: [
      { word: "शजर-ए-रहगुज़र", meaning: "रास्ते का पेड़", pos: "top" }
    ]
  },
  {
    d: "वो सबको जीत लेता है, एक ख़ुद को हारकर\nजलते हैं अपने यार की, जादूगरी से हम",
    r: "wo sabko jeet leta hai, ek khud ko haarkar,\njalte hain apne yaar ki, jadoogari se hum.",
    tag: "ग़ज़ल",
    handle: "@thoughtskumar",
    annotations: []
  },
  {
    d: "होश आया तो बाज़ार में थे, वक़्त बेचते\nकुछ याद नहीं गुज़रे हैं आख़िर, किस गली से हम",
    r: "hosh aaya to baazaar mein the, waqt bechte,\nkuchh yaad nahi guzre hain aakhir, kis gali se hum.",
    tag: "ग़ज़ल",
    handle: "@thoughtskumar",
    annotations: []
  },
  {
    d: "आलम ने है इस दिल को यूं, प्यासा बिठा रखा\nअब सुकून सा पाते हैं, इसी तिश्नगी से हम",
    r: "aalam ne hai iss dil ko yoon, pyaasa bitha rakha,\nab sukoon saa paate hain, isi tishnagi se hum.",
    tag: "ग़ज़ल",
    handle: "@thoughtskumar",
    annotations: [
      { word: "तिश्नगी", meaning: "प्यास", pos: "bottom" }
    ]
  },
  {
    d: "अब ख़ुद को जलाएंगे हम, करेंगे उजाला\nअंजाम तक लड़ेंगे, बसी तीरगी से हम",
    r: "ab khud ko jalaayenge hum, karenge ujala,\nanjaam tak ladenge, basi teeragi se hum.",
    tag: "ग़ज़ल",
    handle: "@thoughtskumar",
    annotations: [
      { word: "तीरगी", meaning: "अंधेरा", pos: "bottom" }
    ]
  }
];

let shers = [];
let curIndex = 0;

function loadCatalogFromStorage() {
  const data = localStorage.getItem('ghazal_studio_shers');
  if (data) {
    try {
      shers = JSON.parse(data);
    } catch(e) {
      shers = JSON.parse(JSON.stringify(DEFAULT_PRESET_SHERS));
    }
  } else {
    shers = JSON.parse(JSON.stringify(DEFAULT_PRESET_SHERS));
    saveCatalogToStorage();
  }
}

function saveCatalogToStorage() {
  localStorage.setItem('ghazal_studio_shers', JSON.stringify(shers));
}

function renderSavedListUI() {
  const container = document.getElementById('saved-shers-list');
  container.innerHTML = '';

  shers.forEach((sher, i) => {
    const item = document.createElement('div');
    item.className = i === curIndex ? 'sher-item active' : 'sher-item';
    item.onclick = (e) => {
      // Avoid action triggers
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      selectSher(i);
    };

    // Item contents HTML
    item.innerHTML = `
      <div class="sher-item-header">
        <span class="sher-item-num">Slide ${String(i+1).padStart(2, '0')}</span>
        <div class="sher-item-actions">
          <button class="sher-action-btn" title="Move Up" onclick="moveSher(${i}, -1)">▲</button>
          <button class="sher-action-btn" title="Move Down" onclick="moveSher(${i}, 1)">▼</button>
          <button class="sher-action-btn" title="Delete" onclick="deleteSher(${i})">🗑️</button>
        </div>
      </div>
      <div class="sher-item-preview">${sher.d.replace(/\n/g, ' / ')}</div>
    `;

    container.appendChild(item);
  });

  // Re-render bottom slider buttons
  renderPillDots();
}

function renderPillDots() {
  const dotsContainer = document.getElementById('nav-dots');
  dotsContainer.innerHTML = '';

  shers.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = i === curIndex ? 'active' : '';
    btn.innerText = i + 1;
    btn.onclick = () => selectSher(i);
    dotsContainer.appendChild(btn);
  });

  // Update save all button text
  document.getElementById('dl-all-btn').innerText = `↓ Save All ${shers.length}`;
}

function selectSher(index) {
  curIndex = index;
  const sher = shers[index];

  // Sync inputs
  document.getElementById('input-devnagari').value = sher.d;
  document.getElementById('input-roman').value = sher.r;
  document.getElementById('input-tag').value = sher.tag || 'ग़ज़ल';
  document.getElementById('input-handle').value = sher.handle || '@thoughtskumar';

  renderAnnotationsUI();
  renderCardCanvas();
  renderSavedListUI();
}

function createNewSher() {
  const newSher = {
    d: "यहाँ अपनी नयी पहली पंक्ति लिखें...\nऔर यहाँ अपनी दूसरी पंक्ति...",
    r: "Type roman transcription line 1 here...\nAnd roman line 2...",
    tag: "ग़ज़ल",
    handle: shers[curIndex] ? shers[curIndex].handle : "@thoughtskumar",
    annotations: []
  };

  shers.push(newSher);
  saveCatalogToStorage();
  selectSher(shers.length - 1);
}

function deleteSher(index) {
  if (shers.length <= 1) {
    alert("You must keep at least one couplet in your catalog.");
    return;
  }
  shers.splice(index, 1);
  saveCatalogToStorage();
  
  if (curIndex >= shers.length) {
    curIndex = shers.length - 1;
  }
  selectSher(curIndex);
}

function moveSher(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= shers.length) return;

  // Swap
  const temp = shers[index];
  shers[index] = shers[targetIndex];
  shers[targetIndex] = temp;

  saveCatalogToStorage();

  if (curIndex === index) curIndex = targetIndex;
  else if (curIndex === targetIndex) curIndex = index;

  selectSher(curIndex);
}

function resetToPresets() {
  if (confirm("This will reset your catalog and replace it with default couplets. Continue?")) {
    shers = JSON.parse(JSON.stringify(DEFAULT_PRESET_SHERS));
    saveCatalogToStorage();
    selectSher(0);
  }
}

// Export / Import JSON files
function exportCatalog() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shers, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "ghazal_catalog.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importCatalog(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].d && parsed[0].r) {
        shers = parsed;
        saveCatalogToStorage();
        selectSher(0);
        alert("Poetry catalog imported successfully!");
      } else {
        alert("Invalid file format. Make sure it is a valid list of couplets.");
      }
    } catch (err) {
      alert("Error parsing JSON file.");
    }
  };
  reader.readAsText(file);
}


// 4. TEXT RENDERING & ANNOTATIONS SYSTEM
function updateCurrentSherText() {
  const activeSher = shers[curIndex];
  activeSher.d = document.getElementById('input-devnagari').value;
  activeSher.r = document.getElementById('input-roman').value;
  
  saveCatalogToStorage();
  renderCardCanvas();
}

function updateSignatures() {
  const activeSher = shers[curIndex];
  activeSher.tag = document.getElementById('input-tag').value;
  activeSher.handle = document.getElementById('input-handle').value;

  saveCatalogToStorage();
  renderCardCanvas();
}

// Replace annotation keywords in rendering
function renderCardCanvas() {
  const sher = shers[curIndex];

  // Render text content
  let devHtml = sher.d;
  
  // Sort annotations descending by word length to avoid replacing substrings incorrectly
  const sortedAnnotations = [...(sher.annotations || [])].sort((a,b) => b.word.length - a.word.length);

  sortedAnnotations.forEach(ann => {
    if (ann.word && ann.meaning) {
      // Escape special regex characters
      const escapedWord = ann.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(escapedWord, 'g');
      
      const annotationHtml = `<span class="annotated">${ann.word}<span class="meaning ${ann.pos}">${ann.meaning}</span></span>`;
      devHtml = devHtml.replace(regex, annotationHtml);
    }
  });

  // Display Devnagari & Roman text
  document.getElementById('card-dev-display').innerHTML = devHtml.replace(/\n/g, '<br>');
  document.getElementById('card-rom-display').innerText = sher.r;

  // Display Metadata Handle & Tag
  document.getElementById('card-tag').innerText = sher.tag || 'ग़ज़ल';
  document.getElementById('card-handle').innerText = sher.handle || '@thoughtskumar';

  // Display counter
  document.getElementById('card-number-display').innerText = `${String(curIndex + 1).padStart(2, '0')} / ${String(shers.length).padStart(2, '0')}`;
}

// Render list of annotations in Editor Tab
function renderAnnotationsUI() {
  const listUI = document.getElementById('annotations-list-ui');
  listUI.innerHTML = '';
  const activeSher = shers[curIndex];

  if (!activeSher.annotations || activeSher.annotations.length === 0) {
    listUI.innerHTML = '<div style="font-size:11px; color:#71717a; font-style:italic;">No annotations added yet. Click above to add!</div>';
    return;
  }

  activeSher.annotations.forEach((ann, i) => {
    const item = document.createElement('div');
    item.className = 'annotation-tag-item';
    item.innerHTML = `
      <div>
        <span class="annotation-tag-text">${ann.word}</span>
        <span style="color:#71717a; margin: 0 4px;">➔</span>
        <span class="annotation-tag-meaning">${ann.meaning}</span>
        <span style="font-size: 9px; color:#6366f1; text-transform: uppercase; margin-left: 6px; padding: 2px 4px; background: rgba(99,102,241,0.1); border-radius:4px;">${ann.pos}</span>
      </div>
      <button class="sher-action-btn" title="Delete Annotation" onclick="deleteAnnotation(${i})">🗑️</button>
    `;
    listUI.appendChild(item);
  });
}

// Annotation Modal Functions
function openAnnotationModal() {
  // Clear modal inputs
  document.getElementById('modal-word-input').value = '';
  document.getElementById('modal-meaning-input').value = '';
  document.getElementById('modal-position-select').value = 'top';

  document.getElementById('annotation-modal').classList.add('active');
}

function closeAnnotationModal() {
  document.getElementById('annotation-modal').classList.remove('active');
}

function saveAnnotationFromModal() {
  const word = document.getElementById('modal-word-input').value.trim();
  const meaning = document.getElementById('modal-meaning-input').value.trim();
  const pos = document.getElementById('modal-position-select').value;

  if (!word || !meaning) {
    alert("Please fill in both the Word and its Translation Meaning.");
    return;
  }

  const activeSher = shers[curIndex];
  if (!activeSher.annotations) activeSher.annotations = [];

  activeSher.annotations.push({ word, meaning, pos });
  saveCatalogToStorage();
  renderCardCanvas();
  renderAnnotationsUI();
  closeAnnotationModal();
}

function deleteAnnotation(index) {
  const activeSher = shers[curIndex];
  activeSher.annotations.splice(index, 1);
  saveCatalogToStorage();
  renderCardCanvas();
  renderAnnotationsUI();
}


// 5. DESIGN & TYPOGRAPHY SYSTEM
function applyLayout(type) {
  document.getElementById('post-card').setAttribute('data-layout', type);
  document.getElementById('btn-layout-centered').classList.remove('active');
  document.getElementById('btn-layout-left').classList.remove('active');
  document.getElementById(`btn-layout-${type}`).classList.add('active');
}

function updateFonts() {
  const root = document.documentElement;
  const devFont = document.getElementById('select-font-dev').value;
  const romFont = document.getElementById('select-font-rom').value;

  root.style.setProperty('--font-devnagari', devFont);
  root.style.setProperty('--font-roman', romFont);
}


// 6. HIGH FIDELITY PNG EXPORTER (html2canvas)
function captureAndDownload(filename) {
  return new Promise((resolve) => {
    const card = document.getElementById('post-card');
    
    // Disable preview scaled CSS to capture full 1080x1080 resolution
    card.classList.remove('preview-mode');

    // Retrieve active theme card background color
    let currentBg = '#faf8f5';
    if (customStylingMode) {
      currentBg = document.getElementById('cp-card-bg').value;
    } else {
      currentBg = colorThemes[activeThemeIndex].cardBg;
    }

    setTimeout(() => {
      html2canvas(card, {
        scale: 1,
        useCORS: true,
        logging: false,
        backgroundColor: currentBg
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        // Restore scale preview css
        card.classList.add('preview-mode');
        resolve();
      });
    }, 150);
  });
}

function downloadSingleImage() {
  captureAndDownload(`sher-${curIndex + 1}.png`);
}

async function downloadAllImages() {
  const btn = document.getElementById('dl-all-btn');
  btn.disabled = true;
  const originalCur = curIndex; 

  for (let i = 0; i < shers.length; i++) {
    btn.innerText = `... (${i + 1}/${shers.length})`;
    selectSher(i);
    
    // Allow thread render pause
    await new Promise(r => setTimeout(r, 200)); 
    await captureAndDownload(`sher-${i + 1}.png`);
    await new Promise(r => setTimeout(r, 400)); 
  }

  // Restore current
  selectSher(originalCur); 
  btn.innerText = `↓ Save All ${shers.length}`;
  btn.disabled = false;
}


// 7. INITIALIZATION PIPELINE
window.addEventListener('DOMContentLoaded', () => {
  renderThemePresets();
  loadCatalogFromStorage();
  
  // Select first sher in loaded list
  selectSher(0);

  // Apply default fonts
  updateFonts();
});
