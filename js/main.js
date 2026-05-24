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
  initResponsiveCard(); // Initialize dynamic card scaling for responsiveness
});

// Tab Switching Navigation Logic
function switchTab(tabName) {
  // Hide all tab content panels
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(panel => {
    panel.classList.remove('active');
  });

  // Deactivate all tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
  });

  // Show current tab panel
  const targetPanel = document.getElementById(`tab-${tabName}`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  // Activate current tab button
  tabButtons.forEach(btn => {
    const clickAttr = btn.getAttribute('onclick');
    if (clickAttr && clickAttr.includes(`'${tabName}'`)) {
      btn.classList.add('active');
    }
  });
}

// Dynamic Responsive Card Scaling (standard best practice)
function initResponsiveCard() {
  const mainArea = document.querySelector('.main-area');
  if (!mainArea) return;

  // Use ResizeObserver to monitor size changes in the workspace
  const resizeObserver = new ResizeObserver(() => {
    adjustCardScale();
  });
  resizeObserver.observe(mainArea);
  
  // Also run on window resize as a robust fallback
  window.addEventListener('resize', adjustCardScale);
  
  // Initial calculation
  adjustCardScale();
}

function adjustCardScale() {
  const mainArea = document.querySelector('.main-area');
  const viewPort = document.querySelector('.view-port');
  if (!mainArea || !viewPort) return;

  // Define safety margins
  const horizontalPadding = 32; // 16px on each side
  const verticalPadding = 120;  // Space for bottom floating bar and margins
  
  const availableWidth = mainArea.clientWidth - horizontalPadding;
  const availableHeight = mainArea.clientHeight - verticalPadding;
  
  // Keep the preview size between 200px and 518px (which matches the desktop standard 0.48 scale)
  const maxDesktopSize = 518;
  const targetSize = Math.max(200, Math.min(availableWidth, availableHeight, maxDesktopSize));
  
  // Scale factor relative to 1080px original canvas size
  const scale = targetSize / 1080;
  
  // Set the custom scale variable and apply explicit bounding width/height to viewport
  viewPort.style.setProperty('--card-scale', scale);
  viewPort.style.width = `${targetSize}px`;
  viewPort.style.height = `${targetSize}px`;
}


