/* ════════════════════════════════════════════════════════════
   js/app.js — Router & global state
═══════════════════════════════════════════════════════════ */

const App = {
  currentView: 'landing',
  initialized: false,

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // Bind nav buttons (header + mobile)
    document.querySelectorAll('.nav-btn, [data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        if (view) App.navigate(view);
      });
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
      });
    }

    // Category cards on landing → navigate to feed with filter
    document.querySelectorAll('.cat-card[data-category]').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-category');
        App.navigate('feed', cat);
      });
    });

    // Update category post counts
    this.updateCatCounts();

    // Inject SVG gradient for ring
    const svg = document.querySelector('.score-ring');
    if (svg) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
      defs.innerHTML = `<linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e8e8e8"/>
        <stop offset="100%" stop-color="#606060"/>
      </linearGradient>`;
      svg.prepend(defs);
    }
  },

  navigate(view, filter) {
    // Hide all views
    document.querySelectorAll('.view').forEach(v => {
      v.classList.remove('active');
      v.classList.add('hidden');
    });

    // Show target view
    const target = document.getElementById(`view-${view}`);
    if (!target) return;
    target.classList.remove('hidden');
    target.classList.add('active');
    this.currentView = view;

    // Update nav button active state (desktop + mobile)
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === view);
    });

    // Close mobile nav
    document.getElementById('mobile-nav')?.classList.add('hidden');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger view-specific init
    if (view === 'feed') {
      window.FeedModule?.init(filter || null);
    } else if (view === 'checkin') {
      window.CheckinModule?.init();
    } else if (view === 'chat') {
      window.ChatModule?.init();
    } else if (view === 'resources') {
      window.ResourcesModule?.init();
    } else if (view === 'landing') {
      window.FeedModule?.renderPreview();
      this.updateCatCounts();
    }
  },

  updateCatCounts() {
    const posts = DB.getPosts();
    const cats = ['phone-addiction','social-media-anxiety','notification-fatigue','burnout'];
    cats.forEach(cat => {
      const el = document.getElementById(`count-${cat}`);
      if (el) {
        const count = posts.filter(p => p.category === cat).length;
        el.textContent = `${count} ${count === 1 ? 'story' : 'stories'}`;
      }
    });
  }
};

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  // Render landing preview immediately
  window.FeedModule?.renderPreview();
});
