// ---------- Admin panel ----------
async function loadAdminItems() {
  const tbody = document.getElementById('adminItems');
  if (!tbody) return;
  const { ok, data } = await api('/api/items');
  if (!ok) { tbody.innerHTML = '<tr><td colspan="5">Failed to load.</td></tr>'; return; }
  window._items = data.items;
  tbody.innerHTML = data.items.map(i => `
    <tr>
      <td>${i.id}</td>
      <td>${esc(i.name)}</td>
      <td>${Number(i.price).toLocaleString()} R$</td>
      <td>${esc(i.category)}</td>
      <td><button class="btn btn-danger" onclick="removeItem(${i.id})">Delete</button></td>
    </tr>`).join('');
}

async function addItem(e) {
  e.preventDefault();
  const f = e.target;
  const err = document.getElementById('itemErr');
  err.classList.add('hidden');
  const { ok, data } = await api('/api/items', {
    method: 'POST',
    body: {
      name: f.name.value.trim(),
      price: f.price.value,
      category: f.category.value.trim(),
      image: f.image.value.trim(),
      description: f.description.value.trim()
    }
  });
  if (!ok) {
    err.textContent = data.error || 'Failed to add item';
    err.classList.remove('hidden');
    return false;
  }
  f.reset();
  toast(`"${data.item.name}" listed!`);
  loadAdminItems();
  return false;
}

async function removeItem(id) {
  if (!confirm('Delete this item?')) return;
  const { ok, data } = await api('/api/items?id=' + id, { method: 'DELETE' });
  if (!ok) { toast(data.error || 'Delete failed'); return; }
  toast('Item deleted');
  loadAdminItems();
}

// Hook into shared auth from app.js
function onAuthChange(user) {
  const gate = document.getElementById('gate');
  const panel = document.getElementById('adminPanel');
  const isAdmin = user && user.role === 'admin';
  if (gate) gate.classList.toggle('hidden', isAdmin);
  if (panel) panel.classList.toggle('hidden', !isAdmin);
  if (isAdmin) loadAdminItems();
}

loadAdminItems();
