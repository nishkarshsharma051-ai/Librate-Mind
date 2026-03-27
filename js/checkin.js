/* ════════════════════════════════════════════════════════════
   js/checkin.js — Daily Digital Wellness Check-in
═══════════════════════════════════════════════════════════ */

const CheckinModule = (() => {
  let initialized = false;

  function computeScore({ screen, mood, stress, checks }) {
    // screen: 0–16h (lower is better)
    const screenScore = Math.max(0, 100 - (screen / 16) * 100);
    // mood: 1–10 (higher is better)
    const moodScore = (mood / 10) * 100;
    // stress: 1–10 (lower is better)
    const stressScore = Math.max(0, 100 - ((stress - 1) / 9) * 100);
    // checks: 0–200 (lower is better)
    const checksScore = Math.max(0, 100 - (checks / 200) * 100);

    const score = Math.round(screenScore * 0.3 + moodScore * 0.3 + stressScore * 0.25 + checksScore * 0.15);
    return Math.min(100, Math.max(0, score));
  }

  function scoreStatus(score) {
    if (score >= 80) return { label: 'Thriving 🌿', color: '#7cffa0' };
    if (score >= 60) return { label: 'Doing okay 🌤', color: '#c0c0c0' };
    if (score >= 40) return { label: 'Struggling a bit 🌧', color: '#ffbc7c' };
    if (score >= 20) return { label: 'Under pressure 🌩', color: '#ff7c7c' };
    return { label: 'Critical — reach out 🆘', color: '#ff4444' };
  }

  function updateRing(score) {
    const fill = document.getElementById('ring-fill');
    if (!fill) return;
    const circumference = 314;
    const offset = circumference - (score / 100) * circumference;
    fill.style.strokeDashoffset = offset;

    const status = scoreStatus(score);
    const display = document.getElementById('score-display');
    if (display) display.textContent = score;

    const statusEl = document.getElementById('score-status');
    if (statusEl) { statusEl.textContent = status.label; statusEl.style.color = status.color; }
  }

  function renderHistory() {
    const histEl = document.getElementById('score-history');
    if (!histEl) return;
    const checkins = DB.getCheckins().slice(-7);

    if (checkins.length === 0) {
      histEl.innerHTML = '<span style="font-size:11px;color:var(--silver-mute);">No history yet</span>';
      return;
    }

    histEl.innerHTML = checkins.map(ci => {
      const pct = (ci.score / 100) * 100;
      const status = scoreStatus(ci.score);
      return `<div class="history-bar filled" style="height:${Math.max(8, pct * 0.44)}px;background:${status.color};opacity:0.7;" title="${ci.score} — ${timeAgo(ci.ts)}"></div>`;
    }).join('') + '<div style="width:100%;font-size:10px;color:var(--silver-mute);margin-top:6px;text-align:center;">Last 7 check-ins</div>';
  }

  function updateStreak() {
    const checkins = DB.getCheckins();
    const streakEl = document.getElementById('streak-num');
    if (!streakEl) return;

    let streak = 0;
    const today = new Date().toDateString();
    let lastDay = null;

    for (let i = checkins.length - 1; i >= 0; i--) {
      const day = new Date(checkins[i].ts).toDateString();
      if (!lastDay) {
        if (day === today || day === new Date(Date.now() - 86400000).toDateString()) {
          lastDay = day; streak = 1;
        } else break;
      } else {
        const prev = new Date(new Date(lastDay).getTime() - 86400000).toDateString();
        if (day === prev) { streak++; lastDay = day; }
        else break;
      }
    }
    streakEl.textContent = streak;
  }

  function init() {
    // Bind slider live updates
    const sliders = [
      { id: 'sl-screen', valId: 'sl-screen-val', fmt: v => `${parseFloat(v)}h` },
      { id: 'sl-mood',   valId: 'sl-mood-val',   fmt: v => v },
      { id: 'sl-stress', valId: 'sl-stress-val', fmt: v => v },
      { id: 'sl-checks', valId: 'sl-checks-val', fmt: v => `${v}×` }
    ];

    sliders.forEach(({ id, valId, fmt }) => {
      const input = document.getElementById(id);
      const display = document.getElementById(valId);
      if (!input || !display) return;
      display.textContent = fmt(input.value);
      input.addEventListener('input', () => { display.textContent = fmt(input.value); });
    });

    // Today's check-in already submitted?
    const checkins = DB.getCheckins();
    const todayCheckin = checkins.find(ci => new Date(ci.ts).toDateString() === new Date().toDateString());
    if (todayCheckin) {
      updateRing(todayCheckin.score);
    }

    renderHistory();
    updateStreak();

    if (initialized) return;
    initialized = true;

    // Form submit
    const form = document.getElementById('checkin-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const screen = parseFloat(document.getElementById('sl-screen').value);
      const mood   = parseInt(document.getElementById('sl-mood').value);
      const stress = parseInt(document.getElementById('sl-stress').value);
      const checks = parseInt(document.getElementById('sl-checks').value);
      const note   = document.getElementById('checkin-note')?.value.trim();

      const score = computeScore({ screen, mood, stress, checks });
      const ci = { score, screen, mood, stress, checks, note, ts: Date.now() };

      DB.addCheckin(ci);
      updateRing(score);
      renderHistory();
      updateStreak();

      showToast(`✅ Check-in saved! Wellness score: ${score}`);

      // Trigger escalation module
      window.EscalationModule?.evaluate();
    });
  }

  return { init };
})();

window.CheckinModule = CheckinModule;
