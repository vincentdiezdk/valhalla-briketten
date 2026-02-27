/* ===================================================
   VALHALLA-BRIKETTEN — Main Application Logic
   New Design: "Warm Nordic Sustainability"
   =================================================== */

// ---- SVG Icon System ----
// All icons: stroke="currentColor" stroke-width="2.5" or "2", fill="none", 24x24 viewBox
// Rendered at width/height="18" by default

const ICONS = {
  flame: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></svg>`,
  brick: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="5" rx="1"/><rect x="2" y="12" width="9" height="5" rx="1"/><rect x="13" y="12" width="9" height="5" rx="1"/><line x1="11" y1="7" x2="11" y2="12"/></svg>`,
  coffee: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  tent: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l9-18 9 18"/><path d="M3 21h18"/><path d="M10 21l2-4 2 4"/></svg>`,
  inbox: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>`,
  factory: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M9 20V9l-5 5V9l-2 2V4"/><path d="M22 20V4l-5 5V4"/><path d="M17 20v-5H9v5"/></svg>`,
  trophy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 20 12 16 16 20"/><line x1="12" y1="16" x2="12" y2="12"/><path d="M6 4H4a2 2 0 000 4c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6a2 2 0 000-4h-2"/><line x1="6" y1="4" x2="18" y2="4"/></svg>`,
  compass: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  droplet: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>`,
  log: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l1.5 8M19 8l-1.5 8"/><ellipse cx="12" cy="8" rx="7" ry="3"/><path d="M5 8c0 1.66 3.13 3 7 3s7-1.34 7-3"/><path d="M6.5 16c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2"/></svg>`,
  newspaper: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a4 4 0 01-4-4V6a2 2 0 012-2h2"/><path d="M9 6h7M9 10h7M9 14h4"/></svg>`,
  chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  checkCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  package: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  thermometer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg>`,
  timer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 6 12 12 16 14"/><line x1="9.5" y1="3" x2="14.5" y2="3"/></svg>`,
  medal: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="6"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>`,
  calculator: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="8" y2="12" stroke-width="2"/><line x1="12" y1="12" x2="12" y2="12" stroke-width="2"/><line x1="16" y1="12" x2="16" y2="12" stroke-width="2"/><line x1="8" y1="16" x2="8" y2="16" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="16" stroke-width="2"/><line x1="16" y1="16" x2="16" y2="20"/></svg>`,
  target: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  // Branch-specific icons
  press: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="5" rx="1"/><path d="M8 8v9a1 1 0 001 1h6a1 1 0 001-1V8"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/></svg>`,
  flask: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M9 3v7L5.5 15a3 3 0 001.5 5.5h10A3 3 0 0018.5 15L15 10V3"/><path d="M7 16h10"/></svg>`,
  megaphone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>`,
  // Inline small sizes for timeline dots and result icons
  checkSmall: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  dotActive: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>`,
  dotFuture: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/></svg>`,
  // Large variants for result displays
  flameLg: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></svg>`,
  windLg: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1111 8H2"/><path d="M12.59 19.41A2 2 0 1014 16H2"/><path d="M17.73 7.73A2.5 2.5 0 1119.5 12H2"/></svg>`,
  starLg: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  thumbLg: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>`,
  coffeeLg: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  trophyLg: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 20 12 16 16 20"/><line x1="12" y1="16" x2="12" y2="12"/><path d="M6 4H4a2 2 0 000 4c0 3.31 2.69 6 6 6h4c3.31 0 6-2.69 6-6a2 2 0 000-4h-2"/><line x1="6" y1="4" x2="18" y2="4"/></svg>`,
};

// Helper: get icon HTML string by name
function icon(name, extraClass = '') {
  const s = ICONS[name];
  if (!s) return '';
  if (!extraClass) return s;
  return s.replace('<svg ', `<svg class="${extraClass}" `);
}

// ---- State ----
const state = {
  metrics: null,
  facts: [],
  partners: [],
  branches: [],
  timeline: [],
  news: [],
  settings: {},
  loaded: false
};

// ---- Supabase REST API Layer ----
const SB_URL = SUPABASE_URL + '/rest/v1';
const SB_HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function sbFetch(table, opts = {}) {
  const { method = 'GET', body, query = '', single = false } = opts;
  const url = `${SB_URL}/${table}${query ? '?' + query : ''}`;
  const fetchOpts = { method, headers: {...SB_HEADERS} };
  if (single && method === 'GET') {
    fetchOpts.headers['Accept'] = 'application/vnd.pgrst.object+json';
  }
  if (body) fetchOpts.body = JSON.stringify(body);
  try {
    const res = await fetch(url, fetchOpts);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch(e) {
    console.warn('Supabase error:', table, e);
    return single ? null : [];
  }
}

// SHA-256 helper for auth
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Compat wrapper for admin.js (and games.js game_log calls)
async function api(action, method = 'GET', body = null, params = '') {
  // Map old CGI actions to Supabase table names
  const tableMap = {
    'metrics': 'metrics',
    'facts': 'facts',
    'partners': 'partners',
    'branches': 'branches',
    'timeline': 'timeline_events',
    'news': 'news',
    'settings': 'settings',
    'game_log': 'game_logs'
  };
  const table = tableMap[action];
  if (!table) return null;

  if (method === 'GET') {
    if (action === 'metrics') return sbFetch(table, { query: 'id=eq.1', single: true });
    if (action === 'settings') {
      const rows = await sbFetch(table, { query: 'key=neq.admin_password_hash' });
      const obj = {};
      if (rows) rows.forEach(r => { obj[r.key] = r.value; });
      return obj;
    }
    const qMap = {
      'facts': 'active=eq.true&order=priority.asc',
      'partners': 'active=eq.true&order=sort_order.asc',
      'branches': 'order=sort_order.asc',
      'timeline': 'order=sort_order.asc',
      'news': 'active=eq.true&order=published_at.desc&limit=20'
    };
    return sbFetch(table, { query: qMap[action] || '' });
  }

  if (method === 'POST') {
    if (action === 'metrics') {
      // Upsert metrics row
      return sbFetch(table, {
        method: 'PATCH',
        body: body,
        query: 'id=eq.1'
      }).then(r => Array.isArray(r) ? r[0] : r);
    }
    if (action === 'settings') {
      // Upsert each key-value
      for (const [k, v] of Object.entries(body)) {
        if (k === 'admin_password') continue;
        await sbFetch(table, {
          method: 'POST',
          body: { key: k, value: v, updated_at: new Date().toISOString() },
          query: 'on_conflict=key'
        });
      }
      return api('settings'); // re-fetch
    }
    if (action === 'auth') {
      // Auth check: fetch the hash and compare client-side using SHA-256
      const hashRow = await sbFetch(table, { query: 'key=eq.admin_password_hash', single: true });
      if (!hashRow) return { ok: false, error: 'No password set' };
      const inputHash = await sha256(body.password || '');
      if (inputHash === hashRow.value) {
        return { ok: true, token: 'local-auth' };
      }
      return { ok: false, error: 'Forkert adgangskode' };
    }
    if (action === 'game_log') {
      return sbFetch(table, { method: 'POST', body: body });
    }
    // For tables with 'id' in body = update, otherwise insert
    if (body && body.id) {
      const id = body.id;
      const updateBody = {...body};
      delete updateBody.id;
      return sbFetch(table, {
        method: 'PATCH',
        body: updateBody,
        query: `id=eq.${id}`
      }).then(r => Array.isArray(r) ? r[0] : r);
    } else {
      return sbFetch(table, { method: 'POST', body: body })
        .then(r => Array.isArray(r) ? r[0] : r);
    }
  }

  if (method === 'DELETE') {
    const idMatch = params.match(/id=(\d+)/);
    if (idMatch) {
      const id = idMatch[1];
      // Soft delete for facts, partners, news; hard delete for timeline
      if (['facts', 'partners', 'news'].includes(action)) {
        return sbFetch(table, { method: 'PATCH', body: { active: false }, query: `id=eq.${id}` });
      } else {
        return sbFetch(table, { method: 'DELETE', query: `id=eq.${id}` });
      }
    }
    return { ok: true };
  }

  return null;
}

// ---- Ember Particle System (CSS-driven, lightweight) ----
function initEmbers() {
  const container = document.getElementById('emberContainer');
  if (!container) return;

  const colors = [
    '#0094F0', '#3DB8E8', '#ff9944', '#ffcc44',
    '#ff6622', '#EA636F', '#0094F0', '#ff8833'
  ];

  // 12-15 particles for subtle effect
  const count = window.innerWidth < 768 ? 10 : 15;

  for (let i = 0; i < count; i++) {
    const ember = document.createElement('div');
    ember.className = 'ember';

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 70 + 15;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 10;
    const drift1 = (Math.random() - 0.5) * 60;
    const drift2 = (Math.random() - 0.5) * 100;
    const drift3 = (Math.random() - 0.5) * 140;
    const color = colors[Math.floor(Math.random() * colors.length)];

    ember.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      box-shadow: 0 0 ${size * 2}px ${color};
      --duration: ${duration}s;
      --delay: -${delay}s;
      --drift-1: ${drift1}px;
      --drift-2: ${drift2}px;
      --drift-3: ${drift3}px;
    `;

    container.appendChild(ember);
  }
}

// ---- Animated Counter ----
function animateCounter(el, target, duration = 1800, suffix = '') {
  if (!el) return;
  const start = 0;
  const startTime = performance.now();
  const isFloat = !Number.isInteger(target);

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;

    if (isFloat) {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      el.textContent = Math.round(current).toLocaleString('da-DK') + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ---- Load & Render Facts ----
function renderFacts(facts) {
  const grid = document.getElementById('factsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  facts.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = 'fact-card fade-in';
    card.style.transitionDelay = `${i * 0.06}s`;
    // Use fact icon if it's a known SVG key, otherwise show the info icon
    const factIcon = ICONS[f.icon] ? icon(f.icon) : (f.icon && f.icon.length < 5 ? '' : icon('info'));
    card.innerHTML = `
      <span class="fact-icon">${factIcon || icon('info')}</span>
      <div class="fact-title">${escHtml(f.title)}</div>
      <p class="fact-desc">${escHtml(f.description)}</p>
    `;
    grid.appendChild(card);
  });
}

// ---- Dashboard ----
function renderDashboard(m) {
  if (!m) return;

  const setVal = (id, val, isFloat) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (val === 0 || val === null || val === undefined) {
      el.textContent = id.includes('boil') || id.includes('burn') ? '–' : '0';
    } else if (isFloat) {
      el.textContent = parseFloat(val).toFixed(1);
    } else {
      el.textContent = Number(val).toLocaleString('da-DK');
    }
  };

  setVal('d-rain', m.rainwater_liters, true);
  setVal('d-coffee', m.coffee_kg, true);
  setVal('d-sawdust', m.sawdust_kg, true);
  setVal('d-paper', m.paper_kg, true);
  setVal('d-estimated', m.estimated_briquettes || 0);
  setVal('d-produced', m.briquettes_produced);
  setVal('d-drying', m.briquettes_drying);
  setVal('d-ready', m.briquettes_ready);
  setVal('d-temp', m.max_temp_celsius, true);
  setVal('d-boil', m.fastest_boil_minutes, true);
  setVal('d-burn', m.longest_burn_minutes, true);

  // Goal & progress
  const goal = m.briquette_goal || 1000;
  const produced = m.briquettes_produced || 0;
  const pct = Math.min(Math.round((produced / goal) * 100), 100);

  const goalEl = document.getElementById('d-goal');
  const pctEl = document.getElementById('d-pct');
  const barEl = document.getElementById('d-bar');

  if (goalEl) goalEl.textContent = goal.toLocaleString('da-DK');
  if (pctEl) pctEl.textContent = pct + '%';
  if (barEl) {
    setTimeout(() => { barEl.style.width = pct + '%'; }, 300);
  }

  // Update refresh time
  const refreshTimeEl = document.getElementById('refreshTime');
  if (refreshTimeEl) {
    const now = new Date();
    refreshTimeEl.textContent = `Sidst opdateret: ${now.toLocaleTimeString('da-DK', {hour:'2-digit', minute:'2-digit'})}`;
  }
}

// ---- Hero Counters ----
function updateHeroCounters(m) {
  if (!m) return;
  const briquettesEl = document.getElementById('cnt-briquettes');
  const coffeeEl = document.getElementById('cnt-coffee');
  const scoutsEl = document.getElementById('cnt-scouts');

  if (briquettesEl) animateCounter(briquettesEl, m.briquettes_produced || 0);
  if (coffeeEl) animateCounter(coffeeEl, m.coffee_kg || 0, 1800, '');
  if (scoutsEl) animateCounter(scoutsEl, m.scouts_involved || 45);
}

// ---- Branches ----
const branchColors = ['#0f4172', '#0094F0', '#EA636F', '#4A90D9', '#2c98b7'];

function getBranchIcon(iconKey) {
  // iconKey is a text key like 'droplet', 'sun', etc.
  if (ICONS[iconKey]) return icon(iconKey);
  // Fallback: info icon
  return icon('info');
}

function renderBranches(branches) {
  const grid = document.getElementById('branchesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  branches.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'branch-card fade-in';
    card.style.transitionDelay = `${i * 0.1}s`;
    card.style.borderLeftColor = branchColors[i % branchColors.length];
    card.innerHTML = `
      <span class="branch-icon">${getBranchIcon(b.icon)}</span>
      <div class="branch-name">${escHtml(b.name)}</div>
      <div class="branch-age">${escHtml(b.age_group || '')}</div>
      <div class="branch-role">${escHtml(b.role_title || '')}</div>
      <p class="branch-desc">${escHtml(b.description || '')}</p>
      <div class="branch-stats">
        <div class="branch-stat">
          <span class="branch-stat-val">${b.scouts_count || 0}</span>
          <span class="branch-stat-label">Spejdere</span>
        </div>
        <div class="branch-stat">
          <span class="branch-stat-val">${b.briquettes_count || 0}</span>
          <span class="branch-stat-label">Briketter</span>
        </div>
      </div>
      <span class="branch-level level-${escHtml(b.level || 'Nybegynder')}">${escHtml(b.level || 'Nybegynder')}</span>
    `;
    grid.appendChild(card);
  });
}

// ---- Scoreboard ----
function renderScoreboard(branches) {
  const el = document.getElementById('scoreboard');
  if (!el) return;

  const sorted = [...branches].sort((a, b) => (b.briquettes_count || 0) - (a.briquettes_count || 0));
  const medals = ['1.', '2.', '3.', '4.', '5.'];

  let html = `<div class="scoreboard-title">${icon('medal')} Gren-scoreboard</div>`;
  sorted.forEach((b, i) => {
    html += `
      <div class="scoreboard-row">
        <span class="scoreboard-rank">${medals[i] || (i+1)+'.'}</span>
        <span class="scoreboard-icon">${getBranchIcon(b.icon)}</span>
        <span class="scoreboard-name">${escHtml(b.name)}</span>
        <span class="scoreboard-val">${b.briquettes_count || 0}</span>
      </div>
    `;
  });

  el.innerHTML = html;
}

// ---- Partners ----
const partnerColors = ['#003366', '#0094F0', '#0f4172', '#EA636F', '#2c98b7'];

function getInitials(name) {
  return name.split(/[\s/]+/).slice(0,2).map(w => w[0] || '').join('').toUpperCase();
}

function renderPartners(partners) {
  const grid = document.getElementById('partnersGrid');
  if (!grid) return;
  grid.innerHTML = '';

  partners.forEach((p, i) => {
    const color = partnerColors[i % partnerColors.length];
    const initials = getInitials(p.name);
    const card = document.createElement('div');
    card.className = 'partner-card fade-in';
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="partner-avatar" style="background:${color}">${initials}</div>
      <div>
        <div class="partner-name">${escHtml(p.name)}</div>
        <span class="partner-role">${escHtml(p.role || '')}</span>
      </div>
      <p class="partner-desc">${escHtml(p.description || '')}</p>
      ${p.website_url ? `<a class="partner-link" href="${escHtml(p.website_url)}" target="_blank" rel="noopener noreferrer">Besøg hjemmeside →</a>` : ''}
    `;
    grid.appendChild(card);
  });
}

// ---- Timeline ----
function renderTimeline(events) {
  const track = document.getElementById('timelineTrack');
  if (!track) return;
  track.innerHTML = '';

  events.forEach((e, i) => {
    const isCompleted = !!e.completed;
    const firstNotDone = events.findIndex(ev => !ev.completed);
    const isActive = i === firstNotDone;

    const item = document.createElement('div');
    item.className = `timeline-item fade-in ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;
    item.style.transitionDelay = `${i * 0.06}s`;

    let dotContent;
    if (isCompleted) {
      dotContent = ICONS.checkSmall;
    } else if (isActive) {
      dotContent = ICONS.dotActive;
    } else {
      dotContent = ICONS.dotFuture;
    }

    item.innerHTML = `
      <div class="timeline-dot">${dotContent}</div>
      <div class="timeline-body">
        <div class="timeline-date">${escHtml(e.event_date)}</div>
        <div class="timeline-title">${escHtml(e.title)}</div>
        <p class="timeline-desc">${escHtml(e.description || '')}</p>
      </div>
    `;
    track.appendChild(item);
  });
}

// ---- Mini Timeline (Dashboard) ----
function renderMiniTimeline(events) {
  const el = document.getElementById('timelineMini');
  if (!el) return;
  el.innerHTML = '';

  const firstNotDone = events.findIndex(ev => !ev.completed);

  events.forEach((e, i) => {
    const isCompleted = !!e.completed;
    const isActive = i === firstNotDone;
    const item = document.createElement('div');
    item.className = `timeline-mini-item ${isCompleted ? 'done' : ''} ${isActive ? 'current' : ''}`;
    item.innerHTML = `
      <div class="timeline-mini-dot"></div>
      <span class="timeline-mini-label">${escHtml(e.event_date)} — ${escHtml(e.title)}</span>
    `;
    el.appendChild(item);
  });
}

// ---- News ----
function renderNews(news) {
  const list = document.getElementById('newsList');
  if (!list) return;
  list.innerHTML = '';

  if (!news || news.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted);font-weight:600;font-size:0.9rem;">Ingen nyheder endnu.</p>';
    return;
  }

  news.forEach((n, i) => {
    const date = n.published_at ? new Date(n.published_at) : new Date();
    const dateStr = date.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' });
    const card = document.createElement('div');
    card.className = 'news-card fade-in';
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="news-date">${dateStr}</div>
      <div class="news-title">${escHtml(n.title)}</div>
      <p class="news-excerpt">${escHtml(n.content || '')}</p>
    `;
    list.appendChild(card);
  });
}

// ---- Settings ----
function applySettings(settings) {
  if (!settings) return;
  const milestoneEl = document.getElementById('milestoneText');
  if (milestoneEl && settings.next_milestone) {
    milestoneEl.textContent = settings.next_milestone.replace(/^[→\s]+/, '');
  }
  const nextStepEl = document.getElementById('nextStepText');
  if (nextStepEl && settings.next_milestone) {
    nextStepEl.textContent = settings.next_milestone.replace(/^[→\s]+/, '');
  }
}

// ---- Main Load ----
async function loadAllData() {
  try {
    const [metrics, facts, partners, branches, timeline, news, settingsRows] = await Promise.all([
      sbFetch('metrics', { query: 'id=eq.1', single: true }),
      sbFetch('facts', { query: 'active=eq.true&order=priority.asc' }),
      sbFetch('partners', { query: 'active=eq.true&order=sort_order.asc' }),
      sbFetch('branches', { query: 'order=sort_order.asc' }),
      sbFetch('timeline_events', { query: 'order=sort_order.asc' }),
      sbFetch('news', { query: 'active=eq.true&order=published_at.desc&limit=20' }),
      sbFetch('settings', { query: 'key=neq.admin_password_hash' })
    ]);

    // metrics: add estimated_briquettes calc
    if (metrics) {
      const dry = (metrics.coffee_kg||0) + (metrics.sawdust_kg||0) + (metrics.paper_kg||0);
      metrics.estimated_briquettes = Math.floor(dry * 8);
    }

    // settings: convert rows [{key, value},...] to object {key: value}
    const settings = {};
    if (settingsRows && Array.isArray(settingsRows)) {
      settingsRows.forEach(r => { settings[r.key] = r.value; });
    }

    state.metrics = metrics;
    state.facts = facts || [];
    state.partners = partners || [];
    state.branches = branches || [];
    state.timeline = timeline || [];
    state.news = news || [];
    state.settings = settings;

    // Render everything (same as before)
    renderFacts(state.facts);
    renderDashboard(state.metrics);
    updateHeroCounters(state.metrics);
    renderBranches(state.branches);
    renderScoreboard(state.branches);
    renderPartners(state.partners);
    renderTimeline(state.timeline);
    renderMiniTimeline(state.timeline);
    renderNews(state.news);
    applySettings(state.settings);

    state.loaded = true;

    // Expose state for admin
    window._valhallaState = state;
    window._valhallaReload = loadAllData;

  } catch (e) {
    console.error('Load error:', e);
  }
}

// ---- Refresh button ----
function initRefreshBtn() {
  const btn = document.getElementById('refreshBtn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    btn.classList.add('spinning');
    const metrics = await sbFetch('metrics', { query: 'id=eq.1', single: true });
    if (metrics) {
      const dry = (metrics.coffee_kg||0) + (metrics.sawdust_kg||0) + (metrics.paper_kg||0);
      metrics.estimated_briquettes = Math.floor(dry * 8);
      state.metrics = metrics;
      renderDashboard(metrics);
    }
    setTimeout(() => btn.classList.remove('spinning'), 600);
  });
}

// ---- Navbar scroll effect ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        navLinks.classList.remove('open');
      }
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active-link', l.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}

// ---- Smooth scroll for anchors ----
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#admin') {
      e.preventDefault();
      openModal('adminModal');
      if (window.initAdmin) window.initAdmin();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// ---- Modal System ----
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function initModals() {
  // Close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      closeModal(modalId);
    });
  });

  // Click overlay to close
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Game card opens
  document.getElementById('openBuilder')?.addEventListener('click', () => {
    openModal('builderModal');
    if (window.initBuilderGame) window.initBuilderGame();
  });
  document.getElementById('openCalculator')?.addEventListener('click', () => {
    openModal('calcModal');
    if (window.initCalcGame) window.initCalcGame();
  });
  document.getElementById('openQuiz')?.addEventListener('click', () => {
    openModal('quizModal');
    if (window.initQuizGame) window.initQuizGame();
  });

  // Admin nav link (footer link and any a[href="#admin"])
  document.querySelectorAll('.nav-admin, a[href="#admin"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('adminModal');
      if (window.initAdmin) window.initAdmin();
    });
  });
}

// ---- Intersection Observer for scroll animations ----
function initAnimations() {
  if (!window.IntersectionObserver) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Also observe dash-cards that aren't .fade-in
  document.querySelectorAll('.dash-card').forEach(el => {
    if (!el.classList.contains('fade-in')) {
      el.classList.add('fade-in');
      observer.observe(el);
    }
  });
}

// ---- Utility ----
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Expose globally
window.api = api;
window.escHtml = escHtml;
window.openModal = openModal;
window.closeModal = closeModal;
window.state = state;
window.loadAllData = loadAllData;
window.renderBranches = renderBranches;
window.renderPartners = renderPartners;
window.renderFacts = renderFacts;
window.renderTimeline = renderTimeline;
window.renderNews = renderNews;
window.renderScoreboard = renderScoreboard;
window.applySettings = applySettings;
window.ICONS = ICONS;
window.icon = icon;

// ---- CRO: Countdown to Spejdernes Lejr 2026 ----
function initCountdown() {
  const el = document.getElementById('countdownValue');
  if (!el) return;
  // SL 2026 starts approximately July 18, 2026
  const target = new Date('2026-07-18T00:00:00');
  const now = new Date();
  const diffMs = target - now;
  if (diffMs <= 0) {
    el.textContent = 'nu!';
    return;
  }
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  el.textContent = `${days} dage`;
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initEmbers();
  initNavbar();
  initSmoothScroll();
  initModals();
  initCountdown();
  loadAllData().then(() => {
    setTimeout(initAnimations, 150);
  });
  initRefreshBtn();
});
