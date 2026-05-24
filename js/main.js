/* ==========================================================================
   GHAZAL STUDIO - Main Bootstrapper & Navigation Logic
   ========================================================================== */

// Shared Couplet Selector bridge between State and UI View modules
function selectCouplet(index) {
  curCoupletIndex = index;
  const activeGhazal = ghazals[curGhazalIndex];
  const couplet = activeGhazal.couplets[index];

  // Sync inputs
  const l1 = document.getElementById('input-line1');
  if (l1) l1.value = couplet['line 1'] || '';
  const l2 = document.getElementById('input-line2');
  if (l2) l2.value = couplet['line 2'] || '';
  const e1 = document.getElementById('input-eng1');
  if (e1) e1.value = couplet['english line 1'] || '';
  const e2 = document.getElementById('input-eng2');
  if (e2) e2.value = couplet['english line 2'] || '';
  
  const tag = document.getElementById('input-tag');
  if (tag) tag.value = activeGhazal.tag || 'ग़ज़ल';
  const handle = document.getElementById('input-handle');
  if (handle) handle.value = activeGhazal.handle || '@thoughtskumar';

  renderAnnotationsUI();
  renderCardCanvas();
  renderSavedListUI();
}

// Window load pipeline hook
window.addEventListener('DOMContentLoaded', () => {
  renderThemePresets();
  loadCatalogFromStorage(); // Fetches ghazals.json and defaults
  updateFonts();
});
