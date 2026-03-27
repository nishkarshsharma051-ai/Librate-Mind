/* ════════════════════════════════════════════════════════════
   js/resources.js — Resources & Breathing Exercise
═══════════════════════════════════════════════════════════ */

const ResourcesModule = (() => {
  let initialized = false;

  function renderResources() {
    const grid = document.getElementById('resources-grid');
    if (!grid) return;

    grid.innerHTML = DB.getResources().map(r => {
      const actionsHtml = r.actions.map(a => {
        if (a.breath) {
          return `<button class="btn ${a.primary ? 'btn-primary' : 'btn-ghost'} open-breath-btn">${a.label}</button>`;
        }
        return `<a href="${a.url}" target="_blank" rel="noopener" class="btn ${a.primary ? 'btn-primary' : 'btn-ghost'}">${a.label}</a>`;
      }).join('');

      return `<div class="resource-card">
        <div class="resource-icon">${r.icon}</div>
        <span class="resource-tag">${r.tag}</span>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
        <div class="resource-actions">${actionsHtml}</div>
      </div>`;
    }).join('');

    // Bind inner breath buttons
    grid.querySelectorAll('.open-breath-btn').forEach(btn => {
      btn.addEventListener('click', openBreathing);
    });
  }

  // ── Breathing Exercise ──────────────────────────────────────
  let breathTimer = null;
  let breathRunning = false;

  function openBreathing() {
    document.getElementById('breath-overlay')?.classList.remove('hidden');
    startBreathing();
  }

  function closeBreathing() {
    document.getElementById('breath-overlay')?.classList.add('hidden');
    breathRunning = false;
    clearTimeout(breathTimer);
    // Reset ring
    const ring = document.getElementById('breath-ring');
    if (ring) {
      ring.className = 'breath-ring';
    }
  }

  // Phases: 4s inhale, 4s hold, 4s exhale, 4s hold = 16s cycle
  // Run for ~60s (≈ 3.75 cycles)
  const PHASES = [
    { label: 'Inhale',  cls: 'expand',   dur: 4000 },
    { label: 'Hold',    cls: 'hold',      dur: 4000 },
    { label: 'Exhale',  cls: 'contract',  dur: 4000 },
    { label: 'Hold',    cls: 'hold',      dur: 4000 }
  ];

  function startBreathing() {
    breathRunning = true;
    const ring = document.getElementById('breath-ring');
    const label = document.getElementById('breath-label');
    const status = document.getElementById('breath-status');
    const total = 64000; // ~4 full cycles = 64s
    let elapsed = 0;
    let phase = 0;
    let countdown = 3;

    // Countdown first
    if (status) status.textContent = `Starting in ${countdown}...`;
    if (label) label.textContent = '🧘';

    const countInterval = setInterval(() => {
      countdown--;
      if (status) status.textContent = countdown > 0 ? `Starting in ${countdown}...` : 'Begin...';
      if (countdown <= 0) {
        clearInterval(countInterval);
        if (!breathRunning) return;
        runCycle();
      }
    }, 1000);

    function runCycle() {
      if (!breathRunning) return;
      const p = PHASES[phase % PHASES.length];

      if (ring) {
        ring.className = 'breath-ring';
        void ring.offsetWidth; // force reflow
        ring.classList.add(p.cls);
        ring.style.animationDuration = p.dur + 'ms';
      }
      if (label) label.textContent = p.label;

      elapsed += p.dur;
      const secLeft = Math.ceil((total - elapsed) / 1000);
      if (status) status.textContent = secLeft > 0 ? `${secLeft}s remaining` : 'Complete ✨';

      if (elapsed >= total) {
        breathRunning = false;
        if (label) label.textContent = '✨';
        if (status) status.textContent = 'Session complete. Well done.';
        return;
      }

      phase++;
      breathTimer = setTimeout(runCycle, p.dur);
    }
  }

  // ── Init ────────────────────────────────────────────────────
  function init() {
    renderResources();
    if (initialized) return;
    initialized = true;

    // Open breath from header button
    document.getElementById('open-breath')?.addEventListener('click', openBreathing);

    // Close breath
    document.getElementById('breath-close')?.addEventListener('click', closeBreathing);
    document.getElementById('breath-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'breath-overlay') closeBreathing();
    });
  }

  return { init, openBreathing };
})();

window.ResourcesModule = ResourcesModule;

// Allow breathing to be opened from anywhere
window.openBreathing = ResourcesModule.openBreathing;
