/**
 * avatar.js — Full Avatar Customizer
 * Canvas-based layered rendering system
 * Categories: Skin, Hair, Outfit, Pants, Shoes, Accessories, Cape, Background
 */

// ─────────────────────────────────────────
// AVATAR DATA CATALOG
// ─────────────────────────────────────────

const AVATAR_DATA = {

  skin: [
    { id: 'sk1', name: 'Fair', color: '#FDDCB5', locked: false },
    { id: 'sk2', name: 'Light', color: '#F4C28A', locked: false },
    { id: 'sk3', name: 'Medium', color: '#D4956A', locked: false },
    { id: 'sk4', name: 'Tan', color: '#C07840', locked: false },
    { id: 'sk5', name: 'Brown', color: '#8D5524', locked: false },
    { id: 'sk6', name: 'Deep', color: '#4A2912', locked: false },
    { id: 'sk7', name: 'Pale', color: '#F9EED6', locked: false },
    { id: 'sk8', name: 'Golden', color: '#E8B86D', locked: false },
    { id: 'sk9', name: 'Olive', color: '#A67C52', locked: false },
    { id: 'sk10', name: 'Ebony', color: '#2C1A0E', locked: false },
    { id: 'sk11', name: 'Rosy', color: '#F0A8A8', locked: true, cost: 50 },
    { id: 'sk12', name: 'Cyber Blue', color: '#5BB8E8', locked: true, cost: 150 },
  ],

  hair: [
    { id: 'h1',  name: 'Short Spiky',  emoji: '🦔', shape: 'spiky',   color: '#2C1810', locked: false },
    { id: 'h2',  name: 'Long Wavy',    emoji: '👱', shape: 'wavy',    color: '#8B6914', locked: false },
    { id: 'h3',  name: 'Afro',         emoji: '✊', shape: 'afro',    color: '#1A0A00', locked: false },
    { id: 'h4',  name: 'Bun',          emoji: '👸', shape: 'bun',     color: '#4A3728', locked: false },
    { id: 'h5',  name: 'Mohawk',       emoji: '🤘', shape: 'mohawk',  color: '#8B0000', locked: false },
    { id: 'h6',  name: 'Curly',        emoji: '🌀', shape: 'curly',   color: '#5C3D2E', locked: false },
    { id: 'h7',  name: 'Straight Long',emoji: '💁', shape: 'straight',color: '#1C1C1C', locked: false },
    { id: 'h8',  name: 'Undercut',     emoji: '💈', shape: 'undercut',color: '#3D2B1F', locked: false },
    { id: 'h9',  name: 'Ponytail',     emoji: '🐎', shape: 'ponytail',color: '#C8A96E', locked: false },
    { id: 'h10', name: 'Bald',         emoji: '🥚', shape: 'bald',    color: 'none',    locked: false },
    { id: 'h11', name: 'Rainbow',      emoji: '🌈', shape: 'spiky',   color: 'rainbow', locked: true, cost: 200 },
    { id: 'h12', name: 'Neon Purple',  emoji: '💜', shape: 'wavy',    color: '#9B59B6', locked: true, cost: 120 },
    { id: 'h13', name: 'Cyber Pink',   emoji: '💗', shape: 'mohawk',  color: '#FF69B4', locked: true, cost: 150 },
    { id: 'h14', name: 'White Silver', emoji: '🤍', shape: 'straight',color: '#D8D8D8', locked: true, cost: 100 },
  ],

  outfit: [
    { id: 'o1',  name: 'Coder Tee',      emoji: '👕', color: '#4A4A6A', accent: '#7C3AED', locked: false },
    { id: 'o2',  name: 'Hoodie',         emoji: '🧥', color: '#2D2D2D', accent: '#555',    locked: false },
    { id: 'o3',  name: 'Flannel',        emoji: '🟥', color: '#8B2020', accent: '#C8A96E', locked: false },
    { id: 'o4',  name: 'Tank Top',       emoji: '🏋', color: '#1A3A5C', accent: '#2980B9', locked: false },
    { id: 'o5',  name: 'Lab Coat',       emoji: '🥼', color: '#F0F0F0', accent: '#CCE5FF', locked: false },
    { id: 'o6',  name: 'Suit Jacket',    emoji: '🤵', color: '#1C1C2E', accent: '#AAA',    locked: false },
    { id: 'o7',  name: 'Wizard Robe',    emoji: '🧙', color: '#3B1D5C', accent: '#9B59B6', locked: true, cost: 200 },
    { id: 'o8',  name: 'Ninja Gi',       emoji: '🥷', color: '#111111', accent: '#333',    locked: true, cost: 180 },
    { id: 'o9',  name: 'Cyber Jacket',   emoji: '🦾', color: '#0A1A2A', accent: '#00BFFF', locked: true, cost: 250 },
    { id: 'o10', name: 'Dragon Armor',   emoji: '🐉', color: '#8B0000', accent: '#FFD700', locked: true, cost: 350 },
    { id: 'o11', name: 'Astronaut Suit', emoji: '🚀', color: '#E8E8E8', accent: '#4A90D9', locked: true, cost: 300 },
    { id: 'o12', name: 'Glitch Shirt',   emoji: '⚡', color: '#1A1A3E', accent: '#00FF88', locked: true, cost: 220 },
  ],

  pants: [
    { id: 'p1',  name: 'Jeans',          emoji: '👖', color: '#3B5998', locked: false },
    { id: 'p2',  name: 'Black Jeans',    emoji: '🖤', color: '#1A1A1A', locked: false },
    { id: 'p3',  name: 'Cargo Shorts',   emoji: '🩳', color: '#6B6B2A', locked: false },
    { id: 'p4',  name: 'Chinos',         emoji: '🏻', color: '#C8A96E', locked: false },
    { id: 'p5',  name: 'Sweatpants',     emoji: '😌', color: '#808080', locked: false },
    { id: 'p6',  name: 'Joggers',        emoji: '🏃', color: '#2C2C2C', locked: false },
    { id: 'p7',  name: 'Formal Slacks',  emoji: '💼', color: '#4A4A6A', locked: false },
    { id: 'p8',  name: 'Ripped Jeans',   emoji: '⚡', color: '#2D4A7A', locked: true, cost: 100 },
    { id: 'p9',  name: 'Neon Pants',     emoji: '💫', color: '#FF1493', locked: true, cost: 180 },
    { id: 'p10', name: 'Armor Greaves',  emoji: '🛡', color: '#808080', locked: true, cost: 250 },
  ],

  shoes: [
    { id: 's1',  name: 'Sneakers',       emoji: '👟', color: '#FFFFFF', locked: false },
    { id: 's2',  name: 'Black Boots',    emoji: '👢', color: '#1A1A1A', locked: false },
    { id: 's3',  name: 'Loafers',        emoji: '🥿', color: '#8B4513', locked: false },
    { id: 's4',  name: 'High-tops',      emoji: '🏀', color: '#CC0000', locked: false },
    { id: 's5',  name: 'Flip Flops',     emoji: '🩴', color: '#4CAF50', locked: false },
    { id: 's6',  name: 'Dress Shoes',    emoji: '👞', color: '#2C1810', locked: false },
    { id: 's7',  name: 'Platform Boots', emoji: '🤘', color: '#9B59B6', locked: true, cost: 120 },
    { id: 's8',  name: 'Cyber Kicks',    emoji: '⚡', color: '#00BFFF', locked: true, cost: 200 },
    { id: 's9',  name: 'Dragon Boots',   emoji: '🐉', color: '#8B0000', locked: true, cost: 280 },
    { id: 's10', name: 'Barefoot',       emoji: '🦶', color: 'none',    locked: false },
  ],

  accessory: [
    { id: 'a0',  name: 'None',           emoji: '✖',  slot: 'none',    locked: false },
    { id: 'a1',  name: 'Glasses',        emoji: '👓',  slot: 'face',    locked: false },
    { id: 'a2',  name: 'Sunglasses',     emoji: '🕶',  slot: 'face',    locked: false },
    { id: 'a3',  name: 'Headphones',     emoji: '🎧',  slot: 'head',    locked: false },
    { id: 'a4',  name: 'Cap',            emoji: '🧢',  slot: 'head',    locked: false },
    { id: 'a5',  name: 'Beanie',         emoji: '🎩',  slot: 'head',    locked: false },
    { id: 'a6',  name: 'Scarf',          emoji: '🧣',  slot: 'neck',    locked: false },
    { id: 'a7',  name: 'Necklace',       emoji: '📿',  slot: 'neck',    locked: false },
    { id: 'a8',  name: 'Watch',          emoji: '⌚',  slot: 'wrist',   locked: false },
    { id: 'a9',  name: 'Wizard Hat',     emoji: '🧙',  slot: 'head',    locked: true, cost: 150 },
    { id: 'a10', name: 'Crown',          emoji: '👑',  slot: 'head',    locked: true, cost: 300 },
    { id: 'a11', name: 'VR Headset',     emoji: '🥽',  slot: 'face',    locked: true, cost: 200 },
    { id: 'a12', name: 'Laurel Wreath',  emoji: '🌿',  slot: 'head',    locked: true, cost: 100 },
    { id: 'a13', name: 'Mask',           emoji: '🎭',  slot: 'face',    locked: true, cost: 120 },
    { id: 'a14', name: 'Star Earrings',  emoji: '⭐',  slot: 'ear',     locked: true, cost: 80  },
  ],

  cape: [
    { id: 'c0',  name: 'None',           emoji: '✖',  color: 'none',   locked: false },
    { id: 'c1',  name: 'Purple Cape',    emoji: '🟣', color: '#7C3AED',locked: false },
    { id: 'c2',  name: 'Red Cape',       emoji: '🔴', color: '#CC0000',locked: false },
    { id: 'c3',  name: 'Blue Cape',      emoji: '🔵', color: '#1A6BC8',locked: false },
    { id: 'c4',  name: 'Black Cloak',    emoji: '🖤', color: '#111111',locked: false },
    { id: 'c5',  name: 'Gold Cape',      emoji: '🥇', color: '#DAA520',locked: true, cost: 150 },
    { id: 'c6',  name: 'Rainbow Cloak',  emoji: '🌈', color: 'rainbow',locked: true, cost: 300 },
    { id: 'c7',  name: 'Dragon Cloak',   emoji: '🐉', color: '#8B0000',locked: true, cost: 280 },
    { id: 'c8',  name: 'Cyber Cape',     emoji: '⚡', color: '#00BFFF',locked: true, cost: 220 },
    { id: 'c9',  name: 'Starfield',      emoji: '🌌', color: '#0D0D2B',locked: true, cost: 350 },
  ],

  bg: [
    { id: 'bg1', name: 'Dark Space',     emoji: '🌌', colors: ['#0F0A1E','#1A0A40'], locked: false },
    { id: 'bg2', name: 'Twilight',       emoji: '🌆', colors: ['#1A0533','#5B2D8E'], locked: false },
    { id: 'bg3', name: 'Ocean',          emoji: '🌊', colors: ['#0C2340','#0E6BA8'], locked: false },
    { id: 'bg4', name: 'Forest',         emoji: '🌲', colors: ['#0A2010','#1A5C28'], locked: false },
    { id: 'bg5', name: 'Sunset',         emoji: '🌅', colors: ['#1A0A00','#8B3A00'], locked: false },
    { id: 'bg6', name: 'Cyber Grid',     emoji: '🔷', colors: ['#030B14','#0D2137'], locked: true, cost: 120 },
    { id: 'bg7', name: 'Neon City',      emoji: '🌃', colors: ['#050514','#1A0533'], locked: true, cost: 180 },
    { id: 'bg8', name: 'Galaxy',         emoji: '🪐', colors: ['#020412','#0B1A40'], locked: true, cost: 250 },
    { id: 'bg9', name: 'Lava',           emoji: '🌋', colors: ['#1A0500','#5C1A00'], locked: true, cost: 200 },
    { id: 'bg10',name: 'Aurora',         emoji: '✨', colors: ['#020A0E','#0A2D1A'], locked: true, cost: 300 },
  ]
};

const AVATAR_PRESETS = [
  {
    id: 'pre1', name: 'Shadow Coder',
    desc: 'Dark, mysterious, efficient',
    locked: false,
    config: { skin: 'sk6', hair: 'h1', outfit: 'o2', pants: 'p2', shoes: 's2', accessory: 'a2', cape: 'c4', bg: 'bg1' }
  },
  {
    id: 'pre2', name: 'Cyber Wizard',
    desc: 'Tech meets magic',
    locked: true, cost: 300,
    config: { skin: 'sk3', hair: 'h11', outfit: 'o7', pants: 'p9', shoes: 's8', accessory: 'a9', cape: 'c8', bg: 'bg6' }
  },
  {
    id: 'pre3', name: 'Dragon Slayer',
    desc: 'Legendary warrior coder',
    locked: true, cost: 500,
    config: { skin: 'sk4', hair: 'h5', outfit: 'o10', pants: 'p10', shoes: 's9', accessory: 'a10', cape: 'c7', bg: 'bg9' }
  },
  {
    id: 'pre4', name: 'Lab Scientist',
    desc: 'Calm, precise, brilliant',
    locked: false,
    config: { skin: 'sk1', hair: 'h4', outfit: 'o5', pants: 'p4', shoes: 's6', accessory: 'a1', cape: 'c0', bg: 'bg3' }
  },
  {
    id: 'pre5', name: 'Street Hacker',
    desc: 'Underground code rebel',
    locked: false,
    config: { skin: 'sk5', hair: 'h8', outfit: 'o1', pants: 'p8', shoes: 's4', accessory: 'a3', cape: 'c1', bg: 'bg7' }
  },
  {
    id: 'pre6', name: 'Astro Coder',
    desc: 'Coding among the stars',
    locked: true, cost: 400,
    config: { skin: 'sk7', hair: 'h14', outfit: 'o11', pants: 'p5', shoes: 's8', accessory: 'a11', cape: 'c9', bg: 'bg8' }
  },
];

// ─────────────────────────────────────────
// AVATAR STATE
// ─────────────────────────────────────────

let avatarConfig = {
  skin: 'sk3',
  hair: 'h1',
  outfit: 'o1',
  pants: 'p1',
  shoes: 's1',
  accessory: 'a0',
  cape: 'c0',
  bg: 'bg1'
};

let currentAvatarCat = 'skin';

function loadAvatarState() {
  const saved = localStorage.getItem('codequest_avatar');
  if (saved) {
    try { Object.assign(avatarConfig, JSON.parse(saved)); } catch(e) {}
  }
}

function saveAvatarState() {
  localStorage.setItem('codequest_avatar', JSON.stringify(avatarConfig));
}

// ─────────────────────────────────────────
// CATEGORY SELECTION
// ─────────────────────────────────────────

function selectAvatarCat(cat, el) {
  currentAvatarCat = cat;
  document.querySelectorAll('.acat').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderAvatarOptions(cat);
}

// ─────────────────────────────────────────
// RENDER OPTIONS GRID
// ─────────────────────────────────────────

function renderAvatarOptions(cat) {
  const grid = document.getElementById('avatarOptionsGrid');
  if (!grid) return;

  const items = AVATAR_DATA[cat] || [];
  grid.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    const isSelected = avatarConfig[cat] === item.id;
    const isLocked = item.locked && !isItemOwned(item.id);

    card.className = `avatar-opt-card${isSelected ? ' selected' : ''}${isLocked ? ' locked' : ''}${cat === 'skin' ? ' skin-swatch' : ''}`;
    card.onclick = () => selectAvatarOption(cat, item.id, isLocked, item);

    let previewContent = '';
    if (cat === 'skin') {
      previewContent = `<div class="opt-preview" style="background:${item.color};border-radius:50%;width:52px;height:52px;border:2px solid rgba(255,255,255,0.2)"></div>`;
    } else if (cat === 'bg') {
      previewContent = `<div class="opt-preview" style="background:linear-gradient(135deg,${item.colors[0]},${item.colors[1]});font-size:22px">${item.emoji}</div>`;
    } else if (cat === 'hair' && item.color && item.color !== 'none') {
      const displayColor = item.color === 'rainbow' ? 'linear-gradient(135deg,#FF0000,#FF7700,#FFFF00,#00FF00,#0000FF,#8B00FF)' : item.color;
      const bgStyle = item.color === 'rainbow' ? `background:${displayColor}` : `background:${item.color}`;
      previewContent = `<div class="opt-preview" style="${bgStyle};font-size:22px">${item.emoji}</div>`;
    } else {
      const bg = item.color && item.color !== 'none'
        ? `background:${item.color}`
        : 'background:var(--surface2)';
      previewContent = `<div class="opt-preview" style="${bg}">${item.emoji}</div>`;
    }

    card.innerHTML = `
      ${previewContent}
      <div class="opt-name">${item.name}</div>
      ${isSelected ? '<div class="opt-selected-badge">ON</div>' : ''}
      ${isLocked ? `<div class="opt-lock-icon">🔒</div><div class="opt-cost">🪙${item.cost}</div>` : ''}
    `;

    grid.appendChild(card);
  });
}

function selectAvatarOption(cat, id, isLocked, item) {
  if (isLocked) {
    if (typeof appState !== 'undefined' && appState.coins >= item.cost) {
      appState.coins -= item.cost;
      if (typeof updateHeader === 'function') updateHeader();
      if (typeof saveState === 'function') saveState();
      if (typeof showToast === 'function') showToast(`🎉 Unlocked ${item.name}!`, 'success');
      item.locked = false; // unlock in session
    } else {
      if (typeof showToast === 'function') showToast(`🔒 Need 🪙${item.cost} coins to unlock!`, 'error');
      return;
    }
  }
  avatarConfig[cat] = id;
  renderAvatarOptions(cat);
  drawAvatar(document.getElementById('avatarCanvas'), avatarConfig);
  updateSidebarAvatar();
}

function isItemOwned(id) { return false; } // simplified — extend with real store ownership

// ─────────────────────────────────────────
// CANVAS AVATAR RENDERER
// ─────────────────────────────────────────

function drawAvatar(canvas, cfg) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const skin = AVATAR_DATA.skin.find(s => s.id === cfg.skin) || AVATAR_DATA.skin[0];
  const hair = AVATAR_DATA.hair.find(h => h.id === cfg.hair) || AVATAR_DATA.hair[0];
  const outfit = AVATAR_DATA.outfit.find(o => o.id === cfg.outfit) || AVATAR_DATA.outfit[0];
  const pants = AVATAR_DATA.pants.find(p => p.id === cfg.pants) || AVATAR_DATA.pants[0];
  const shoes = AVATAR_DATA.shoes.find(s => s.id === cfg.shoes) || AVATAR_DATA.shoes[0];
  const acc = AVATAR_DATA.accessory.find(a => a.id === cfg.accessory) || AVATAR_DATA.accessory[0];
  const cape = AVATAR_DATA.cape.find(c => c.id === cfg.cape) || AVATAR_DATA.cape[0];
  const bg = AVATAR_DATA.bg.find(b => b.id === cfg.bg) || AVATAR_DATA.bg[0];

  // ── BACKGROUND ──
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, bg.colors[0]);
  bgGrad.addColorStop(1, bg.colors[1]);
  ctx.fillStyle = bgGrad;
  roundRect(ctx, 0, 0, W, H, 18);
  ctx.fill();

  // BG decoration dots
  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 2 + 1, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // ── CAPE (behind body) ──
  if (cape.id !== 'c0') {
    drawCape(ctx, W, H, cape);
  }

  // ── BODY ──
  const bodyX = W / 2, bodyY = H * 0.72;
  const bodyW = 56, bodyH = 70;

  // Neck
  ctx.fillStyle = skin.color;
  ctx.beginPath();
  ctx.roundRect(bodyX - 9, H * 0.44, 18, 28, 4);
  ctx.fill();

  // Torso (outfit)
  const outfitGrad = ctx.createLinearGradient(bodyX - bodyW/2, bodyY - bodyH, bodyX + bodyW/2, bodyY);
  outfitGrad.addColorStop(0, lighten(outfit.color, 30));
  outfitGrad.addColorStop(1, outfit.color);
  ctx.fillStyle = outfitGrad;
  ctx.beginPath();
  ctx.roundRect(bodyX - bodyW/2, H * 0.48, bodyW, bodyH * 0.65, [6, 6, 0, 0]);
  ctx.fill();

  // Outfit accent stripe
  ctx.fillStyle = outfit.accent;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.roundRect(bodyX - 4, H * 0.50, 8, 24, 3);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Arms
  drawArms(ctx, bodyX, H * 0.50, skin.color, outfit.color);

  // Pants
  if (pants.color !== 'none') {
    const pantsGrad = ctx.createLinearGradient(0, H * 0.66, 0, H * 0.85);
    pantsGrad.addColorStop(0, lighten(pants.color, 20));
    pantsGrad.addColorStop(1, pants.color);
    ctx.fillStyle = pantsGrad;
    ctx.beginPath();
    ctx.roundRect(bodyX - bodyW/2 + 4, H * 0.66, bodyW - 8, H * 0.2, [0, 0, 4, 4]);
    ctx.fill();

    // Pants divide line
    ctx.strokeStyle = darken(pants.color, 30);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bodyX, H * 0.67);
    ctx.lineTo(bodyX, H * 0.85);
    ctx.stroke();
  }

  // Shoes
  if (shoes.color !== 'none') {
    ctx.fillStyle = shoes.color;
    // Left shoe
    ctx.beginPath();
    ctx.ellipse(bodyX - 14, H * 0.86, 16, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right shoe
    ctx.beginPath();
    ctx.ellipse(bodyX + 14, H * 0.86, 16, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Shoe shine
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.beginPath();
    ctx.ellipse(bodyX - 18, H * 0.845, 6, 3, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(bodyX + 10, H * 0.845, 6, 3, -0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // ── HEAD ──
  const headX = W / 2, headY = H * 0.26;
  const headR = 38;

  // Shadow under head
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(headX, headY + headR + 2, headR * 0.8, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = skin.color;
  ctx.beginPath();
  ctx.arc(headX, headY, headR, 0, Math.PI * 2);
  ctx.fill();

  // Head shading
  const headShade = ctx.createRadialGradient(headX - 12, headY - 12, 4, headX, headY, headR);
  headShade.addColorStop(0, 'rgba(255,255,255,0.2)');
  headShade.addColorStop(1, 'rgba(0,0,0,0.15)');
  ctx.fillStyle = headShade;
  ctx.beginPath();
  ctx.arc(headX, headY, headR, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  ctx.fillStyle = skin.color;
  ctx.beginPath(); ctx.arc(headX - headR + 2, headY + 4, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(headX + headR - 2, headY + 4, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = darken(skin.color, 15);
  ctx.beginPath(); ctx.arc(headX - headR + 3, headY + 5, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(headX + headR - 3, headY + 5, 5, 0, Math.PI * 2); ctx.fill();

  // Eyes
  drawEyes(ctx, headX, headY, skin.color);

  // Nose
  ctx.strokeStyle = darken(skin.color, 25);
  ctx.lineWidth = 1.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(headX, headY + 2);
  ctx.quadraticCurveTo(headX + 7, headY + 12, headX + 4, headY + 16);
  ctx.stroke();

  // Mouth (smile)
  ctx.strokeStyle = darken(skin.color, 35);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(headX, headY + 20, 12, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // ── HAIR ──
  if (hair.id !== 'h10') {
    drawHair(ctx, headX, headY, headR, hair);
  }

  // ── ACCESSORY ──
  if (acc.id !== 'a0') {
    drawAccessory(ctx, headX, headY, headR, acc);
  }
}

// ── DRAW HELPERS ──

function drawArms(ctx, cx, torsoTop, skinColor, outfitColor) {
  // Left arm
  ctx.fillStyle = outfitColor;
  ctx.beginPath();
  ctx.roundRect(cx - 44, torsoTop, 16, 52, 6);
  ctx.fill();
  // Left hand
  ctx.fillStyle = skinColor;
  ctx.beginPath();
  ctx.arc(cx - 36, torsoTop + 56, 10, 0, Math.PI * 2);
  ctx.fill();

  // Right arm
  ctx.fillStyle = outfitColor;
  ctx.beginPath();
  ctx.roundRect(cx + 28, torsoTop, 16, 52, 6);
  ctx.fill();
  // Right hand
  ctx.fillStyle = skinColor;
  ctx.beginPath();
  ctx.arc(cx + 36, torsoTop + 56, 10, 0, Math.PI * 2);
  ctx.fill();
}

function drawEyes(ctx, hx, hy, skinColor) {
  const eyeY = hy - 8;
  // Whites
  ctx.fillStyle = '#FFFDE8';
  ctx.beginPath(); ctx.ellipse(hx - 14, eyeY, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(hx + 14, eyeY, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
  // Irises
  ctx.fillStyle = '#2C3E6B';
  ctx.beginPath(); ctx.arc(hx - 14, eyeY, 5.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(hx + 14, eyeY, 5.5, 0, Math.PI * 2); ctx.fill();
  // Pupils
  ctx.fillStyle = '#0A0A0A';
  ctx.beginPath(); ctx.arc(hx - 14, eyeY, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(hx + 14, eyeY, 3, 0, Math.PI * 2); ctx.fill();
  // Shine
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath(); ctx.arc(hx - 11, eyeY - 2.5, 1.8, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(hx + 17, eyeY - 2.5, 1.8, 0, Math.PI * 2); ctx.fill();
  // Brows
  ctx.strokeStyle = darken(skinColor, 40);
  ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(hx - 22, eyeY - 12); ctx.quadraticCurveTo(hx - 14, eyeY - 16, hx - 6, eyeY - 12); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(hx + 6,  eyeY - 12); ctx.quadraticCurveTo(hx + 14, eyeY - 16, hx + 22, eyeY - 12); ctx.stroke();
}

function drawHair(ctx, hx, hy, hr, hair) {
  const c = hair.color;
  if (c === 'none') return;

  let fillStyle;
  if (c === 'rainbow') {
    const rg = ctx.createLinearGradient(hx - hr, hy - hr, hx + hr, hy + hr);
    rg.addColorStop(0, '#FF0000'); rg.addColorStop(0.2, '#FF7700');
    rg.addColorStop(0.4, '#FFFF00'); rg.addColorStop(0.6, '#00DD00');
    rg.addColorStop(0.8, '#0000FF'); rg.addColorStop(1, '#8B00FF');
    fillStyle = rg;
  } else {
    fillStyle = c;
  }
  ctx.fillStyle = fillStyle;

  switch (hair.shape) {
    case 'spiky':
      ctx.beginPath();
      ctx.arc(hx, hy - 4, hr + 2, Math.PI, 0);
      ctx.fill();
      // Spikes
      for (let i = -3; i <= 3; i++) {
        const angle = (i / 4) * (Math.PI * 0.7) - Math.PI / 2;
        const bx = hx + Math.cos(angle) * (hr + 2);
        const by = hy + Math.sin(angle) * (hr + 2);
        ctx.beginPath();
        ctx.moveTo(bx - 8, by + 5);
        ctx.lineTo(bx, by - 20);
        ctx.lineTo(bx + 8, by + 5);
        ctx.fill();
      }
      break;
    case 'wavy':
      ctx.beginPath();
      ctx.arc(hx, hy - 2, hr + 4, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(hx - hr - 2, hy - 2);
      ctx.quadraticCurveTo(hx - hr - 14, hy + 30, hx - hr - 6, hy + 65);
      ctx.quadraticCurveTo(hx - hr + 10, hy + 45, hx - hr, hy + 25);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(hx + hr + 2, hy - 2);
      ctx.quadraticCurveTo(hx + hr + 14, hy + 30, hx + hr + 6, hy + 65);
      ctx.quadraticCurveTo(hx + hr - 10, hy + 45, hx + hr, hy + 25);
      ctx.fill();
      break;
    case 'afro':
      ctx.beginPath();
      ctx.arc(hx, hy - 4, hr + 16, 0, Math.PI * 2);
      ctx.fill();
      // Texture bumps
      ctx.fillStyle = darken(c === 'rainbow' ? '#5500CC' : c, 20);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(hx + Math.cos(a) * (hr + 8), hy - 4 + Math.sin(a) * (hr + 8), 6, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case 'bun':
      ctx.beginPath();
      ctx.arc(hx, hy - 2, hr + 2, Math.PI, 0);
      ctx.fill();
      // Bun ball
      ctx.beginPath();
      ctx.arc(hx, hy - hr - 14, 16, 0, Math.PI * 2);
      ctx.fill();
      // Bun highlight
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.arc(hx - 5, hy - hr - 19, 5, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'mohawk':
      ctx.beginPath();
      ctx.arc(hx, hy - 2, hr + 2, Math.PI, 0);
      ctx.fill();
      // Mohawk strip
      ctx.beginPath();
      ctx.moveTo(hx - 10, hy - hr + 4);
      ctx.lineTo(hx - 6, hy - hr - 30);
      ctx.lineTo(hx, hy - hr - 42);
      ctx.lineTo(hx + 6, hy - hr - 30);
      ctx.lineTo(hx + 10, hy - hr + 4);
      ctx.fill();
      break;
    case 'curly':
      ctx.beginPath();
      ctx.arc(hx, hy - 4, hr + 6, Math.PI, 0);
      ctx.fill();
      // Side curls
      for (let side of [-1, 1]) {
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          ctx.arc(hx + side * (hr + 4), hy - 8 + j * 18, 9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    case 'straight':
      ctx.beginPath();
      ctx.arc(hx, hy - 2, hr + 2, Math.PI, 0);
      ctx.fill();
      // Straight falls
      ctx.fillRect(hx - hr - 4, hy - 2, 16, 80);
      ctx.fillRect(hx + hr - 12, hy - 2, 16, 80);
      break;
    case 'undercut':
      ctx.beginPath();
      ctx.arc(hx, hy - 6, hr, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(hx - hr, hy - 10, hr * 2, 14);
      break;
    case 'ponytail':
      ctx.beginPath();
      ctx.arc(hx, hy - 2, hr + 2, Math.PI, 0);
      ctx.fill();
      // Ponytail
      ctx.beginPath();
      ctx.moveTo(hx + hr - 4, hy - 10);
      ctx.quadraticCurveTo(hx + hr + 24, hy + 20, hx + hr + 10, hy + 60);
      ctx.quadraticCurveTo(hx + hr + 6, hy + 45, hx + hr, hy + 25);
      ctx.fill();
      // Band
      ctx.fillStyle = darken(c === 'rainbow' ? '#0055CC' : c, 30);
      ctx.fillRect(hx + hr - 8, hy - 13, 12, 8);
      break;
    default:
      ctx.beginPath();
      ctx.arc(hx, hy - 2, hr + 2, Math.PI, 0);
      ctx.fill();
  }
}

function drawCape(ctx, W, H, cape) {
  let fillStyle;
  if (cape.color === 'rainbow') {
    const rg = ctx.createLinearGradient(0, H * 0.3, W, H);
    rg.addColorStop(0, '#FF0000'); rg.addColorStop(0.2, '#FF7700');
    rg.addColorStop(0.4, '#FFFF00'); rg.addColorStop(0.6, '#00DD00');
    rg.addColorStop(0.8, '#0000FF'); rg.addColorStop(1, '#8B00FF');
    fillStyle = rg;
  } else {
    const cg = ctx.createLinearGradient(W/2 - 50, H * 0.3, W/2 + 50, H);
    cg.addColorStop(0, lighten(cape.color, 30));
    cg.addColorStop(1, cape.color);
    fillStyle = cg;
  }
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 24, H * 0.38);
  ctx.quadraticCurveTo(W / 2 - 70, H * 0.55, W / 2 - 55, H * 0.9);
  ctx.lineTo(W / 2 + 55, H * 0.9);
  ctx.quadraticCurveTo(W / 2 + 70, H * 0.55, W / 2 + 24, H * 0.38);
  ctx.fill();

  // Cape inner shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.moveTo(W / 2 - 16, H * 0.40);
  ctx.quadraticCurveTo(W / 2 - 10, H * 0.55, W / 2 - 20, H * 0.85);
  ctx.lineTo(W / 2, H * 0.85);
  ctx.lineTo(W / 2, H * 0.40);
  ctx.fill();
}

function drawAccessory(ctx, hx, hy, hr, acc) {
  ctx.font = `${acc.slot === 'head' ? 26 : 22}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  switch(acc.slot) {
    case 'face':
      ctx.font = '22px serif';
      ctx.fillText(acc.emoji, hx, hy - 4);
      break;
    case 'head':
      ctx.font = '26px serif';
      ctx.fillText(acc.emoji, hx, hy - hr - 8);
      break;
    case 'neck':
      ctx.font = '18px serif';
      ctx.fillText(acc.emoji, hx, hy + hr + 14);
      break;
    case 'ear':
      ctx.font = '16px serif';
      ctx.fillText(acc.emoji, hx - hr - 6, hy + 4);
      ctx.save(); ctx.scale(-1, 1);
      ctx.fillText(acc.emoji, -(hx + hr + 6), hy + 4);
      ctx.restore();
      break;
    case 'wrist':
      ctx.font = '16px serif';
      ctx.fillText(acc.emoji, hx - hr - 22, hy + hr + 20);
      break;
    default:
      ctx.fillText(acc.emoji, hx, hy - 4);
  }
}

// ── COLOR UTILS ──
function lighten(hex, amt) {
  if (!hex || hex === 'none' || hex.startsWith('linear')) return hex || '#888';
  try {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, (n >> 16) + amt);
    const g = Math.min(255, ((n >> 8) & 0xFF) + amt);
    const b = Math.min(255, (n & 0xFF) + amt);
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  } catch(e) { return hex; }
}

function darken(hex, amt) { return lighten(hex, -amt); }

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ─────────────────────────────────────────
// SIDEBAR MINI AVATAR
// ─────────────────────────────────────────

function updateSidebarAvatar() {
  // Draw tiny version into sidebar canvas if it exists
  const sCanvas = document.getElementById('sidebarAvatarCanvas');
  const sInitial = document.getElementById('avatarInitialSidebar');
  if (!sCanvas) return;

  // Create offscreen canvas, draw full avatar, then copy to small canvas
  const offscreen = document.createElement('canvas');
  offscreen.width = 220; offscreen.height = 280;
  drawAvatar(offscreen, avatarConfig);

  const sCtx = sCanvas.getContext('2d');
  sCtx.clearRect(0, 0, 38, 38);
  // Clip to circle
  sCtx.save();
  sCtx.beginPath();
  sCtx.arc(19, 19, 19, 0, Math.PI * 2);
  sCtx.clip();
  sCtx.drawImage(offscreen, 40, 30, 140, 180, 0, 0, 38, 38);
  sCtx.restore();

  sCanvas.style.display = 'block';
  if (sInitial) sInitial.style.display = 'none';
}

// ─────────────────────────────────────────
// PRESETS
// ─────────────────────────────────────────

function renderAvatarPresets() {
  const container = document.getElementById('avatarPresets');
  if (!container) return;
  container.innerHTML = '';

  AVATAR_PRESETS.forEach(preset => {
    const card = document.createElement('div');
    card.className = 'preset-card';
    card.onclick = () => applyPreset(preset);

    const cv = document.createElement('canvas');
    cv.width = 110; cv.height = 140;
    card.appendChild(cv);

    // Temporarily render this preset
    const tempCfg = { ...preset.config };
    requestAnimationFrame(() => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 220; offscreen.height = 280;
      drawAvatar(offscreen, tempCfg);
      const pCtx = cv.getContext('2d');
      pCtx.drawImage(offscreen, 0, 0, 220, 280, 0, 0, 110, 140);
    });

    card.innerHTML += `
      ${preset.locked ? '<div class="preset-lock">🔒</div>' : ''}
      <div class="preset-name">${preset.name}</div>
      <div class="preset-desc">${preset.desc}</div>
      ${preset.locked ? `<div class="preset-cost">🪙 ${preset.cost}</div>` : '<div class="preset-cost" style="color:var(--success)">✅ Free</div>'}
    `;
    card.insertBefore(cv, card.children[0]);

    container.appendChild(card);
  });
}

function applyPreset(preset) {
  if (preset.locked) {
    if (typeof appState !== 'undefined' && appState.coins >= preset.cost) {
      appState.coins -= preset.cost;
      if (typeof updateHeader === 'function') updateHeader();
      if (typeof saveState === 'function') saveState();
      preset.locked = false;
      if (typeof showToast === 'function') showToast(`🎉 Unlocked ${preset.name} preset!`, 'success');
    } else {
      if (typeof showToast === 'function') showToast(`🔒 Need 🪙${preset.cost} to unlock this preset!`, 'error');
      return;
    }
  }
  Object.assign(avatarConfig, preset.config);
  renderAvatarOptions(currentAvatarCat);
  drawAvatar(document.getElementById('avatarCanvas'), avatarConfig);
  updateSidebarAvatar();
  if (typeof showToast === 'function') showToast(`✨ Applied "${preset.name}" preset!`, 'success');
}

// ─────────────────────────────────────────
// SAVE / RANDOMIZE
// ─────────────────────────────────────────

function saveAvatar() {
  saveAvatarState();
  updateSidebarAvatar();
  const stage = document.getElementById('avatarStage');
  if (stage) stage.classList.add('avatar-save-flash');
  setTimeout(() => stage && stage.classList.remove('avatar-save-flash'), 800);
  if (typeof showToast === 'function') showToast('✅ Avatar saved!', 'success');
  if (typeof showAchievement === 'function') showAchievement('🎭', 'Avatar Customized!');
}

function randomizeAvatar() {
  const cats = ['skin', 'hair', 'outfit', 'pants', 'shoes', 'accessory', 'cape', 'bg'];
  cats.forEach(cat => {
    const items = AVATAR_DATA[cat].filter(i => !i.locked);
    if (items.length) avatarConfig[cat] = items[Math.floor(Math.random() * items.length)].id;
  });
  renderAvatarOptions(currentAvatarCat);
  drawAvatar(document.getElementById('avatarCanvas'), avatarConfig);
  updateSidebarAvatar();
  if (typeof showToast === 'function') showToast('🎲 Random avatar generated!', 'info');
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────

function initAvatar() {
  loadAvatarState();
  // Populate options grid (works even if section is hidden)
  renderAvatarOptions('skin');
  // Draw canvas (works even when display:none — canvas buffer is still valid)
  const canvas = document.getElementById('avatarCanvas');
  if (canvas) {
    try { drawAvatar(canvas, avatarConfig); } catch(e) { console.warn('Avatar init draw:', e); }
  }
  renderAvatarPresets();
  updateSidebarAvatar();
}

// Init after ALL scripts have loaded
window.addEventListener('load', () => {
  initAvatar();
});
