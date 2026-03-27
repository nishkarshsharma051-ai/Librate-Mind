/* ════════════════════════════════════════════════════════════
   js/feed.js — Community Feed
═══════════════════════════════════════════════════════════ */

const FeedModule = (() => {
  let activeFilter = 'all';
  let activeSort = 'recent';

  function renderPost(post, compact = false) {
    const meta = CAT_META[post.category] || { label: post.category, emoji: '💬' };
    const avatarEl = `<div class="post-avatar">${post.avatar}</div>`;
    const authorEl = `<div class="post-meta">
      <div class="post-author">${post.anon ? 'Anonymous Peer' : post.author}</div>
      <div class="post-time">${timeAgo(post.ts)}</div>
    </div>`;
    const tagEl = `<div class="post-category-tag">${meta.emoji} ${meta.label}</div>`;

    if (compact) {
      return `
        <div class="post-card" data-cat="${post.category}" data-id="${post.id}">
          <div class="post-header">${avatarEl}${authorEl}${tagEl}</div>
          ${post.title ? `<div class="post-title">${post.title}</div>` : ''}
          <div class="post-body">${post.body.substring(0,100)}…</div>
          <div class="post-footer">
            <button class="reaction-btn${post.reacted ? ' reacted' : ''}" data-id="${post.id}">
              <span class="reaction-icon">💙</span>
              <span class="reaction-count">${post.reactions} felt this</span>
            </button>
          </div>
        </div>`;
    }

    return `
      <div class="post-card" data-cat="${post.category}" data-id="${post.id}" role="article">
        <div class="post-header">${avatarEl}${authorEl}${tagEl}</div>
        ${post.title ? `<div class="post-title">${post.title}</div>` : ''}
        <div class="post-body">${post.body}</div>
        <div class="post-footer">
          <button class="reaction-btn${post.reacted ? ' reacted' : ''}" data-id="${post.id}" aria-label="React to this post">
            <span class="reaction-icon">💙</span>
            <span class="reaction-count">${post.reactions} felt this</span>
          </button>
        </div>
      </div>`;
  }

  function getFilteredPosts() {
    let posts = DB.getPosts();
    if (activeFilter !== 'all') posts = posts.filter(p => p.category === activeFilter);
    if (activeSort === 'reactions') posts = [...posts].sort((a,b) => b.reactions - a.reactions);
    else posts = [...posts].sort((a,b) => b.ts - a.ts);
    return posts;
  }

  function renderFeed() {
    const container = document.getElementById('feed-container');
    if (!container) return;
    const posts = getFilteredPosts();

    if (posts.length === 0) {
      container.innerHTML = `<div class="empty-state">
        <span class="empty-state-icon">🕊️</span>
        <p>No posts yet in this category.<br/>Be the first to share your story.</p>
      </div>`;
      return;
    }

    container.innerHTML = posts.map(p => renderPost(p)).join('');
    bindReactions(container);
  }

  function renderPreview() {
    const container = document.getElementById('landing-preview');
    if (!container) return;
    const posts = DB.getPosts().slice(0, 3);
    container.innerHTML = posts.map(p => renderPost(p, true)).join('');
    bindReactions(container);
  }

  function bindReactions(container) {
    container.querySelectorAll('.reaction-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const post = DB.reactPost(id);
        if (!post) return;
        const countEl = btn.querySelector('.reaction-count');
        if (countEl) countEl.textContent = `${post.reactions} felt this`;
        btn.classList.toggle('reacted', post.reacted);
        if (post.reacted) showToast('💙 You felt this');
      });
    });
  }

  function openPostModal() {
    document.getElementById('post-overlay')?.classList.remove('hidden');
  }

  function closePostModal() {
    document.getElementById('post-overlay')?.classList.add('hidden');
    const form = document.getElementById('post-body');
    if (form) form.value = '';
    const titleInput = document.getElementById('post-title-input');
    if (titleInput) titleInput.value = '';
  }

  function submitPost() {
    const category = document.getElementById('post-category')?.value;
    const title = document.getElementById('post-title-input')?.value.trim();
    const body = document.getElementById('post-body')?.value.trim();
    const anon = document.getElementById('post-anon')?.checked;

    if (!body || body.length < 10) {
      showToast('Please write at least a few words to share.');
      return;
    }

    const post = {
      id: 'p' + Date.now(),
      category,
      title,
      body,
      author: anon ? 'Anonymous Peer' : randomPeerName(),
      avatar: randomAvatar(),
      anon,
      reactions: 0,
      reacted: false,
      ts: Date.now()
    };

    DB.addPost(post);
    closePostModal();
    App.updateCatCounts();
    renderFeed();
    showToast('✨ Your story has been shared');

    // Check for escalation keywords in post content
    window.EscalationModule?.checkPostContent(body);
  }

  function init(filterOverride) {
    if (filterOverride) {
      activeFilter = filterOverride;
      document.querySelectorAll('.chip').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-filter') === filterOverride);
      });
    }
    renderFeed();

    // Filter chips
    document.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        activeFilter = chip.getAttribute('data-filter') || 'all';
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderFeed();
      });
    });

    // Sort
    const sortEl = document.getElementById('feed-sort');
    if (sortEl) {
      sortEl.value = activeSort;
      sortEl.addEventListener('change', () => {
        activeSort = sortEl.value;
        renderFeed();
      });
    }

    // Open post modal
    document.getElementById('open-post-modal')?.addEventListener('click', openPostModal);
    document.getElementById('post-close')?.addEventListener('click', closePostModal);
    document.getElementById('post-submit')?.addEventListener('click', submitPost);

    // Close on overlay click
    document.getElementById('post-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'post-overlay') closePostModal();
    });
  }

  return { init, renderPreview };
})();

window.FeedModule = FeedModule;
