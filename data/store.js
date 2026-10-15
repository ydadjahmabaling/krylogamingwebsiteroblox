<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin — BloxMart | Krylo Digital</title>
<link rel="icon" type="image/png" href="/logo.png">

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<style>
  :root {
    --bg-main: #07080c;
    --bg-card: rgba(18, 22, 33, 0.75);
    --bg-glass: rgba(11, 14, 23, 0.85);
    --neon-cyan: #00f0ff;
    --neon-purple: #9d4edd;
    --neon-glow: 0 0 15px rgba(0, 240, 255, 0.4), 0 0 30px rgba(0, 240, 255, 0.15);
    --border-color: rgba(0, 240, 255, 0.18);
    --transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background-color: var(--bg-main);
    color: #e2e8f0;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(157, 78, 221, 0.12) 0%, transparent 45%),
      radial-gradient(circle at 90% 80%, rgba(0, 240, 255, 0.12) 0%, transparent 45%),
      linear-gradient(to bottom, rgba(7, 8, 12, 0.95), #07080c);
  }

  h1, h2, h3, .brand-font { font-family: 'Orbitron', sans-serif; }

  .glass-nav {
    background: var(--bg-glass);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-color);
  }

  .glass-card, .panel {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    backdrop-filter: blur(12px);
    border-radius: 14px;
    transition: var(--transition);
    padding: 1.5rem;
  }

  .glass-card:hover {
    border-color: rgba(0, 240, 255, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  .btn-cyber, .btn-primary {
    background: linear-gradient(135deg, var(--neon-cyan), #00a8ff);
    color: #07080c;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 8px;
    transition: var(--transition);
    padding: 0.75rem 1.25rem;
    border: none;
    cursor: pointer;
    text-align: center;
    display: inline-block;
  }

  .btn-cyber:hover, .btn-primary:hover {
    box-shadow: var(--neon-glow);
    filter: brightness(1.1);
    transform: translateY(-2px);
  }

  /* Custom Input Styling */
  input, textarea {
    background-color: rgba(15, 23, 42, 0.8) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
    border-radius: 8px !important;
    padding: 0.65rem 0.85rem !important;
    font-size: 0.875rem !important;
    width: 100%;
    outline: none;
    transition: var(--transition);
  }

  input:focus, textarea:focus {
    border-color: var(--neon-cyan) !important;
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
  }

  /* Table Custom Styling */
  .table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
  }

  .table th {
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #94a3b8;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .table td {
    padding: 0.85rem 1rem;
    background: rgba(15, 23, 42, 0.5);
    font-size: 0.875rem;
  }

  .table tr td:first-child { border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
  .table tr td:last-child { border-top-right-radius: 8px; border-bottom-right-radius: 8px; }

  /* Custom Scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #07080c; }
  ::-webkit-scrollbar-thumb { background: #1f293d; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--neon-cyan); }
</style>
</head>
<body class="pt-20 pb-12">

<!-- Header Navbar -->
<header class="glass-nav fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-8">
  <div class="max-w-7xl mx-auto flex justify-between items-center">
    <!-- Brand Logo -->
    <a class="brand flex items-center gap-3 text-lg sm:text-xl font-bold brand-font text-white tracking-wider" href="/">
      <img src="/logo.png" alt="BloxMart logo" class="logo w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" onerror="this.onerror=null; this.src='https://placehold.co/40x40/07080c/00f0ff?text=K';">
      <span>Krylo <em class="not-italic text-[var(--neon-cyan)]">BloxMart</em> <span class="badge ml-2 text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold tracking-normal">Admin</span></span>
    </a>

    <!-- Nav Links -->
    <nav class="nav-links flex items-center gap-6 font-medium text-sm text-slate-300">
      <a href="/" class="hover:text-[var(--neon-cyan)] transition-colors flex items-center gap-1">← Back to Store</a>
    </nav>

    <!-- Auth Area (Populated dynamically by app.js) -->
    <div class="auth-area flex items-center gap-3" id="authArea"></div>
  </div>
</header>

<main class="admin-main max-w-7xl mx-auto px-4 sm:px-8 pt-8">
  <!-- Gate Section (Shown if unauthenticated or not admin) -->
  <section class="panel glass-card max-w-md mx-auto text-center py-12 px-6" id="gate">
    <div class="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
    </div>
    <h2 class="text-2xl font-black text-white mb-2 uppercase tracking-wide">Admin Access</h2>
    <p class="text-slate-400 text-sm mb-6">Log in with an administrator account to manage catalog inventory.</p>
    <button class="btn btn-primary btn-cyber w-full py-3" onclick="openModal('loginModal')">Admin Login</button>
  </section>

  <!-- Main Admin Dashboard Panel (Toggled via JS when logged in) -->
  <div id="adminPanel" class="hidden">
    <div class="admin-cols grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- Left Column: Add New Item Form -->
      <section class="panel glass-card lg:col-span-5 p-6 sm:p-8">
        <div class="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
          <h2 class="text-xl font-bold text-white uppercase tracking-wider">List New Item</h2>
          <span class="text-xs text-[var(--neon-cyan)] bg-[rgba(0,240,255,0.1)] px-2.5 py-1 rounded-full border border-[var(--neon-cyan)]/30">Catalog Editor</span>
        </div>

        <form onsubmit="return typeof addItem === 'function' ? addItem(event) : false;" id="addItemForm" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Item Name *</label>
            <input name="name" required maxlength="80" placeholder="e.g. Dominus Empyreus" class="w-full">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Price (Robux) *</label>
              <input name="price" type="number" min="0" required placeholder="100" class="w-full">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Category</label>
              <input name="category" maxlength="40" placeholder="Hat / Gear / Package" class="w-full">
            </div>
          </div>

          <!-- THUMBNAIL UPLOAD SYSTEM -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Item Thumbnail</label>
            
            <!-- Drag & Drop / Click Upload Box -->
            <div id="dropZone" class="border-2 border-dashed border-slate-700 hover:border-[var(--neon-cyan)] rounded-xl p-4 text-center cursor-pointer transition-all bg-slate-900/60 mb-2 relative group">
              <input type="file" id="thumbnailFile" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" onchange="handleFileSelect(event)">
              
              <!-- Initial Upload Prompt -->
              <div id="uploadPrompt" class="flex flex-col items-center justify-center gap-1.5 py-2">
                <svg class="w-7 h-7 text-[var(--neon-cyan)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span class="text-xs text-slate-300 font-medium">Upload File <span class="text-slate-500">(Click or Drag image here)</span></span>
                <span class="text-[10px] text-slate-500">PNG, JPG, WEBP, GIF (Auto Base64 String)</span>
              </div>

              <!-- Live Image Preview Box -->
              <div id="previewBox" class="hidden flex flex-col items-center gap-2 relative z-20">
                <img id="thumbPreview" src="" alt="Thumbnail preview" class="w-24 h-24 object-contain rounded-lg border border-[var(--neon-cyan)]/40 bg-black/60 p-1 shadow-lg">
                <button type="button" class="text-xs text-red-400 hover:text-red-300 font-semibold underline cursor-pointer" onclick="clearThumbnail(event)">Remove Image</button>
              </div>
            </div>

            <!-- Image Input Field (Holds Base64 string OR Image URL, sent to backend) -->
            <div class="mt-2">
              <span class="text-[11px] text-slate-400 block mb-1">Or paste Direct Image URL:</span>
              <input name="image" id="imageUrlInput" type="text" placeholder="https://tr.rbxcdn.com/..." class="w-full text-xs" oninput="handleUrlInput(event)">
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Description</label>
            <textarea name="description" rows="3" maxlength="300" placeholder="Brief item description..." class="w-full resize-none"></textarea>
          </div>

          <div class="err hidden text-red-400 text-xs p-2.5 bg-red-950/30 border border-red-800/50 rounded-lg" id="itemErr"></div>
          
          <button class="btn btn-primary full btn-cyber w-full py-3.5 text-sm mt-2" type="submit">Add Item To Catalog</button>
        </form>
      </section>

      <!-- Right Column: Current Catalog Table -->
      <section class="panel glass-card lg:col-span-7 p-6 sm:p-8">
        <div class="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
          <h2 class="text-xl font-bold text-white uppercase tracking-wider">Current Catalog</h2>
          <span class="text-xs text-slate-400">Live Database Items</span>
        </div>

        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>
            <tbody id="adminItems">
              <!-- Dynamically rendered by admin.js -->
              <tr>
                <td colspan="6" class="text-center py-8 text-slate-500">Loading catalog items...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  </div>
</main>

<!-- Shared Admin Login Modal -->
<div class="modal-backdrop fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden" id="loginModal">
  <div class="modal glass-card w-full max-w-md p-6 sm:p-8 relative border-[var(--border-color)] bg-[#0d0f17]">
    <button class="modal-close absolute top-4 right-4 text-slate-400 hover:text-white text-xl" onclick="closeModal('loginModal')">×</button>

    <h2 class="text-xl font-bold text-white mb-6 uppercase tracking-wider border-b border-slate-800 pb-3">Admin Login</h2>

    <form id="loginForm" onsubmit="return typeof doLogin === 'function' ? doLogin(event) : false;">
      <div class="mb-4">
        <label class="block text-xs font-semibold text-slate-400 mb-1">Username</label>
        <input name="username" required autocomplete="username" class="w-full">
      </div>
      <div class="mb-6">
        <label class="block text-xs font-semibold text-slate-400 mb-1">Password</label>
        <input name="password" type="password" required autocomplete="current-password" class="w-full">
      </div>
      <div class="err hidden text-red-400 text-xs mb-4 p-2.5 bg-red-950/30 border border-red-800/50 rounded-lg" id="loginErr"></div>
      <button class="btn btn-primary full btn-cyber w-full py-3 text-sm" type="submit">Log In</button>
      <p class="hint text-xs text-slate-500 text-center mt-4">Demo admin credentials: <code class="text-amber-400">admin/admin123</code></p>
    </form>
  </div>
</div>

<!-- Toast Container -->
<div class="toast hidden fixed bottom-6 right-6 z-50 bg-[#0e131f] border border-[var(--neon-cyan)] text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold" id="toast"></div>

<!-- Client Script for File Upload Base64 Handling & Preview -->
<script>
  // Modal fallback controls
  window.openModal = window.openModal || function(id) {
    document.getElementById(id)?.classList.remove('hidden');
  };

  window.closeModal = window.closeModal || function(id) {
    document.getElementById(id)?.classList.add('hidden');
    document.getElementById('loginErr')?.classList.add('hidden');
  };

  // Convert Uploaded Image File to Base64 String and show live preview
  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      const errBox = document.getElementById('itemErr');
      if (errBox) {
        errBox.textContent = 'Selected image is too large (max 5MB).';
        errBox.classList.remove('hidden');
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
      const base64Data = event.target.result;
      
      // Populate hidden or primary image input field
      const urlInput = document.getElementById('imageUrlInput');
      if (urlInput) urlInput.value = base64Data;

      // Update UI Preview
      const thumbPreview = document.getElementById('thumbPreview');
      const uploadPrompt = document.getElementById('uploadPrompt');
      const previewBox = document.getElementById('previewBox');

      if (thumbPreview && uploadPrompt && previewBox) {
        thumbPreview.src = base64Data;
        uploadPrompt.classList.add('hidden');
        previewBox.classList.remove('hidden');
      }
    };
    reader.readAsDataURL(file);
  }

  // Clear uploaded image or thumbnail selection
  function clearThumbnail(e) {
    if (e) e.stopPropagation();
    
    const fileInput = document.getElementById('thumbnailFile');
    const urlInput = document.getElementById('imageUrlInput');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const previewBox = document.getElementById('previewBox');

    if (fileInput) fileInput.value = '';
    if (urlInput) urlInput.value = '';
    if (uploadPrompt) uploadPrompt.classList.remove('hidden');
    if (previewBox) previewBox.classList.add('hidden');
  }

  // Update thumbnail preview if user types a direct image URL into the text box
  function handleUrlInput(e) {
    const val = e.target.value.trim();
    const thumbPreview = document.getElementById('thumbPreview');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const previewBox = document.getElementById('previewBox');

    if (val && thumbPreview && uploadPrompt && previewBox) {
      thumbPreview.src = val;
      uploadPrompt.classList.add('hidden');
      previewBox.classList.remove('hidden');
    } else if (!val && uploadPrompt && previewBox) {
      uploadPrompt.classList.remove('hidden');
      previewBox.classList.add('hidden');
    }
  }
</script>

<!-- Original Backend JS References -->
<script src="/assets/app.js"></script>
<script src="/assets/admin.js"></script>
</body>
</html>
