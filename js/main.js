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
  
  const poet = document.getElementById('input-poet');
  if (poet) poet.value = activeGhazal.poet || '/कुमार';
  const handle = document.getElementById('input-handle');
  if (handle) handle.value = activeGhazal.handle || '@thoughtskumar';

  renderAnnotationsUI();
  renderCardCanvas();
  renderSavedListUI();
  renderNavigation();
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

// Render Saved Couplets catalog in the "Saved List" Tab panel
function renderSavedListUI() {
  const container = document.getElementById('saved-shers-list');
  if (!container) return;
  container.innerHTML = '';

  const activeGhazal = ghazals[curGhazalIndex];
  if (!activeGhazal || !activeGhazal.couplets) return;

  activeGhazal.couplets.forEach((couplet, index) => {
    const item = document.createElement('div');
    item.className = `sher-item ${index === curCoupletIndex ? 'active' : ''}`;
    
    const line1 = couplet['line 1'] || '';
    const line2 = couplet['line 2'] || '';
    const previewText = line1 || line2 ? `${line1} / ${line2}` : 'Empty couplet';

    item.innerHTML = `
      <div class="sher-item-header">
        <span class="sher-item-num">Couplet ${String(index + 1).padStart(2, '0')}</span>
        <div class="sher-item-actions">
          <button class="sher-action-btn" title="Move Up" onclick="event.stopPropagation(); moveCouplet(${index}, -1)">▲</button>
          <button class="sher-action-btn" title="Move Down" onclick="event.stopPropagation(); moveCouplet(${index}, 1)">▼</button>
          <button class="sher-action-btn" style="color: #ef4444;" title="Delete" onclick="event.stopPropagation(); deleteCouplet(${index})">🗑️</button>
        </div>
      </div>
      <div class="sher-item-preview">${previewText}</div>
    `;

    item.addEventListener('click', () => {
      selectCouplet(index);
    });

    container.appendChild(item);
  });
}

// Render dynamic pagination buttons & arrow controllers in floating bottom bar
function renderNavigation() {
  const container = document.getElementById('nav-dots');
  if (!container) return;
  container.innerHTML = '';

  const activeGhazal = ghazals[curGhazalIndex];
  if (!activeGhazal || !activeGhazal.couplets) return;

  const total = activeGhazal.couplets.length;

  // 1. Previous page arrow (<)
  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '&lt;'; // `<` character
  prevBtn.title = 'Previous Couplet';
  prevBtn.style.fontWeight = 'bold';
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevCouplet();
  });
  container.appendChild(prevBtn);

  // 2. Circular page index buttons
  for (let i = 0; i < total; i++) {
    const dotBtn = document.createElement('button');
    dotBtn.innerText = String(i + 1).padStart(2, '0'); // Render as 01, 02...
    if (i === curCoupletIndex) {
      dotBtn.className = 'active';
    }
    dotBtn.title = `Go to Couplet ${i + 1}`;
    dotBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectCouplet(i);
    });
    container.appendChild(dotBtn);
  }

  // 3. Next page arrow (>)
  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '&gt;'; // `>` character
  nextBtn.title = 'Next Couplet';
  nextBtn.style.fontWeight = 'bold';
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextCouplet();
  });
  container.appendChild(nextBtn);
}

// Navigation helpers
function prevCouplet() {
  const activeGhazal = ghazals[curGhazalIndex];
  if (!activeGhazal || !activeGhazal.couplets) return;
  const total = activeGhazal.couplets.length;
  const newIndex = (curCoupletIndex - 1 + total) % total;
  selectCouplet(newIndex);
}

function nextCouplet() {
  const activeGhazal = ghazals[curGhazalIndex];
  if (!activeGhazal || !activeGhazal.couplets) return;
  const total = activeGhazal.couplets.length;
  const newIndex = (curCoupletIndex + 1) % total;
  selectCouplet(newIndex);
}


