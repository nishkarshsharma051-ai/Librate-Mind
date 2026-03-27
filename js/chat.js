/* ════════════════════════════════════════════════════════════
   js/chat.js — Anonymous Peer Support Chat
═══════════════════════════════════════════════════════════ */

const ChatModule = (() => {
  let currentRoom = 'general';
  let initialized = false;

  const PEER_RESPONSES = {
    general: [
      "You're not alone in this. I've been through something similar with my own screen habits.",
      "That takes courage to share. What's been the hardest part for you?",
      "I hear you. Have you tried setting a specific time each day to check your phone?",
      "Thanks for sharing. The community here really does understand what you're going through.",
      "That's a real struggle. Small steps — even 15 minutes phone-free — can start to shift things.",
      "I went through a similar spiral. What helped me was writing down 3 things I wanted to do offline.",
    ],
    phone: [
      "The phantom vibration thing is SO real. It took me weeks to stop feeling it.",
      "I deleted all the apps off my home screen — just having the extra tap to open them slowed me down a lot.",
      "Grayscale mode on the phone actually works. It's not a magic fix, but it makes the screen less appealing.",
      "Try putting your phone across the room when you study. Physical distance genuinely helps.",
      "I set my phone to 'focus mode' from 10pm to 8am. Took some getting used to but worth it.",
    ],
    social: [
      "The comparison trap is the worst part. Remember: you're comparing your real life to their highlight reel.",
      "Taking breaks from Instagram genuinely helped my anxiety. 3 days is all it takes to feel the difference.",
      "FOMO is literally a product feature, not your personality. You're not broken for feeling it.",
      "I muted basically everyone for a while — still 'on' social media but not seeing the triggering stuff.",
      "What helped me: unfollowing anyone who consistently made me feel bad, even if it felt 'rude'.",
    ],
    detox: [
      "Day 3 of my detox and honestly it felt like caffeine withdrawal. But I made it through.",
      "Replace the scroll habit with something physical — even just a walk to get water. It breaks the loop.",
      "Detox is hard. Be patient with yourself. Slip-ups are part of the process.",
      "I journal every morning and it's replaced my urge to check social media right after waking up.",
      "Two weeks screen-free on weekends changed my entire perspective on how I was using my phone.",
    ]
  };

  const ROOM_SEEDS = {
    general: [
      { name: randomPeerName(), avatar: randomAvatar(), text: 'Anyone else feel like they can\'t focus anymore? My attention span is basically 30 seconds.', mine: false, ts: Date.now() - 600000 },
      { name: randomPeerName(), avatar: randomAvatar(), text: 'Yes, absolutely. I started a \'no phone until noon\' rule and it\'s slowly helping.', mine: false, ts: Date.now() - 480000 },
    ],
    phone: [
      { name: randomPeerName(), avatar: randomAvatar(), text: 'I checked my screen time. 8.5 hours yesterday. I genuinely didn\'t notice.', mine: false, ts: Date.now() - 900000 },
      { name: randomPeerName(), avatar: randomAvatar(), text: 'I know that feeling. I set a 4h daily limit and it showed me how dependent I was.', mine: false, ts: Date.now() - 780000 },
    ],
    social: [
      { name: randomPeerName(), avatar: randomAvatar(), text: 'I deleted TikTok three weeks ago. I have so much free time now it\'s almost uncomfortable.', mine: false, ts: Date.now() - 1200000 },
      { name: randomPeerName(), avatar: randomAvatar(), text: 'Uncomfortable is the right word. We\'re so used to filling every second, silence feels wrong.', mine: false, ts: Date.now() - 1060000 },
    ],
    detox: [
      { name: randomPeerName(), avatar: randomAvatar(), text: 'Starting a 7-day no-social challenge tomorrow. Anyone want to do it together?', mine: false, ts: Date.now() - 300000 },
      { name: randomPeerName(), avatar: randomAvatar(), text: 'I\'m in. Accountability makes it easier. Check in here daily?', mine: false, ts: Date.now() - 240000 },
    ]
  };

  function renderMessage(msg) {
    return `<div class="chat-msg${msg.mine ? ' mine' : ''}">
      <div class="msg-avatar">${msg.mine ? '🧘' : msg.avatar}</div>
      <div class="msg-content">
        <div class="msg-name">${msg.mine ? 'You' : msg.name}</div>
        <div class="msg-bubble">${msg.text}</div>
      </div>
    </div>`;
  }

  function loadRoom(room) {
    currentRoom = room;
    const container = document.getElementById('chat-messages');
    if (!container) return;

    // Update room button active states
    document.querySelectorAll('.room-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-room') === room);
    });

    // Load stored messages + seed
    const stored = DB.getChatMessages(room);
    const seeds = ROOM_SEEDS[room] || [];
    const allMessages = stored.length > 0 ? stored : seeds;

    container.innerHTML = allMessages.map(m => renderMessage(m)).join('');
    container.scrollTop = container.scrollHeight;
  }

  function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const msg = { name: 'You', avatar: '🧘', text, mine: true, ts: Date.now() };
    DB.addChatMessage(currentRoom, msg);

    const container = document.getElementById('chat-messages');
    container.insertAdjacentHTML('beforeend', renderMessage(msg));
    container.scrollTop = container.scrollHeight;
    input.value = '';

    // Simulate peer response
    simulatePeerResponse();
  }

  function simulatePeerResponse() {
    const typingEl = document.getElementById('typing-indicator');
    const typingName = document.getElementById('typing-name');
    const peer = { name: randomPeerName(), avatar: randomAvatar() };

    if (typingName) typingName.textContent = peer.name;
    typingEl?.classList.remove('hidden');

    const delay = 1500 + Math.random() * 2000;
    setTimeout(() => {
      typingEl?.classList.add('hidden');
      const responses = PEER_RESPONSES[currentRoom] || PEER_RESPONSES.general;
      const text = responses[Math.floor(Math.random() * responses.length)];
      const peerMsg = { name: peer.name, avatar: peer.avatar, text, mine: false, ts: Date.now() };
      DB.addChatMessage(currentRoom, peerMsg);

      const container = document.getElementById('chat-messages');
      container.insertAdjacentHTML('beforeend', renderMessage(peerMsg));
      container.scrollTop = container.scrollHeight;
    }, delay);
  }

  function updateOnlineCount() {
    const el = document.getElementById('online-count');
    if (el) {
      const base = 8;
      const count = base + Math.floor(Math.random() * 18);
      el.textContent = `${count} peers online`;
    }
  }

  function init() {
    loadRoom(currentRoom);
    updateOnlineCount();
    if (initialized) return;
    initialized = true;

    // Room switching
    document.querySelectorAll('.room-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const room = btn.getAttribute('data-room');
        if (room) loadRoom(room);
      });
    });

    // Send on button click
    document.getElementById('chat-send')?.addEventListener('click', sendMessage);

    // Send on Enter
    document.getElementById('chat-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
  }

  return { init };
})();

window.ChatModule = ChatModule;
