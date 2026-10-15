// Vercel Serverless API: Fetch Catalog Items
const fallbackItems = [
  { id: 1, name: "Bloxy Cola", price: 25, category: "Gear", image: "https://tr.rbxcdn.com/180-day/2e5f8c2d-9a2b-4c3e-8d1f-3a4b5c6d7e8f/420/420/Hat/Png", description: "Classic Roblox gear. Refreshing!" },
  { id: 2, name: "Dominus Empyreus", price: 9999, category: "Hat", image: "https://tr.rbxcdn.com/180-day/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/420/420/Hat/Png", description: "Legendary limited hat." },
  { id: 3, name: "Speed Coil", price: 120, category: "Gear", image: "https://tr.rbxcdn.com/180-day/9f8e7d6c-5b4a-3210-fedc-ba9876543210/420/420/Hat/Png", description: "Run super fast!" },
  { id: 4, name: "Golden Super Fly Boombox", price: 500, category: "Gear", image: "https://tr.rbxcdn.com/180-day/abcdef12-3456-7890-abcd-ef1234567890/420/420/Hat/Png", description: "Play your favorite tunes." },
  { id: 5, name: "Headless Horseman", price: 31000, category: "Bundle", image: "https://tr.rbxcdn.com/180-day/0f1e2d3c-4b5a-6978-8091-a2b3c4d5e6f7/420/420/Hat/Png", description: "Rare Halloween bundle." },
  { id: 6, name: "Korblox Deathspeaker", price: 17000, category: "Package", image: "https://tr.rbxcdn.com/180-day/11223344-5566-7788-9900-aabbccddeeff/420/420/Hat/Png", description: "Iconic sorcerer package." }
];

module.exports = (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let catalog = fallbackItems;

  try {
    const store = require('../data/store.js');
    if (store && store.items && Array.isArray(store.items)) {
      catalog = store.items;
    }
  } catch (err) {
    console.warn('Store import issue, returning fallback catalog:', err.message);
  }

  return res.status(200).json(catalog);
};
