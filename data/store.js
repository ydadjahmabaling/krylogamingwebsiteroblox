// Shared in-memory data store.
// NOTE: On Vercel, serverless functions are stateless/ephemeral, so items added
// at runtime live only in the warm instance. For permanent persistence, swap
// this module to Vercel KV, Postgres, or Blob storage (see README).

const bcrypt = require('bcryptjs');

const seedItems = [
  { id: 1, name: "Bloxy Cola", price: 25, category: "Gear", image: "https://tr.rbxcdn.com/180-day/2e5f8c2d-9a2b-4c3e-8d1f-3a4b5c6d7e8f/420/420/Hat/Png", description: "Classic Roblox gear. Refreshing!" },
  { id: 2, name: "Dominus Empyreus", price: 9999, category: "Hat", image: "https://tr.rbxcdn.com/180-day/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/420/420/Hat/Png", description: "Legendary limited hat." },
  { id: 3, name: "Speed Coil", price: 120, category: "Gear", image: "https://tr.rbxcdn.com/180-day/9f8e7d6c-5b4a-3210-fedc-ba9876543210/420/420/Hat/Png", description: "Run super fast!" },
  { id: 4, name: "Golden Super Fly Boombox", price: 500, category: "Gear", image: "https://tr.rbxcdn.com/180-day/abcdef12-3456-7890-abcd-ef1234567890/420/420/Hat/Png", description: "Play your favorite tunes." },
  { id: 5, name: "Headless Horseman", price: 31000, category: "Bundle", image: "https://tr.rbxcdn.com/180-day/0f1e2d3c-4b5a-6978-8091-a2b3c4d5e6f7/420/420/Hat/Png", description: "Rare Halloween bundle." },
  { id: 6, name: "Korblox Deathspeaker", price: 17000, category: "Package", image: "https://tr.rbxcdn.com/180-day/11223344-5566-7788-9900-aabbccddeeff/420/420/Hat/Png", description: "Iconic sorcerer package." }
];

// In-memory item catalog (seeded, admin can add more)
let items = [...seedItems];
let nextId = seedItems.length + 1;

// Users: hashed passwords (bcryptjs works on Vercel, pure JS)
const users = [
  { id: 1, username: "admin", passwordHash: bcrypt.hashSync("admin123", 8), role: "admin" },
  { id: 2, username: "user",  passwordHash: bcrypt.hashSync("user123", 8),  role: "user"  }
];

// Session tokens in memory: token -> { userId, expires }
const sessions = {};

function createSession(userId) {
  const token = require('crypto').randomBytes(24).toString('hex');
  sessions[token] = { userId, expires: Date.now() + 1000 * 60 * 60 * 24 * 7 }; // 7 days
  return token;
}

function getSessionUser(req) {
  const cookie = req.headers.cookie || "";
  const m = cookie.match(/(?:^|;\s*)session=([a-f0-9]{48})/);
  if (!m) return null;
  const s = sessions[m[1]];
  if (!s || s.expires < Date.now()) return null;
  return users.find(u => u.id === s.userId) || null;
}

function publicUser(u) {
  return { id: u.id, username: u.username, role: u.role };
}

module.exports = { items, users, sessions, createSession, getSessionUser, publicUser,
  addItem(item) { item.id = nextId++; items.push(item); return item; },
  deleteItem(id) { const i = items.findIndex(x => x.id === id); if (i >= 0) items.splice(i, 1); }
};
