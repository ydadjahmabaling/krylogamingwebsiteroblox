const store = require('../data/store');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/(?:^|;\s*)session=([a-f0-9]{48})/);
  if (m) delete store.sessions[m[1]];
  res.setHeader('Set-Cookie', 'session=; Path=/; HttpOnly; Max-Age=0');
  return res.status(200).json({ ok: true });
};
