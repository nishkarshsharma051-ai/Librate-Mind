/* ════════════════════════════════════════════════════════════
   js/escalation.js — Auto-escalation engine
   ONLY triggers for severe tech addiction signals.
   NOT for general mental health crises.
═══════════════════════════════════════════════════════════ */

const EscalationModule = (() => {
  // Keywords specific to SEVERE digital/tech addiction distress
  const CRISIS_KEYWORDS = [
    'can\'t stop', 'cant stop', 'addicted', 'out of control', 'no control',
    'trapped', 'can\'t put it down', 'cant put it down', 'obsessed', 'compulsive',
    'losing my mind', 'losing sleep every night', 'phone controls me',
    'screen is destroying', 'completely hooked', 'need help', 'please help',
    'can\'t function', 'cant function', 'paralyzed', 'panic without my phone',
    'withdrawal', 'everything is the phone', 'ruining my life', 'ruining my relationships'
  ];

  function isOpen() {
    const overlay = document.getElementById('escalation-overlay');
    return overlay && !overlay.classList.contains('hidden');
  }

  function show() {
    if (isOpen()) return;
    document.getElementById('escalation-overlay')?.classList.remove('hidden');
    document.getElementById('esc-close')?.addEventListener('click', hide, { once: true });
    document.getElementById('escalation-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'escalation-overlay') hide();
    }, { once: true });
  }

  function hide() {
    document.getElementById('escalation-overlay')?.classList.add('hidden');
  }

  function evaluate() {
    const checkins = DB.getCheckins();
    if (checkins.length === 0) return;

    const latest = checkins[checkins.length - 1];

    // Rule 1: Single catastrophically low score
    if (latest.score <= 15) {
      show();
      return;
    }

    // Rule 2: 3+ consecutive very low scores (score <= 30)
    if (checkins.length >= 3) {
      const last3 = checkins.slice(-3);
      if (last3.every(ci => ci.score <= 30)) {
        show();
        return;
      }
    }

    // Rule 3: Extreme individual indicators
    // Screen time >= 14h AND phone checks >= 150
    if (latest.screen >= 14 && latest.checks >= 150) {
      show();
      return;
    }
  }

  function checkPostContent(text) {
    if (!text) return;
    const lower = text.toLowerCase();
    const matches = CRISIS_KEYWORDS.filter(kw => lower.includes(kw));
    // Only trigger if 2+ crisis keywords found (avoid false positives)
    if (matches.length >= 2) {
      setTimeout(show, 1000); // small delay for UX
    }
  }

  // Bind close button on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('esc-close')?.addEventListener('click', hide);
  });

  return { evaluate, checkPostContent, show };
})();

window.EscalationModule = EscalationModule;
