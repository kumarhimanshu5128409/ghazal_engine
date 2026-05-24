/* ==========================================================================
   GHAZAL STUDIO - Core State and Storage Concerns
   ========================================================================== */

const DEFAULT_PRESET_GHAZALS = [
  {
    "title": "दबी दिल्लगी से हम",
    "poet": "/कुमार",
    "handle": "@thoughtskumar",
    "couplets": [
      {
        "line 1": "डरते हैं अपने दिल में दबी, दिल्लगी से हम",
        "line 2": "करता हो जो ग़ुलाम, ऐसी आशिक़ी से हम",
        "english line 1": "darte hain apne dil mein dabi, dillagi se hum,",
        "english line 2": "karta ho jo ghulam, aisi aashiqi se hum.",
        "meanings": {}
      },
      {
        "line 1": "एक नौकरी, एक छोकरी, और ज़िंदगी ये व्यस्त",
        "line 2": "नहीं चाहते, बस ज़िंदगी, इस ज़िंदगी से हम",
        "english line 1": "ek naukri, ek chhokri, aur zindagi yeh vyast,",
        "english line 2": "nahi chahte, bas zindagi, iss zindagi se hum.",
        "meanings": {}
      },
      {
        "line 1": "जिन्हें मंज़िलों की प्यास, काटें शजर-ए-रहगुज़र",
        "line 2": "हमें प्यार की तलाश, मिलेंगे हर कली से हम",
        "english line 1": "jinhe manzilon ki pyaas, kaate shajar-e-rehguzar,",
        "english line 2": "hume pyaar ki talaash, milenge har kali se hum.",
        "meanings": {
          "शजर-ए-रहगुज़र": "रास्ते का पेड़"
        }
      },
      {
        "line 1": "वो सबको जीत लेता है, एक ख़ुद को हारकर",
        "line 2": "जलते हैं अपने यार की, जादूगरी से हम",
        "english line 1": "wo sabko jeet leta hai, ek khud ko haarkar,",
        "english line 2": "jalte hain apne yaar ki, jadoogari se hum.",
        "meanings": {}
      },
      {
        "line 1": "होश आया तो बाज़ार में थे, वक़्त बेचते",
        "line 2": "कुछ याद नहीं गुज़रे हैं आख़िर, किस गली से हम",
        "english line 1": "hosh aaya to baazaar mein the, waqt bechte,",
        "english line 2": "kuchh yaad nahi guzre hain aakhir, kis gali se hum.",
        "meanings": {}
      },
      {
        "line 1": "आलम ने है इस दिल को यूं, प्यासा बिठा रखा",
        "line 2": "अब सुकून सा पाते हैं, इसी तिश्नगी से हम",
        "english line 1": "aalam ne hai iss dil को yoon, pyaasa bitha rakha,",
        "english line 2": "ab sukoon saa paate hain, isi tishnagi se hum.",
        "meanings": {
          "तिश्नगी": "प्यास"
        }
      },
      {
        "line 1": "अब ख़ुद को जलाएंगे हम, करेंगे उजाला",
        "line 2": "अंजाम तक लड़ेंगे, बसी तीरगी से हम",
        "english line 1": "ab khud ko jalaayenge hum, karenge ujala,",
        "english line 2": "anjaam tak ladenge, basi teeragi se hum.",
        "meanings": {
          "तीरगी": "अंधेरा"
        }
      }
    ]
  },
  {
    "title": "इश्क़ का कारवाँ",
    "poet": "/कुमार",
    "handle": "@thoughtskumar",
    "couplets": [
      {
        "line 1": "सफ़र में हमसफ़र मिले तो कारवाँ बना",
        "line 2": "तुम्हारी याद का ही दिल में आसमाँ बना",
        "english line 1": "safar mein humsafar mile toh karwan bana,",
        "english line 2": "tumhari yaad ka hi dil mein aasman bana.",
        "meanings": {
          "कारवाँ": "यात्रियों का समूह"
        }
      },
      {
        "line 1": "हज़ार मुश्किलें हों पर ये हौसला रहे",
        "line 2": "चराग़ बनकर जलने का सिलसिला रहे",
        "english line 1": "hazaar mushkilein hon par yeh hausla rahe,",
        "english line 2": "chiraag bankar jalne ka silsila rahe.",
        "meanings": {
          "सिलसला": "क्रम/दौर"
        }
      },
      {
        "line 1": "ख़ामोशियाँ भी कहती हैं अब दास्ताँ मेरी",
        "line 2": "ज़मीं तुम्हारी हो गयी है, आसमाँ मेरा",
        "english line 1": "khamoshiyan bhi kehti hain ab dastan meri,",
        "english line 2": "zamin tumhari ho gayi hai, aasman mera.",
        "meanings": {
          "दास्ताँ": "कहानी"
        }
      }
    ]
  }
];

// Global State Arrays and Indexes
let ghazals = [];
let curGhazalIndex = 0;
let curCoupletIndex = 0;

// Dynamic load: Prioritizes LocalStorage edits, fallback to ghazals.json repo presets, fallback to Defaults
async function loadCatalogFromStorage() {
  const data = localStorage.getItem('ghazal_studio_hierarchical_catalog');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].couplets) {
        ghazals = parsed;
        renderGhazalSelectorUI();
        switchGhazalProject(0);
        console.log("Loaded ghazals from LocalStorage");
        return;
      }
    } catch(e) {
      console.warn("Failed to parse LocalStorage data. Falling back to repo presets.");
    }
  }

  try {
    const response = await fetch('./ghazals.json');
    if (response.ok) {
      const fetched = await response.json();
      if (Array.isArray(fetched) && fetched.length > 0 && fetched[0].couplets) {
        ghazals = fetched;
        saveCatalogToStorage();
        renderGhazalSelectorUI();
        switchGhazalProject(0);
        console.log("Loaded ghazals directly from ghazals.json in repository");
        return;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch ghazals.json. Falling back to Defaults.");
  }

  // Fallback to defaults
  ghazals = JSON.parse(JSON.stringify(DEFAULT_PRESET_GHAZALS));
  saveCatalogToStorage();
  renderGhazalSelectorUI();
  switchGhazalProject(0);
}

function saveCatalogToStorage() {
  localStorage.setItem('ghazal_studio_hierarchical_catalog', JSON.stringify(ghazals));
}

// Toggle custom dropdown select
function toggleCustomSelect(e) {
  if (e) e.stopPropagation();
  const wrapper = document.getElementById('custom-select-wrapper');
  if (wrapper) {
    wrapper.classList.toggle('open');
  }
}

// Close custom dropdown when clicking outside
window.addEventListener('click', () => {
  const wrapper = document.getElementById('custom-select-wrapper');
  if (wrapper) {
    wrapper.classList.remove('open');
  }
});

// Ghazal Selector Dropdown UI Handler
function renderGhazalSelectorUI() {
  const select = document.getElementById('select-ghazal-project');
  const customValSpan = document.getElementById('custom-select-val');
  const customOptionsDiv = document.getElementById('custom-select-options');

  const activeGhazal = ghazals[curGhazalIndex];
  const activeText = activeGhazal 
    ? `${activeGhazal.title || `Ghazal ${curGhazalIndex+1}`} (${activeGhazal.couplets ? activeGhazal.couplets.length : 0} couplets)`
    : "Select Active Ghazal";

  if (customValSpan) {
    customValSpan.innerText = activeText;
  }

  if (customOptionsDiv) {
    customOptionsDiv.innerHTML = '';
    ghazals.forEach((g, i) => {
      const optDiv = document.createElement('div');
      optDiv.className = 'custom-option';
      if (i === curGhazalIndex) {
        optDiv.classList.add('selected');
      }
      optDiv.innerText = `${g.title || `Ghazal ${i+1}`} (${g.couplets ? g.couplets.length : 0} couplets)`;
      optDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        switchGhazalProject(i);
        const wrapper = document.getElementById('custom-select-wrapper');
        if (wrapper) wrapper.classList.remove('open');
      });
      customOptionsDiv.appendChild(optDiv);
    });
  }

  // Fallback native select syncing
  if (select) {
    select.innerHTML = '';
    ghazals.forEach((g, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.innerText = `${g.title || `Ghazal ${i+1}`} (${g.couplets ? g.couplets.length : 0} couplets)`;
      select.appendChild(opt);
    });
    select.value = curGhazalIndex;
  }
}

function switchGhazalProject(index) {
  if (index < 0 || index >= ghazals.length) return;
  curGhazalIndex = index;
  curCoupletIndex = 0;
  
  const select = document.getElementById('select-ghazal-project');
  if (select) select.value = index;

  const customValSpan = document.getElementById('custom-select-val');
  const activeGhazal = ghazals[index];
  if (customValSpan && activeGhazal) {
    customValSpan.innerText = `${activeGhazal.title || `Ghazal ${index+1}`} (${activeGhazal.couplets ? activeGhazal.couplets.length : 0} couplets)`;
  }

  // Update selected class in custom options
  const customOptionsDiv = document.getElementById('custom-select-options');
  if (customOptionsDiv) {
    const options = customOptionsDiv.querySelectorAll('.custom-option');
    options.forEach((opt, idx) => {
      if (idx === index) opt.classList.add('selected');
      else opt.classList.remove('selected');
    });
  }

  selectCouplet(0);
  if (typeof syncBulkTextareas === 'function') syncBulkTextareas();
}

async function createNewGhazalProject() {
  const title = await showCustomPrompt("New Ghazal", "Enter a title for the new Ghazal project:", `Ghazal ${ghazals.length + 1}`, "Ghazal title...");
  if (!title) return;

  const newGhazal = {
    "title": title,
    "poet": "/कुमार",
    "handle": ghazals[curGhazalIndex] ? ghazals[curGhazalIndex].handle : "@thoughtskumar",
    "couplets": [
      {
        "line 1": "यहाँ अपनी नयी पहली पंक्ति लिखें...",
        "line 2": "और यहाँ अपनी दूसरी पंक्ति...",
        "english line 1": "Type English transcription line 1...",
        "english line 2": "And English line 2...",
        "meanings": {}
      }
    ]
  };

  ghazals.push(newGhazal);
  saveCatalogToStorage();
  renderGhazalSelectorUI();
  switchGhazalProject(ghazals.length - 1);
}

async function renameCurrentGhazal() {
  const g = ghazals[curGhazalIndex];
  const newTitle = await showCustomPrompt("Rename Ghazal", "Enter a new title for the active Ghazal project:", g.title, "Ghazal title...");
  if (!newTitle) return;

  g.title = newTitle;
  saveCatalogToStorage();
  renderGhazalSelectorUI();
}

async function deleteCurrentGhazalProject() {
  if (ghazals.length <= 1) {
    await showCustomAlert("Delete Ghazal", "You must keep at least one Ghazal project in your studio.");
    return;
  }
  const confirmed = await showCustomConfirm("Delete Ghazal", `Are you sure you want to delete the active Ghazal "${ghazals[curGhazalIndex].title}"? This cannot be undone.`);
  if (!confirmed) return;

  ghazals.splice(curGhazalIndex, 1);
  if (curGhazalIndex >= ghazals.length) {
    curGhazalIndex = ghazals.length - 1;
  }

  saveCatalogToStorage();
  renderGhazalSelectorUI();
  switchGhazalProject(curGhazalIndex);
}

// Couplet Management within active Ghazal
function createNewCouplet() {
  const activeGhazal = ghazals[curGhazalIndex];
  const newSher = {
    "line 1": "यहाँ अपनी नयी पहली पंक्ति लिखें...",
    "line 2": "और यहाँ अपनी दूसरी पंक्ति...",
    "english line 1": "Type English line 1 transcription here...",
    "english line 2": "And English line 2 transcription here...",
    "meanings": {}
  };

  activeGhazal.couplets.splice(curCoupletIndex + 1, 0, newSher);
  saveCatalogToStorage();
  renderGhazalSelectorUI(); // Update count in selector dropdown
  selectCouplet(curCoupletIndex + 1);
  if (typeof syncBulkTextareas === 'function') syncBulkTextareas();
}

async function deleteCouplet(index) {
  const activeGhazal = ghazals[curGhazalIndex];
  if (activeGhazal.couplets.length <= 1) {
    await showCustomAlert("Delete Couplet", "You must keep at least one couplet in your Ghazal catalog.");
    return;
  }
  const confirmed = await showCustomConfirm("Delete Couplet Slide", "Are you sure you want to delete this active couplet slide?");
  if (!confirmed) return;
  
  activeGhazal.couplets.splice(index, 1);
  saveCatalogToStorage();
  renderGhazalSelectorUI();
  
  if (curCoupletIndex >= activeGhazal.couplets.length) {
    curCoupletIndex = activeGhazal.couplets.length - 1;
  }
  selectCouplet(curCoupletIndex);
  if (typeof syncBulkTextareas === 'function') syncBulkTextareas();
}

function moveCouplet(index, direction) {
  const activeGhazal = ghazals[curGhazalIndex];
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= activeGhazal.couplets.length) return;

  const temp = activeGhazal.couplets[index];
  activeGhazal.couplets[index] = activeGhazal.couplets[targetIndex];
  activeGhazal.couplets[targetIndex] = temp;

  saveCatalogToStorage();

  if (curCoupletIndex === index) curCoupletIndex = targetIndex;
  else if (curCoupletIndex === targetIndex) curCoupletIndex = index;

  selectCouplet(curCoupletIndex);
  if (typeof syncBulkTextareas === 'function') syncBulkTextareas();
}

async function resetToPresets() {
  const confirmed = await showCustomConfirm("Reset Studio", "This will reset all your Ghazal projects back to original presets. Continue?");
  if (confirmed) {
    ghazals = JSON.parse(JSON.stringify(DEFAULT_PRESET_GHAZALS));
    saveCatalogToStorage();
    renderGhazalSelectorUI();
    switchGhazalProject(0);
  }
}

function exportCatalog() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ghazals, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "ghazals.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importCatalog(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].couplets) {
        ghazals = parsed;
        saveCatalogToStorage();
        renderGhazalSelectorUI();
        switchGhazalProject(0);
        await showCustomAlert("Import Success", "Hierarchical poetry catalog imported successfully!");
      } else {
        await showCustomAlert("Import Error", "Invalid file format. Make sure it contains 'couplets' sub-arrays.");
      }
    } catch (err) {
      await showCustomAlert("Import Error", "Error parsing JSON file.");
    }
  };
  reader.readAsText(file);
}

/* ==========================================================================
   4. PREMIUM REUSABLE DIALOG SYSTEM (Alert / Confirm / Prompt)
   ========================================================================== */
let dialogResolve = null;

function showCustomPrompt(title, message, defaultValue, placeholder = "") {
  return new Promise((resolve) => {
    dialogResolve = resolve;
    
    document.getElementById('dialog-title').innerText = title;
    document.getElementById('dialog-message').innerText = message;
    
    const inputGroup = document.getElementById('dialog-input-group');
    inputGroup.style.display = 'flex';
    const textInput = document.getElementById('dialog-text-input');
    textInput.value = defaultValue || '';
    textInput.placeholder = placeholder;
    
    const modal = document.getElementById('custom-dialog-modal');
    modal.classList.add('active');
    
    setTimeout(() => textInput.focus(), 150);
    
    const confirmBtn = document.getElementById('btn-dialog-confirm');
    confirmBtn.onclick = () => {
      const val = textInput.value.trim();
      closeCustomDialog();
      resolve(val);
    };
    
    const cancelBtn = document.getElementById('btn-dialog-cancel');
    cancelBtn.onclick = () => {
      closeCustomDialog();
      resolve(null);
    };
  });
}

function showCustomConfirm(title, message) {
  return new Promise((resolve) => {
    dialogResolve = resolve;
    
    document.getElementById('dialog-title').innerText = title;
    document.getElementById('dialog-message').innerText = message;
    
    document.getElementById('dialog-input-group').style.display = 'none';
    
    const modal = document.getElementById('custom-dialog-modal');
    modal.classList.add('active');
    
    const confirmBtn = document.getElementById('btn-dialog-confirm');
    confirmBtn.onclick = () => {
      closeCustomDialog();
      resolve(true);
    };
    
    const cancelBtn = document.getElementById('btn-dialog-cancel');
    cancelBtn.onclick = () => {
      closeCustomDialog();
      resolve(false);
    };
  });
}

function showCustomAlert(title, message) {
  return new Promise((resolve) => {
    dialogResolve = resolve;
    
    document.getElementById('dialog-title').innerText = title;
    document.getElementById('dialog-message').innerText = message;
    
    document.getElementById('dialog-input-group').style.display = 'none';
    
    const cancelBtn = document.getElementById('btn-dialog-cancel');
    cancelBtn.style.display = 'none'; // Hide cancel button for alert
    
    const modal = document.getElementById('custom-dialog-modal');
    modal.classList.add('active');
    
    const confirmBtn = document.getElementById('btn-dialog-confirm');
    confirmBtn.onclick = () => {
      cancelBtn.style.display = 'inline-block'; // Restore cancel button for future confirm/prompts
      closeCustomDialog();
      resolve();
    };
  });
}

function closeCustomDialog() {
  const modal = document.getElementById('custom-dialog-modal');
  if (modal) modal.classList.remove('active');
  dialogResolve = null;
}

// Synchronize the bulk edit textareas with the currently loaded active Ghazal couplets list
function syncBulkTextareas() {
  const activeGhazal = ghazals[curGhazalIndex];
  if (!activeGhazal || !activeGhazal.couplets) return;

  const hindiTextarea = document.getElementById('textarea-bulk-hindi');
  const englishTextarea = document.getElementById('textarea-bulk-english');

  if (hindiTextarea) {
    const lines = [];
    activeGhazal.couplets.forEach((c, idx) => {
      // Put a single empty line after each two lines as a separator
      if (idx > 0) {
        lines.push('');
      }
      lines.push(c['line 1'] || '');
      lines.push(c['line 2'] || '');
    });
    // Trim trailing empty lines to look clean
    while (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop();
    }
    hindiTextarea.value = lines.join('\n');
  }

  if (englishTextarea) {
    const lines = [];
    activeGhazal.couplets.forEach((c, idx) => {
      if (idx > 0) {
        lines.push('');
      }
      lines.push(c['english line 1'] || '');
      lines.push(c['english line 2'] || '');
    });
    while (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop();
    }
    englishTextarea.value = lines.join('\n');
  }
}

// Parse lines in bulk edit textareas and update all slides in real-time
async function applyBulkGhazalText() {
  const activeGhazal = ghazals[curGhazalIndex];
  if (!activeGhazal) return;

  const hindiText = document.getElementById('textarea-bulk-hindi')?.value || '';
  const englishText = document.getElementById('textarea-bulk-english')?.value || '';

  // Confirm overwrite to avoid accidental typing loss
  if (activeGhazal.couplets && activeGhazal.couplets.length > 0) {
    const confirmed = await showCustomConfirm("Bulk Update", "This will overwrite all existing couplet slides in this Ghazal project with the parsed lines. Do you want to proceed?");
    if (!confirmed) return;
  }

  // Parse lines, robustly filtering out all completely empty lines or separators in between
  const hindiLines = hindiText.split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');
    
  const englishLines = englishText.split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');

  const maxLines = Math.max(hindiLines.length, englishLines.length);
  const maxCouplets = Math.ceil(maxLines / 2);

  if (maxCouplets === 0) {
    // Keep at least one empty couplet
    activeGhazal.couplets = [{
      "line 1": "",
      "line 2": "",
      "english line 1": "",
      "english line 2": "",
      "meanings": {}
    }];
  } else {
    const newCouplets = [];
    for (let i = 0; i < maxCouplets; i++) {
      newCouplets.push({
        "line 1": hindiLines[2 * i] || "",
        "line 2": hindiLines[2 * i + 1] || "",
        "english line 1": englishLines[2 * i] || "",
        "english line 2": englishLines[2 * i + 1] || "",
        "meanings": {}
      });
    }
    activeGhazal.couplets = newCouplets;
  }

  saveCatalogToStorage();
  renderGhazalSelectorUI();
  selectCouplet(0);
}
