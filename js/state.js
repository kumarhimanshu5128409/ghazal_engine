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

// Dynamic load: Pulls ghazals.json from repo, fallback to LocalStorage, fallback to Defaults
async function loadCatalogFromStorage() {
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
    console.warn("Failed to fetch ghazals.json. Falling back to LocalStorage.");
  }

  const data = localStorage.getItem('ghazal_studio_hierarchical_catalog');
  if (data) {
    try {
      ghazals = JSON.parse(data);
      if (!Array.isArray(ghazals) || ghazals.length === 0 || !ghazals[0].couplets) {
        throw new Error("Invalid schema");
      }
    } catch(e) {
      ghazals = JSON.parse(JSON.stringify(DEFAULT_PRESET_GHAZALS));
    }
  } else {
    ghazals = JSON.parse(JSON.stringify(DEFAULT_PRESET_GHAZALS));
    saveCatalogToStorage();
  }
  
  renderGhazalSelectorUI();
  switchGhazalProject(0);
}

function saveCatalogToStorage() {
  localStorage.setItem('ghazal_studio_hierarchical_catalog', JSON.stringify(ghazals));
}

// Ghazal Selector Dropdown UI Handler
function renderGhazalSelectorUI() {
  const select = document.getElementById('select-ghazal-project');
  if (!select) return;
  select.innerHTML = '';

  ghazals.forEach((g, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.innerText = `${g.title || `Ghazal ${i+1}`} (${g.couplets ? g.couplets.length : 0} couplets)`;
    select.appendChild(opt);
  });

  select.value = curGhazalIndex;
}

function switchGhazalProject(index) {
  if (index < 0 || index >= ghazals.length) return;
  curGhazalIndex = index;
  curCoupletIndex = 0;
  
  const select = document.getElementById('select-ghazal-project');
  if (select) select.value = index;
  selectCouplet(0);
}

function createNewGhazalProject() {
  const title = prompt("Enter a title for the new Ghazal project:", `Ghazal ${ghazals.length + 1}`);
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

function renameCurrentGhazal() {
  const g = ghazals[curGhazalIndex];
  const newTitle = prompt("Rename Ghazal project:", g.title);
  if (!newTitle) return;

  g.title = newTitle;
  saveCatalogToStorage();
  renderGhazalSelectorUI();
}

function deleteCurrentGhazalProject() {
  if (ghazals.length <= 1) {
    alert("You must keep at least one Ghazal project in your studio.");
    return;
  }
  if (!confirm(`Are you sure you want to delete the active Ghazal "${ghazals[curGhazalIndex].title}"? This cannot be undone.`)) {
    return;
  }

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
}

function deleteCouplet(index) {
  const activeGhazal = ghazals[curGhazalIndex];
  if (activeGhazal.couplets.length <= 1) {
    alert("You must keep at least one couplet in your Ghazal catalog.");
    return;
  }
  if (!confirm("Are you sure you want to delete this active couplet slide?")) {
    return;
  }
  activeGhazal.couplets.splice(index, 1);
  saveCatalogToStorage();
  renderGhazalSelectorUI();
  
  if (curCoupletIndex >= activeGhazal.couplets.length) {
    curCoupletIndex = activeGhazal.couplets.length - 1;
  }
  selectCouplet(curCoupletIndex);
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
}

function resetToPresets() {
  if (confirm("This will reset all your Ghazal projects back to original presets. Continue?")) {
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
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].couplets) {
        ghazals = parsed;
        saveCatalogToStorage();
        renderGhazalSelectorUI();
        switchGhazalProject(0);
        alert("Hierarchical poetry catalog imported successfully!");
      } else {
        alert("Invalid file format. Make sure it contains 'couplets' sub-arrays.");
      }
    } catch (err) {
      alert("Error parsing JSON file.");
    }
  };
  reader.readAsText(file);
}
