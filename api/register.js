const bcrypt = require('bcryptjs');
const store = require('../data/store');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  if (String(username).length < 3) return res.status(400).json({ error: 'Username must be at least 3 characters' });
  if (String(password).length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  if (store.users.some(u => u.username.toLowerCase() === String(username).toLowerCase())) {
    return res.status(409).json({ error: 'Username already taken' });
  }

  const user = {
    id: store.users.length + 1,
    username: String(username).slice(0, 30),
    passwordHash: bcrypt.hashSync(String(password), 8),
    role: 'user'
  };
  store.users.push(user);
  const token = store.createSession(user.id);
  res.setHeader('Set-Cookie', `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60*60*24*7}`);
  return res.status(201).json({ user: store.publicUser(user) });
};
