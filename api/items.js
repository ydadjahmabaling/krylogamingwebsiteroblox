const store = require('../data/store');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // GET /api/items — public catalog
  if (req.method === 'GET') return res.status(200).json({ items: store.items });

  // Everything below requires admin
  const user = store.getSessionUser(req);
  if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });

  // POST /api/items — admin lists a new item
  if (req.method === 'POST') {
    const { name, price, category, image, description } = req.body || {};
    if (!name || !price) return res.status(400).json({ error: 'Name and price required' });
    const item = store.addItem({
      name: String(name).slice(0, 80),
      price: Math.max(0, Number(price) || 0),
      category: String(category || 'Item').slice(0, 40),
      image: String(image || '').slice(0, 500),
      description: String(description || '').slice(0, 300)
    });
    return res.status(201).json({ item });
  }

  // DELETE /api/items?id=X — admin removes an item
  if (req.method === 'DELETE') {
    const id = Number(req.query.id);
    if (!id) return res.status(400).json({ error: 'id required' });
    store.deleteItem(id);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
