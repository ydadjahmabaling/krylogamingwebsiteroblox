// ---------- Shared helpers ----------
async function api(path, opts = {}) {
  const res = await fetch(path, {
    method: opts.method || 'GET',
    headers: opts.body ? { 'Content-Type': 'application/json' } : {},
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: 'same-origin'
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 2500);
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-backdrop')) e.target.classList.add('hidden');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));
});

function switchTab(which) {
  document.getElementById('loginForm').classList.toggle('hidden', which !== 'login');
  document.getElementById('registerForm').classList.toggle('hidden', which !== 'register');
  document.getElementById('tabLogin').classList.toggle('active', which === 'login');
  document.getElementById('tabRegister').classList.toggle('active', which === 'register');
}

// ---------- Auth ----------
let currentUser = null;

function renderAuth() {
  const area = document.getElementById('authArea');
  const adminLink = document.getElementById('adminLink');
  if (currentUser) {
    area.innerHTML = `
      <span class="auth-user">Hi, <strong>${currentUser.username}</strong>${currentUser.role === 'admin' ? ' (admin)' : ''}</span>
      <button class="btn btn-ghost btn-sm" onclick="doLogout()">Log Out</button>`;
    if (adminLink) adminLink.classList.toggle('hidden', currentUser.role !== 'admin');
  } else {
    area.innerHTML = `<button class="btn btn-ghost" onclick="openModal('loginModal')">Log In</button>`;
    if (adminLink) adminLink.classList.add('hidden');
  }
  if (typeof onAuthChange === 'function') onAuthChange(currentUser);
}

async function checkSession() {
  const { ok, data } = await api('/api/me');
  currentUser = ok ? data.user : null;
  renderAuth();
}

async function doLogin(e) {
  e.preventDefault();
  const f = e.target;
  const err = document.getElementById('loginErr');
  err.classList.add('hidden');
  const { ok, data } = await api('/api/login', {
    method: 'POST',
    body: { username: f.username.value.trim(), password: f.password.value }
  });
  if (!ok) {
    err.textContent = data.error || 'Login failed';
    err.classList.remove('hidden');
    return false;
  }
  currentUser = data.user;
  closeModal('loginModal');
  f.reset();
  renderAuth();
  toast(`Welcome back, ${data.user.username}!`);
  return false;
}

async function doRegister(e) {
  e.preventDefault();
  const f = e.target;
  const err = document.getElementById('regErr');
  err.classList.add('hidden');
  const { ok, data } = await api('/api/register', {
    method: 'POST',
    body: { username: f.username.value.trim(), password: f.password.value }
  });
  if (!ok) {
    err.textContent = data.error || 'Registration failed';
    err.classList.remove('hidden');
    return false;
  }
  currentUser = data.user;
  closeModal('loginModal');
  f.reset();
  renderAuth();
  toast(`Account created. Welcome, ${data.user.username}!`);
  return false;
}

async function doLogout() {
  await api('/api/logout', { method: 'POST' });
  currentUser = null;
  renderAuth();
  toast('Logged out');
}

// ---------- Storefront ----------
const FALLBACK_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240"><rect width="100%" height="100%" fill="#232838"/><text x="50%" y="52%" fill="#00a2ff" font-size="28" font-family="sans-serif" text-anchor="middle" font-weight="bold">BloxMart</text></svg>`
);

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

async function loadItems() {
  const grid = document.getElementById('itemGrid');
  if (!grid) return;
  const { ok, data } = await api('/api/items');
  if (!ok) { grid.innerHTML = '<div class="loading">Failed to load items.</div>'; return; }
  window._items = data.items;
  renderItems(data.items);
  const box = document.getElementById('searchBox');
  if (box) box.addEventListener('input', () => {
    const q = box.value.toLowerCase();
    renderItems(window._items.filter(i => (i.name + ' ' + i.category).toLowerCase().includes(q)));
  });
}

function renderItems(items) {
  const grid = document.getElementById('itemGrid');
  if (!items.length) { grid.innerHTML = '<div class="loading">No items found.</div>'; return; }
  grid.innerHTML = items.map(i => `
    <article class="card">
      <div class="card-img"><img src="${esc(i.image) || FALLBACK_IMG}" alt="${esc(i.name)}" loading="lazy"
        onerror="this.src='${FALLBACK_IMG}'"></div>
      <div class="card-body">
        <span class="card-cat">${esc(i.category)}</span>
        <div class="card-name">${esc(i.name)}</div>
        <div class="card-desc">${esc(i.description)}</div>
        <div class="card-foot">
          <span class="price">${Number(i.price).toLocaleString()}</span>
          <button class="btn btn-primary btn-sm" onclick="buyItem(${i.id})">Buy</button>
        </div>
      </div>
    </article>`).join('');
}

function buyItem(id) {
  if (!currentUser) { openModal('loginModal'); toast('Log in to buy items'); return; }
  const item = window._items.find(i => i.id === id);
  toast(`Added "${item.name}" to your order! (Demo)`);
}

checkSession();
loadItems();
