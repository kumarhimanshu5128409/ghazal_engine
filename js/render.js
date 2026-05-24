/* ==========================================================================
   GHAZAL STUDIO - Render and Annotation Concerns
   ========================================================================== */

function updateCurrentSherText() {
  const activeGhazal = ghazals[curGhazalIndex];
  const activeCouplet = activeGhazal.couplets[curCoupletIndex];

  activeCouplet['line 1'] = document.getElementById('input-line1').value;
  activeCouplet['line 2'] = document.getElementById('input-line2').value;
  activeCouplet['english line 1'] = document.getElementById('input-eng1').value;
  activeCouplet['english line 2'] = document.getElementById('input-eng2').value;
  
  saveCatalogToStorage();
  renderCardCanvas();
}

function updateSignatures() {
  const activeGhazal = ghazals[curGhazalIndex];
  activeGhazal.tag = document.getElementById('input-tag').value;
  activeGhazal.handle = document.getElementById('input-handle').value;

  saveCatalogToStorage();
  renderCardCanvas();
}

function renderCardCanvas() {
  const activeGhazal = ghazals[curGhazalIndex];
  const couplet = activeGhazal.couplets[curCoupletIndex];

  let devHtml = (couplet['line 1'] || '') + '\n' + (couplet['line 2'] || '');
  let romHtml = (couplet['english line 1'] || '') + '\n' + (couplet['english line 2'] || '');

  const meaningsMap = couplet.meanings || {};
  const sortedWords = Object.keys(meaningsMap).sort((a,b) => b.length - a.length);

  sortedWords.forEach(word => {
    const meaning = meaningsMap[word];
    if (word && meaning) {
      const escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(escapedWord, 'g');
      const annotationHtml = `<span class="annotated">${word}<span class="meaning top">${meaning}</span></span>`;
      devHtml = devHtml.replace(regex, annotationHtml);
    }
  });

  const devDisplay = document.getElementById('card-dev-display');
  if (devDisplay) devDisplay.innerHTML = devHtml.replace(/\n/g, '<br>');
  const romDisplay = document.getElementById('card-rom-display');
  if (romDisplay) romDisplay.innerHTML = romHtml.replace(/\n/g, '<br>');

  const cardTag = document.getElementById('card-tag');
  if (cardTag) cardTag.innerText = activeGhazal.tag || 'ग़ज़ल';
  const cardHandle = document.getElementById('card-handle');
  if (cardHandle) cardHandle.innerText = activeGhazal.handle || '@thoughtskumar';

  const totalCoupletsCount = activeGhazal.couplets.length;
  const numDisplay = document.getElementById('card-number-display');
  if (numDisplay) numDisplay.innerText = `${String(curCoupletIndex + 1).padStart(2, '0')} / ${String(totalCoupletsCount).padStart(2, '0')}`;
}

function renderAnnotationsUI() {
  const listUI = document.getElementById('annotations-list-ui');
  if (!listUI) return;
  listUI.innerHTML = '';
  
  const activeGhazal = ghazals[curGhazalIndex];
  const couplet = activeGhazal.couplets[curCoupletIndex];

  const meaningsMap = couplet.meanings || {};
  const words = Object.keys(meaningsMap);

  if (words.length === 0) {
    listUI.innerHTML = '<div style="font-size:11px; color:#71717a; font-style:italic;">No annotations added yet. Click above to add!</div>';
    return;
  }

  words.forEach(word => {
    const meaning = meaningsMap[word];
    const item = document.createElement('div');
    item.className = 'annotation-tag-item';
    item.innerHTML = `
      <div>
        <span class="annotation-tag-text">${word}</span>
        <span style="color:#71717a; margin: 0 4px;">➔</span>
        <span class="annotation-tag-meaning">${meaning}</span>
      </div>
      <button class="sher-action-btn" title="Delete Annotation" onclick="deleteAnnotation('${word.replace(/'/g, "\\'")}')">🗑️</button>
    `;
    listUI.appendChild(item);
  });
}

function openAnnotationModal() {
  const wordInput = document.getElementById('modal-word-input');
  if (wordInput) wordInput.value = '';
  const meanInput = document.getElementById('modal-meaning-input');
  if (meanInput) meanInput.value = '';
  const modal = document.getElementById('annotation-modal');
  if (modal) modal.classList.add('active');
}

function closeAnnotationModal() {
  const modal = document.getElementById('annotation-modal');
  if (modal) modal.classList.remove('active');
}

function saveAnnotationFromModal() {
  const wordVal = document.getElementById('modal-word-input');
  const meanVal = document.getElementById('modal-meaning-input');
  const word = wordVal ? wordVal.value.trim() : '';
  const meaning = meanVal ? meanVal.value.trim() : '';

  if (!word || !meaning) {
    alert("Please fill in both the Word and its Translation Meaning.");
    return;
  }

  const activeGhazal = ghazals[curGhazalIndex];
  const couplet = activeGhazal.couplets[curCoupletIndex];
  if (!couplet.meanings) couplet.meanings = {};

  couplet.meanings[word] = meaning;
  saveCatalogToStorage();
  renderCardCanvas();
  renderAnnotationsUI();
  closeAnnotationModal();
}

function deleteAnnotation(word) {
  const activeGhazal = ghazals[curGhazalIndex];
  const couplet = activeGhazal.couplets[curCoupletIndex];
  if (couplet.meanings && couplet.meanings[word]) {
    delete couplet.meanings[word];
  }
  saveCatalogToStorage();
  renderCardCanvas();
  renderAnnotationsUI();
}
