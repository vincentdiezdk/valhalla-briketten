/* ===================================================
   VALHALLA-BRIKETTEN — Admin Panel
   Password: valhalla2026
   Tabs: Metrics, Facts, Partners, Branches, Timeline, News, Settings
   Clean white admin UI with navy accent
   =================================================== */

// In-memory auth token (session variable only)
let adminToken = null;
let adminInitialized = false;
let adminCurrentTab = 'metrics';

// Admin SVG icons (small inline, 14-16px)
const ADM_ICONS = {
  lock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  wrench: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
  chart: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  gear: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  bulb: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>`,
  branch: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/></svg>`,
  handshake: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 7.65l.78.77L12 20.64l7.64-7.64.78-.77a5.4 5.4 0 000-7.65z"/></svg>`,
  calendar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  newspaper: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a4 4 0 01-4-4V6a2 2 0 012-2h2"/><path d="M9 6h7M9 10h7M9 14h4"/></svg>`,
  save: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  rain: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>`,
  coffee: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  log: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l1.5 8M19 8l-1.5 8"/><ellipse cx="12" cy="8" rx="7" ry="3"/></svg>`,
  paper: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  checkCircle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  sun: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/></svg>`,
  box: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>`,
  tent: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l9-18 9 18"/><path d="M3 21h18"/><path d="M10 21l2-4 2 4"/></svg>`,
  thermo: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg>`,
  timer: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 6 12 12 16 14"/><line x1="9.5" y1="3" x2="14.5" y2="3"/></svg>`,
  flame: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></svg>`,
  target: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  globe: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  hourglass: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 00-.586-1.414L12 12l-4.414 4.414A2 2 0 007 17.828V22"/><path d="M7 2v4.172a2 2 0 00.586 1.414L12 12l4.414-4.414A2 2 0 0017 6.172V2"/></svg>`,
};

function admIcon(name) {
  return ADM_ICONS[name] || '';
}

// --- Init ---
function initAdmin() {
  const container = document.getElementById('adminContent');
  if (!container) return;

  if (!adminToken) {
    renderAdminLogin(container);
  } else {
    renderAdminPanel(container);
  }
  adminInitialized = true;
}

// --- Login Screen ---
function renderAdminLogin(container) {
  container.innerHTML = `
    <div class="admin-login">
      <h2>${admIcon('lock')} Admin Panel</h2>
      <p>Indtast adgangskode for at få adgang til administrationen.</p>
      <input type="password" id="adminPwInput" class="admin-input" placeholder="Adgangskode" 
             onkeydown="if(event.key==='Enter') doAdminLogin()">
      <button class="admin-login-btn" onclick="doAdminLogin()">Log ind</button>
      <div class="admin-error" id="adminError"></div>
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById('adminPwInput');
    if (input) input.focus();
  }, 100);
}

async function doAdminLogin() {
  const input = document.getElementById('adminPwInput');
  const errorEl = document.getElementById('adminError');
  if (!input) return;

  const password = input.value;
  const result = await window.api('auth', 'POST', { password });

  if (result && result.ok) {
    adminToken = result.token;
    const container = document.getElementById('adminContent');
    if (container) renderAdminPanel(container);
  } else {
    if (errorEl) errorEl.textContent = 'Forkert adgangskode. Prøv igen.';
    if (input) { input.value = ''; input.focus(); }
  }
}

// --- Main Admin Panel ---
function renderAdminPanel(container) {
  const tabs = [
    { id: 'metrics', label: `${admIcon('chart')} Målinger` },
    { id: 'settings', label: `${admIcon('gear')} Indstillinger` },
    { id: 'facts', label: `${admIcon('bulb')} Fakta` },
    { id: 'branches', label: `${admIcon('branch')} Grene` },
    { id: 'partners', label: `${admIcon('handshake')} Partnere` },
    { id: 'timeline', label: `${admIcon('calendar')} Tidslinje` },
    { id: 'news', label: `${admIcon('newspaper')} Nyheder` },
  ];

  container.innerHTML = `
    <div class="admin-panel show">
      <div class="admin-header">
        <h2>${admIcon('wrench')} Admin Panel</h2>
        <button class="admin-logout-btn" onclick="adminLogout()">Log ud</button>
      </div>
      <div class="admin-tabs" id="adminTabs">
        ${tabs.map(t => `<button class="admin-tab ${t.id === adminCurrentTab ? 'active' : ''}" 
          onclick="switchAdminTab('${t.id}')">${t.label}</button>`).join('')}
      </div>
      <div id="adminTabBody"></div>
    </div>
  `;

  loadAdminTab(adminCurrentTab);
}

function switchAdminTab(tabId) {
  adminCurrentTab = tabId;
  document.querySelectorAll('.admin-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('onclick') === `switchAdminTab('${tabId}')`);
  });
  loadAdminTab(tabId);
}

async function loadAdminTab(tabId) {
  const body = document.getElementById('adminTabBody');
  if (!body) return;
  body.innerHTML = '<div style="color:var(--text-muted);font-size:0.9rem;padding:20px 0">Indlæser...</div>';

  switch (tabId) {
    case 'metrics': await renderMetricsTab(body); break;
    case 'settings': await renderSettingsTab(body); break;
    case 'facts': await renderFactsTab(body); break;
    case 'branches': await renderBranchesTab(body); break;
    case 'partners': await renderPartnersTab(body); break;
    case 'timeline': await renderTimelineTab(body); break;
    case 'news': await renderNewsTab(body); break;
  }
}

// --- Metrics Tab ---
async function renderMetricsTab(body) {
  const m = await window.api('metrics') || {};

  const fields = [
    { key: 'rainwater_liters', label: `${admIcon('rain')} Regnvand (liter)`, type: 'number', step: '0.1' },
    { key: 'coffee_kg', label: `${admIcon('coffee')} Kaffegrums (kg)`, type: 'number', step: '0.1' },
    { key: 'sawdust_kg', label: `${admIcon('log')} Savsmuld (kg)`, type: 'number', step: '0.1' },
    { key: 'paper_kg', label: `${admIcon('paper')} Papir (kg)`, type: 'number', step: '0.1' },
    { key: 'briquettes_produced', label: `${admIcon('checkCircle')} Producerede briketter`, type: 'number', step: '1' },
    { key: 'briquettes_drying', label: `${admIcon('sun')} Under tørring`, type: 'number', step: '1' },
    { key: 'briquettes_ready', label: `${admIcon('box')} Klar til brug`, type: 'number', step: '1' },
    { key: 'scouts_involved', label: `${admIcon('tent')} Spejdere involveret`, type: 'number', step: '1' },
    { key: 'max_temp_celsius', label: `${admIcon('thermo')} Max temperatur (°C)`, type: 'number', step: '0.1' },
    { key: 'fastest_boil_minutes', label: `${admIcon('timer')} Hurtigste kogetid (min)`, type: 'number', step: '0.5' },
    { key: 'longest_burn_minutes', label: `${admIcon('flame')} Længste brændetid (min)`, type: 'number', step: '1' },
    { key: 'briquette_goal', label: `${admIcon('target')} Briket-mål`, type: 'number', step: '1' },
  ];

  body.innerHTML = `
    <h3 style="font-family:var(--font-display);color:var(--text-primary);margin-bottom:20px;font-size:1.1rem">Opdater målinger</h3>
    <div class="admin-metrics-grid">
      ${fields.map(f => `
        <div class="admin-field">
          <label>${f.label}</label>
          <input type="${f.type}" step="${f.step}" value="${m[f.key] || 0}" id="m-${f.key}">
        </div>
      `).join('')}
    </div>
    <button class="admin-save-btn" onclick="saveMetrics()">${admIcon('save')} Gem målinger</button>
    <span class="admin-success" id="metricsSuccess">${admIcon('check')} Gemt!</span>
  `;
}

async function saveMetrics() {
  const fields = [
    'rainwater_liters','coffee_kg','sawdust_kg','paper_kg',
    'briquettes_produced','briquettes_drying','briquettes_ready',
    'scouts_involved','max_temp_celsius','fastest_boil_minutes',
    'longest_burn_minutes','briquette_goal'
  ];

  const data = {};
  fields.forEach(f => {
    const el = document.getElementById(`m-${f}`);
    if (el) data[f] = parseFloat(el.value) || 0;
  });

  await window.api('metrics', 'POST', data);
  showAdminSuccess('metricsSuccess');

  if (window.loadAllData) window.loadAllData();
}

// --- Settings Tab ---
async function renderSettingsTab(body) {
  const s = await window.api('settings') || {};

  body.innerHTML = `
    <h3 style="font-family:var(--font-display);color:var(--text-primary);margin-bottom:20px;font-size:1.1rem">Globale indstillinger</h3>
    <div class="admin-field">
      <label>→ Næste milepæl (vises i hero)</label>
      <input type="text" id="s-next_milestone" value="${escAdm(s.next_milestone || '')}">
    </div>
    <div class="admin-field">
      <label>${admIcon('target')} Briket-mål (antal)</label>
      <input type="number" id="s-briquette_goal" value="${escAdm(s.briquette_goal || '1000')}">
    </div>
    <div class="admin-field">
      <label>${admIcon('globe')} Aktuel fase</label>
      <input type="text" id="s-current_phase" value="${escAdm(s.current_phase || '')}">
    </div>
    <div class="admin-field">
      <label>${admIcon('edit')} Site titel</label>
      <input type="text" id="s-site_title" value="${escAdm(s.site_title || 'Valhalla-Briketten')}">
    </div>
    <hr style="border:none;border-top:1px solid var(--card-border);margin:24px 0">
    <h3 style="font-family:var(--font-display);color:var(--accent-coral);margin-bottom:12px;font-size:1rem">${admIcon('lock')} Skift adgangskode</h3>
    <div class="admin-field">
      <label>Ny adgangskode</label>
      <input type="password" id="s-admin_password" placeholder="Ny adgangskode...">
    </div>
    <button class="admin-save-btn" onclick="saveSettings()">${admIcon('save')} Gem indstillinger</button>
    <span class="admin-success" id="settingsSuccess">${admIcon('check')} Gemt!</span>
  `;
}

async function saveSettings() {
  const keys = ['next_milestone', 'briquette_goal', 'current_phase', 'site_title'];
  const data = {};
  keys.forEach(k => {
    const el = document.getElementById(`s-${k}`);
    if (el && el.value) data[k] = el.value;
  });

  const pw = document.getElementById('s-admin_password');
  if (pw && pw.value) data['admin_password'] = pw.value;

  await window.api('settings', 'POST', data);
  showAdminSuccess('settingsSuccess');
  if (window.loadAllData) window.loadAllData();
}

// --- Facts Tab ---
async function renderFactsTab(body) {
  const facts = await window.api('facts') || [];

  body.innerHTML = `
    <h3 style="font-family:var(--font-display);color:var(--text-primary);margin-bottom:16px;font-size:1.1rem">Faktakort</h3>
    <div class="admin-list" id="adminFactsList">
      ${facts.map(f => `
        <div class="admin-list-item" data-id="${f.id}">
          <div class="admin-item-info">
            <div class="admin-item-title">${escAdm(f.title)}</div>
            <div class="admin-item-sub">${escAdm(f.description)}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-edit-btn" onclick="editFact(${f.id})">Rediger</button>
            <button class="admin-delete-btn" onclick="deleteFact(${f.id})">Slet</button>
          </div>
        </div>
      `).join('')}
    </div>
    <button class="admin-add-btn" onclick="addFact()">+ Tilføj faktakort</button>
    <div id="factEditForm" style="display:none;margin-top:24px;background:var(--bg-cream);border:1px solid var(--card-border);border-radius:var(--radius-md);padding:20px">
      <h4 style="font-family:var(--font-display);color:var(--brand-amber);margin-bottom:16px">Rediger faktakort</h4>
      <input type="hidden" id="factId">
      <div class="admin-field"><label>Ikon-nøgle (f.eks. coffee, flame, tent)</label><input type="text" id="factIcon" placeholder="info"></div>
      <div class="admin-field"><label>Titel</label><input type="text" id="factTitle"></div>
      <div class="admin-field"><label>Beskrivelse</label><textarea id="factDesc"></textarea></div>
      <div class="admin-field"><label>Prioritet (sortering)</label><input type="number" id="factPriority" step="1"></div>
      <button class="admin-save-btn" onclick="saveFact()">${admIcon('save')} Gem faktakort</button>
      <button style="background:none;border:none;color:var(--text-muted);font-weight:700;margin-left:12px;cursor:pointer" onclick="document.getElementById('factEditForm').style.display='none'">Annuller</button>
      <span class="admin-success" id="factSuccess">${admIcon('check')} Gemt!</span>
    </div>
  `;
}

async function editFact(id) {
  const facts = await window.api('facts') || [];
  const fact = facts.find(f => f.id === id);
  if (!fact) return;

  document.getElementById('factEditForm').style.display = 'block';
  document.getElementById('factId').value = fact.id;
  document.getElementById('factIcon').value = fact.icon || '';
  document.getElementById('factTitle').value = fact.title || '';
  document.getElementById('factDesc').value = fact.description || '';
  document.getElementById('factPriority').value = fact.priority || 0;

  document.getElementById('factEditForm').scrollIntoView({ behavior: 'smooth' });
}

function addFact() {
  document.getElementById('factEditForm').style.display = 'block';
  document.getElementById('factId').value = '';
  document.getElementById('factIcon').value = 'info';
  document.getElementById('factTitle').value = '';
  document.getElementById('factDesc').value = '';
  document.getElementById('factPriority').value = '0';
}

async function saveFact() {
  const id = document.getElementById('factId')?.value;
  const data = {
    icon: document.getElementById('factIcon')?.value || 'info',
    title: document.getElementById('factTitle')?.value || '',
    description: document.getElementById('factDesc')?.value || '',
    priority: parseInt(document.getElementById('factPriority')?.value) || 0
  };
  if (id) data.id = parseInt(id);

  await window.api('facts', 'POST', data);
  showAdminSuccess('factSuccess');

  setTimeout(() => {
    document.getElementById('factEditForm').style.display = 'none';
    loadAdminTab('facts');
    if (window.loadAllData) window.loadAllData();
  }, 800);
}

async function deleteFact(id) {
  if (!confirm('Er du sikker på, at du vil slette dette faktakort?')) return;
  await window.api('facts', 'DELETE', null, `&id=${id}`);
  loadAdminTab('facts');
  if (window.loadAllData) window.loadAllData();
}

// --- Branches Tab ---
async function renderBranchesTab(body) {
  const branches = await window.api('branches') || [];

  body.innerHTML = `
    <h3 style="font-family:var(--font-display);color:var(--text-primary);margin-bottom:16px;font-size:1.1rem">Grene</h3>
    <div class="admin-list">
      ${branches.map(b => `
        <div class="admin-list-item">
          <div class="admin-item-info">
            <div class="admin-item-title">${escAdm(b.name)} – ${escAdm(b.role_title || '')}</div>
            <div class="admin-item-sub">${b.scouts_count} spejdere · ${b.briquettes_count} briketter · ${escAdm(b.level)}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-edit-btn" onclick="editBranch(${b.id})">Rediger</button>
          </div>
        </div>
      `).join('')}
    </div>
    <div id="branchEditForm" style="display:none;margin-top:24px;background:var(--bg-cream);border:1px solid var(--card-border);border-radius:var(--radius-md);padding:20px">
      <h4 style="font-family:var(--font-display);color:var(--brand-amber);margin-bottom:16px">Rediger gren</h4>
      <input type="hidden" id="branchId">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="admin-field"><label>Ikon-nøgle</label><input type="text" id="bIcon"></div>
        <div class="admin-field"><label>Navn</label><input type="text" id="bName"></div>
        <div class="admin-field"><label>Aldersgruppe</label><input type="text" id="bAge"></div>
        <div class="admin-field"><label>Rolle-titel</label><input type="text" id="bRole"></div>
        <div class="admin-field"><label>Antal spejdere</label><input type="number" id="bScouts"></div>
        <div class="admin-field"><label>Antal briketter</label><input type="number" id="bBriquettes"></div>
        <div class="admin-field"><label>Niveau</label>
          <select id="bLevel">
            <option value="Nybegynder">Nybegynder</option>
            <option value="Øvet">Øvet</option>
            <option value="Mester">Mester</option>
          </select>
        </div>
      </div>
      <div class="admin-field"><label>Beskrivelse</label><textarea id="bDesc"></textarea></div>
      <button class="admin-save-btn" onclick="saveBranch()">${admIcon('save')} Gem gren</button>
      <button style="background:none;border:none;color:var(--text-muted);font-weight:700;margin-left:12px;cursor:pointer" onclick="document.getElementById('branchEditForm').style.display='none'">Annuller</button>
      <span class="admin-success" id="branchSuccess">${admIcon('check')} Gemt!</span>
    </div>
  `;
}

async function editBranch(id) {
  const branches = await window.api('branches') || [];
  const b = branches.find(b => b.id === id);
  if (!b) return;

  document.getElementById('branchEditForm').style.display = 'block';
  document.getElementById('branchId').value = b.id;
  document.getElementById('bIcon').value = b.icon || '';
  document.getElementById('bName').value = b.name || '';
  document.getElementById('bAge').value = b.age_group || '';
  document.getElementById('bRole').value = b.role_title || '';
  document.getElementById('bScouts').value = b.scouts_count || 0;
  document.getElementById('bBriquettes').value = b.briquettes_count || 0;
  document.getElementById('bLevel').value = b.level || 'Nybegynder';
  document.getElementById('bDesc').value = b.description || '';

  document.getElementById('branchEditForm').scrollIntoView({ behavior: 'smooth' });
}

async function saveBranch() {
  const id = document.getElementById('branchId')?.value;
  const data = {
    icon: document.getElementById('bIcon')?.value || 'info',
    name: document.getElementById('bName')?.value || '',
    age_group: document.getElementById('bAge')?.value || '',
    role_title: document.getElementById('bRole')?.value || '',
    scouts_count: parseInt(document.getElementById('bScouts')?.value) || 0,
    briquettes_count: parseInt(document.getElementById('bBriquettes')?.value) || 0,
    level: document.getElementById('bLevel')?.value || 'Nybegynder',
    description: document.getElementById('bDesc')?.value || ''
  };
  if (id) data.id = parseInt(id);

  await window.api('branches', 'POST', data);
  showAdminSuccess('branchSuccess');

  setTimeout(() => {
    document.getElementById('branchEditForm').style.display = 'none';
    loadAdminTab('branches');
    if (window.loadAllData) window.loadAllData();
  }, 800);
}

// --- Partners Tab ---
async function renderPartnersTab(body) {
  const partners = await window.api('partners') || [];

  body.innerHTML = `
    <h3 style="font-family:var(--font-display);color:var(--text-primary);margin-bottom:16px;font-size:1.1rem">Samarbejdspartnere</h3>
    <div class="admin-list">
      ${partners.map(p => `
        <div class="admin-list-item">
          <div class="admin-item-info">
            <div class="admin-item-title">${escAdm(p.name)}</div>
            <div class="admin-item-sub">${escAdm(p.role || '')} – ${escAdm(p.description || '')}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-edit-btn" onclick="editPartner(${p.id})">Rediger</button>
            <button class="admin-delete-btn" onclick="deletePartner(${p.id})">Skjul</button>
          </div>
        </div>
      `).join('')}
    </div>
    <button class="admin-add-btn" onclick="addPartner()">+ Tilføj partner</button>
    <div id="partnerEditForm" style="display:none;margin-top:24px;background:var(--bg-cream);border:1px solid var(--card-border);border-radius:var(--radius-md);padding:20px">
      <h4 style="font-family:var(--font-display);color:var(--brand-amber);margin-bottom:16px">Rediger partner</h4>
      <input type="hidden" id="partnerId">
      <div class="admin-field"><label>Navn</label><input type="text" id="pName"></div>
      <div class="admin-field"><label>Rolle</label><input type="text" id="pRole"></div>
      <div class="admin-field"><label>Beskrivelse</label><textarea id="pDesc"></textarea></div>
      <div class="admin-field"><label>Hjemmeside URL</label><input type="url" id="pUrl"></div>
      <div class="admin-field"><label>Sorteringsorden</label><input type="number" id="pSort"></div>
      <button class="admin-save-btn" onclick="savePartner()">${admIcon('save')} Gem partner</button>
      <button style="background:none;border:none;color:var(--text-muted);font-weight:700;margin-left:12px;cursor:pointer" onclick="document.getElementById('partnerEditForm').style.display='none'">Annuller</button>
      <span class="admin-success" id="partnerSuccess">${admIcon('check')} Gemt!</span>
    </div>
  `;
}

async function editPartner(id) {
  const partners = await window.api('partners') || [];
  const p = partners.find(p => p.id === id);
  if (!p) return;

  document.getElementById('partnerEditForm').style.display = 'block';
  document.getElementById('partnerId').value = p.id;
  document.getElementById('pName').value = p.name || '';
  document.getElementById('pRole').value = p.role || '';
  document.getElementById('pDesc').value = p.description || '';
  document.getElementById('pUrl').value = p.website_url || '';
  document.getElementById('pSort').value = p.sort_order || 0;

  document.getElementById('partnerEditForm').scrollIntoView({ behavior: 'smooth' });
}

function addPartner() {
  document.getElementById('partnerEditForm').style.display = 'block';
  document.getElementById('partnerId').value = '';
  document.getElementById('pName').value = '';
  document.getElementById('pRole').value = '';
  document.getElementById('pDesc').value = '';
  document.getElementById('pUrl').value = '';
  document.getElementById('pSort').value = '0';
}

async function savePartner() {
  const id = document.getElementById('partnerId')?.value;
  const data = {
    name: document.getElementById('pName')?.value || '',
    role: document.getElementById('pRole')?.value || '',
    description: document.getElementById('pDesc')?.value || '',
    website_url: document.getElementById('pUrl')?.value || '',
    sort_order: parseInt(document.getElementById('pSort')?.value) || 0
  };
  if (id) data.id = parseInt(id);

  await window.api('partners', 'POST', data);
  showAdminSuccess('partnerSuccess');

  setTimeout(() => {
    document.getElementById('partnerEditForm').style.display = 'none';
    loadAdminTab('partners');
    if (window.loadAllData) window.loadAllData();
  }, 800);
}

async function deletePartner(id) {
  if (!confirm('Skjule denne partner?')) return;
  await window.api('partners', 'DELETE', null, `&id=${id}`);
  loadAdminTab('partners');
  if (window.loadAllData) window.loadAllData();
}

// --- Timeline Tab ---
async function renderTimelineTab(body) {
  const events = await window.api('timeline') || [];

  body.innerHTML = `
    <h3 style="font-family:var(--font-display);color:var(--text-primary);margin-bottom:16px;font-size:1.1rem">Tidslinje-begivenheder</h3>
    <div class="admin-list">
      ${events.map(e => `
        <div class="admin-list-item">
          <div class="admin-item-info">
            <div class="admin-item-title">${escAdm(e.event_date)} — ${escAdm(e.title)}</div>
            <div class="admin-item-sub">${e.completed ? `${admIcon('check')} Afsluttet` : `${admIcon('hourglass')} Kommende`}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-edit-btn" onclick="editTimeline(${e.id})">Rediger</button>
            <button class="admin-delete-btn" onclick="deleteTimeline(${e.id})">Slet</button>
          </div>
        </div>
      `).join('')}
    </div>
    <button class="admin-add-btn" onclick="addTimeline()">+ Tilføj begivenhed</button>
    <div id="timelineEditForm" style="display:none;margin-top:24px;background:var(--bg-cream);border:1px solid var(--card-border);border-radius:var(--radius-md);padding:20px">
      <h4 style="font-family:var(--font-display);color:var(--brand-amber);margin-bottom:16px">Rediger begivenhed</h4>
      <input type="hidden" id="tlId">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="admin-field"><label>Ikon-nøgle (f.eks. flame, tent)</label><input type="text" id="tlIcon" value="pin"></div>
        <div class="admin-field"><label>Dato/periode</label><input type="text" id="tlDate" placeholder="F.eks. April 2026"></div>
        <div class="admin-field"><label>Sorteringsorden</label><input type="number" id="tlSort"></div>
        <div class="admin-field"><label>Afsluttet?</label>
          <select id="tlDone">
            <option value="0">Kommende</option>
            <option value="1">Afsluttet</option>
          </select>
        </div>
      </div>
      <div class="admin-field"><label>Titel</label><input type="text" id="tlTitle"></div>
      <div class="admin-field"><label>Beskrivelse</label><textarea id="tlDesc"></textarea></div>
      <button class="admin-save-btn" onclick="saveTimeline()">${admIcon('save')} Gem begivenhed</button>
      <button style="background:none;border:none;color:var(--text-muted);font-weight:700;margin-left:12px;cursor:pointer" onclick="document.getElementById('timelineEditForm').style.display='none'">Annuller</button>
      <span class="admin-success" id="tlSuccess">${admIcon('check')} Gemt!</span>
    </div>
  `;
}

async function editTimeline(id) {
  const events = await window.api('timeline') || [];
  const e = events.find(e => e.id === id);
  if (!e) return;

  document.getElementById('timelineEditForm').style.display = 'block';
  document.getElementById('tlId').value = e.id;
  document.getElementById('tlIcon').value = e.icon || 'pin';
  document.getElementById('tlDate').value = e.event_date || '';
  document.getElementById('tlTitle').value = e.title || '';
  document.getElementById('tlDesc').value = e.description || '';
  document.getElementById('tlSort').value = e.sort_order || 0;
  document.getElementById('tlDone').value = e.completed ? '1' : '0';

  document.getElementById('timelineEditForm').scrollIntoView({ behavior: 'smooth' });
}

function addTimeline() {
  document.getElementById('timelineEditForm').style.display = 'block';
  document.getElementById('tlId').value = '';
  document.getElementById('tlIcon').value = 'pin';
  document.getElementById('tlDate').value = '';
  document.getElementById('tlTitle').value = '';
  document.getElementById('tlDesc').value = '';
  document.getElementById('tlSort').value = '0';
  document.getElementById('tlDone').value = '0';
}

async function saveTimeline() {
  const id = document.getElementById('tlId')?.value;
  const data = {
    icon: document.getElementById('tlIcon')?.value || 'pin',
    event_date: document.getElementById('tlDate')?.value || '',
    title: document.getElementById('tlTitle')?.value || '',
    description: document.getElementById('tlDesc')?.value || '',
    sort_order: parseInt(document.getElementById('tlSort')?.value) || 0,
    completed: parseInt(document.getElementById('tlDone')?.value) || 0
  };
  if (id) data.id = parseInt(id);

  await window.api('timeline', 'POST', data);
  showAdminSuccess('tlSuccess');

  setTimeout(() => {
    document.getElementById('timelineEditForm').style.display = 'none';
    loadAdminTab('timeline');
    if (window.loadAllData) window.loadAllData();
  }, 800);
}

async function deleteTimeline(id) {
  if (!confirm('Slette denne begivenhed?')) return;
  await window.api('timeline', 'DELETE', null, `&id=${id}`);
  loadAdminTab('timeline');
  if (window.loadAllData) window.loadAllData();
}

// --- News Tab ---
async function renderNewsTab(body) {
  const news = await window.api('news') || [];

  body.innerHTML = `
    <h3 style="font-family:var(--font-display);color:var(--text-primary);margin-bottom:16px;font-size:1.1rem">Nyheder & Blog</h3>
    <div class="admin-list">
      ${news.map(n => {
        const dateStr = n.published_at ? new Date(n.published_at).toLocaleDateString('da-DK') : '';
        return `
          <div class="admin-list-item">
            <div class="admin-item-info">
              <div class="admin-item-title">${escAdm(n.title)}</div>
              <div class="admin-item-sub">${dateStr}</div>
            </div>
            <div class="admin-item-actions">
              <button class="admin-edit-btn" onclick="editNews(${n.id})">Rediger</button>
              <button class="admin-delete-btn" onclick="deleteNews(${n.id})">Skjul</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <button class="admin-add-btn" onclick="addNews()">+ Tilføj nyhed</button>
    <div id="newsEditForm" style="display:none;margin-top:24px;background:var(--bg-cream);border:1px solid var(--card-border);border-radius:var(--radius-md);padding:20px">
      <h4 style="font-family:var(--font-display);color:var(--brand-amber);margin-bottom:16px">Rediger nyhed</h4>
      <input type="hidden" id="newsId">
      <div class="admin-field"><label>Overskrift</label><input type="text" id="newsTitle"></div>
      <div class="admin-field"><label>Indhold</label><textarea id="newsContent" style="min-height:120px"></textarea></div>
      <button class="admin-save-btn" onclick="saveNews()">${admIcon('save')} Gem nyhed</button>
      <button style="background:none;border:none;color:var(--text-muted);font-weight:700;margin-left:12px;cursor:pointer" onclick="document.getElementById('newsEditForm').style.display='none'">Annuller</button>
      <span class="admin-success" id="newsSuccess">${admIcon('check')} Gemt!</span>
    </div>
  `;
}

async function editNews(id) {
  const news = await window.api('news') || [];
  const n = news.find(n => n.id === id);
  if (!n) return;

  document.getElementById('newsEditForm').style.display = 'block';
  document.getElementById('newsId').value = n.id;
  document.getElementById('newsTitle').value = n.title || '';
  document.getElementById('newsContent').value = n.content || '';

  document.getElementById('newsEditForm').scrollIntoView({ behavior: 'smooth' });
}

function addNews() {
  document.getElementById('newsEditForm').style.display = 'block';
  document.getElementById('newsId').value = '';
  document.getElementById('newsTitle').value = '';
  document.getElementById('newsContent').value = '';
}

async function saveNews() {
  const id = document.getElementById('newsId')?.value;
  const data = {
    title: document.getElementById('newsTitle')?.value || '',
    content: document.getElementById('newsContent')?.value || ''
  };
  if (id) data.id = parseInt(id);

  await window.api('news', 'POST', data);
  showAdminSuccess('newsSuccess');

  setTimeout(() => {
    document.getElementById('newsEditForm').style.display = 'none';
    loadAdminTab('news');
    if (window.loadAllData) window.loadAllData();
  }, 800);
}

async function deleteNews(id) {
  if (!confirm('Skjule denne nyhed?')) return;
  await window.api('news', 'DELETE', null, `&id=${id}`);
  loadAdminTab('news');
  if (window.loadAllData) window.loadAllData();
}

// --- Utilities ---
function showAdminSuccess(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

function adminLogout() {
  adminToken = null;
  adminInitialized = false;
  const container = document.getElementById('adminContent');
  if (container) renderAdminLogin(container);
}

function escAdm(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Expose globally
window.initAdmin = initAdmin;
window.doAdminLogin = doAdminLogin;
window.adminLogout = adminLogout;
window.saveMetrics = saveMetrics;
window.saveSettings = saveSettings;
window.editFact = editFact;
window.addFact = addFact;
window.saveFact = saveFact;
window.deleteFact = deleteFact;
window.editBranch = editBranch;
window.saveBranch = saveBranch;
window.editPartner = editPartner;
window.addPartner = addPartner;
window.savePartner = savePartner;
window.deletePartner = deletePartner;
window.editTimeline = editTimeline;
window.addTimeline = addTimeline;
window.saveTimeline = saveTimeline;
window.deleteTimeline = deleteTimeline;
window.editNews = editNews;
window.addNews = addNews;
window.saveNews = saveNews;
window.deleteNews = deleteNews;
window.switchAdminTab = switchAdminTab;
