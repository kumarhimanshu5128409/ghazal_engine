/* ==========================================================================
   GHAZAL STUDIO - High-Fidelity Capture and Export Concerns
   ========================================================================== */

function captureAndDownload(filename) {
  return new Promise((resolve) => {
    const card = document.getElementById('post-card');
    if (!card) return resolve();
    card.classList.remove('preview-mode');

    let currentBg = '#faf8f5';
    if (customStylingMode) {
      const picker = document.getElementById('cp-card-bg');
      currentBg = picker ? picker.value : '#faf8f5';
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
        
        card.classList.add('preview-mode');
        resolve();
      });
    }, 150);
  });
}

function downloadSingleImage() {
  captureAndDownload(`sher-${curCoupletIndex + 1}.png`);
}

async function downloadAllImages() {
  const btn = document.getElementById('dl-all-btn');
  if (!btn) return;
  btn.disabled = true;
  const originalCur = curCoupletIndex; 
  const activeGhazal = ghazals[curGhazalIndex];
  const total = activeGhazal.couplets.length;

  for (let i = 0; i < total; i++) {
    btn.innerText = `... (${i + 1}/${total})`;
    selectCouplet(i);
    
    await new Promise(r => setTimeout(r, 200)); 
    await captureAndDownload(`sher-${i + 1}.png`);
    await new Promise(r => setTimeout(r, 400)); 
  }

  selectCouplet(originalCur); 
  btn.innerText = `↓ Save All ${total}`;
  btn.disabled = false;
}
