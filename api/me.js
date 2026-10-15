const store = require('../data/store');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const user = store.getSessionUser(req);
  if (!user) return res.status(401).json({ error: 'Not logged in' });
  return res.status(200).json({ user: store.publicUser(user) });
};
