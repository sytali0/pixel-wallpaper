/**
 * ============================================================================
 * PIXEL WALLPAPER - CORE APPLICATION ENGINE
 * High Performance, Low Footprint, Vanilla JavaScript
 * Suitable for Windows Lively Wallpaper & Fullscreen Browsers
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. RETRO 8-BİT SES MOTORU (WEB AUDIO API - 0 HARİCİ DOSYA)
     ========================================================================== */
  class RetroSoundEngine {
    constructor() {
      this.audioCtx = null;
      this.enabled = localStorage.getItem('pixel_sound_enabled') !== 'false';
    }

    initCtx() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('pixel_sound_enabled', this.enabled);
      return this.enabled;
    }

    play(type) {
      if (!this.enabled) return;
      try {
        this.initCtx();
        if (!this.audioCtx) return;

        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        switch (type) {
          case 'blip':
            // Kısa hafif menü tıklaması
            osc.type = 'square';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
            break;

          case 'add':
            // Yeni görev ekleme sesi (iki tonlu neşeli ses)
            osc.type = 'square';
            osc.frequency.setValueAtTime(330, now);
            osc.frequency.setValueAtTime(660, now + 0.06);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
            osc.start(now);
            osc.stop(now + 0.14);
            break;

          case 'done':
            // Görev tamamlama sesi (zafer tınısı)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
            osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
            break;

          case 'trash':
            // Çöp kutusu temizleme (düşük frekanslı tok ses)
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(55, now + 0.18);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc.start(now);
            osc.stop(now + 0.18);
            break;

          case 'slide':
            // Raf klasörü çekme sesi (retro kağıt/karton sürtünmesi)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.linearRampToValueAtTime(520, now + 0.08);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
            break;

          case 'delete':
            // Tekil silme sesi
            osc.type = 'square';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
            break;
        }
      } catch (err) {
        console.warn('Audio play error:', err);
      }
    }
  }

  /* ==========================================================================
     2. BİLDİRİM TOAST YÖNETİCİSİ
     ========================================================================== */
  class ToastManager {
    static show(message, duration = 2400) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.25s ease';
        setTimeout(() => toast.remove(), 250);
      }, duration);
    }
  }

  /* ==========================================================================
     3. İNDEKS VERİTABANI (INDEXED DB) - MEDYA KALICILIĞI
     ========================================================================== */
  class MediaStorage {
    constructor() {
      this.dbName = 'PixelWallpaperDB';
      this.dbVersion = 1;
      this.storeName = 'mediaFiles';
      this.db = null;
      this.currentObjectUrl = null;
    }

    async init() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.dbVersion);

        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: 'id' });
          }
        };

        request.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
        };

        request.onerror = (e) => {
          console.error('IndexedDB bağlantı hatası:', e.target.error);
          reject(e.target.error);
        };
      });
    }

    async saveMedia(file) {
      if (!this.db) await this.init();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);

        const data = {
          id: 'frame_media',
          fileBlob: file,
          mimeType: file.type,
          name: file.name,
          updatedAt: Date.now()
        };

        const req = store.put(data);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
    }

    async getMedia() {
      if (!this.db) await this.init();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readonly');
        const store = tx.objectStore(this.storeName);
        const req = store.get('frame_media');

        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    }

    async removeMedia() {
      if (!this.db) await this.init();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const req = store.delete('frame_media');

        req.onsuccess = () => {
          this.revokeCurrentUrl();
          resolve(true);
        };
        req.onerror = () => reject(req.error);
      });
    }

    createUrl(blob) {
      this.revokeCurrentUrl();
      this.currentObjectUrl = URL.createObjectURL(blob);
      return this.currentObjectUrl;
    }

    revokeCurrentUrl() {
      if (this.currentObjectUrl) {
        URL.revokeObjectURL(this.currentObjectUrl);
        this.currentObjectUrl = null;
      }
    }
  }

  /* ==========================================================================
     4. MEDYA ÇERÇEVESİ YÖNETİCİSİ (SOL ÜST ÇERÇEVE)
     ========================================================================== */
  class MediaFrameManager {
    constructor(soundEngine) {
      this.sound = soundEngine;
      this.storage = new MediaStorage();
      this.frame = document.getElementById('media-frame');
      this.wrapper = document.getElementById('frame-media-wrapper');
      this.fileInput = document.getElementById('media-file-input');
      this.btnChange = document.getElementById('btn-change-media');
      this.btnReset = document.getElementById('btn-reset-media');
    }

    async init() {
      await this.storage.init();
      this.bindEvents();
      await this.loadSavedMedia();
    }

    bindEvents() {
      // Çerçeveye tıklandığında (ve butonlara basılmadıysa) dosya seçiciyi aç
      this.frame.addEventListener('click', (e) => {
        if (e.target.closest('.frame-controls')) return;
        this.sound.play('blip');
        this.fileInput.click();
      });

      // Değiştir butonu
      this.btnChange.addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.play('blip');
        this.fileInput.click();
      });

      // Sıfırla butonu
      this.btnReset.addEventListener('click', async (e) => {
        e.stopPropagation();
        this.sound.play('delete');
        await this.storage.removeMedia();
        this.renderPlaceholder();
        ToastManager.show('Çerçeve medyası temizlendi');
      });

      // Dosya input seçimi
      this.fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          await this.handleFileUpload(file);
          this.fileInput.value = '';
        }
      });

      // Sürükle ve Bırak (Drag & Drop) Olayları
      ['dragenter', 'dragover'].forEach(eventType => {
        this.frame.addEventListener(eventType, (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.frame.classList.add('drag-over');
        });
      });

      ['dragleave', 'drop'].forEach(eventType => {
        this.frame.addEventListener(eventType, (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.frame.classList.remove('drag-over');
        });
      });

      this.frame.addEventListener('drop', async (e) => {
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            await this.handleFileUpload(file);
          } else {
            ToastManager.show('Lütfen geçerli resim veya video bırakın');
          }
        }
      });
    }

    async handleFileUpload(file) {
      try {
        await this.storage.saveMedia(file);
        this.renderMedia(file, file.type);
        this.sound.play('done');
        ToastManager.show(`Medya yüklendi: ${file.name.slice(0, 18)}...`);
      } catch (err) {
        console.error('Medya kaydetme hatası:', err);
        ToastManager.show('Medya kaydedilemedi!');
      }
    }

    async loadSavedMedia() {
      try {
        const saved = await this.storage.getMedia();
        if (saved && saved.fileBlob) {
          this.renderMedia(saved.fileBlob, saved.mimeType);
        } else {
          this.renderPlaceholder();
        }
      } catch (err) {
        console.error('Kayıtlı medya yüklenirken hata:', err);
        this.renderPlaceholder();
      }
    }

    renderMedia(blob, mimeType) {
      const url = this.storage.createUrl(blob);
      this.wrapper.innerHTML = '';

      if (mimeType.startsWith('video/')) {
        const video = document.createElement('video');
        video.className = 'frame-media';
        video.src = url;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        this.wrapper.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.className = 'frame-media';
        img.src = url;
        img.alt = 'Çerçeve Sanatı';
        this.wrapper.appendChild(img);
      }
    }

    renderPlaceholder() {
      this.wrapper.innerHTML = `
        <div class="frame-placeholder" id="frame-placeholder">
          <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:#4a3b32;">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
          <span>MEDYA EKLE</span>
          <small style="font-size: 0.45rem; opacity: 0.8;">[Tıkla veya Sürükle]</small>
        </div>
      `;
    }
  }

  /* ==========================================================================
     5. TO-DO LİSTESİ YÖNETİCİSİ (MANTAR PANO / LOCALSTORAGE)
     ========================================================================== */
  class TodoManager {
    constructor(soundEngine) {
      this.sound = soundEngine;
      this.storageKey = 'pixel_wallpaper_todos';
      this.todos = this.loadTodos();

      this.form = document.getElementById('todo-form');
      this.input = document.getElementById('todo-input');
      this.list = document.getElementById('todo-list');
      this.counter = document.getElementById('todo-counter');
      this.trashBadge = document.getElementById('trash-badge');
      this.trashHotspot = document.getElementById('trash-hotspot');

      this.init();
    }

    init() {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.input.value.trim();
        if (text) {
          this.addTodo(text);
          this.input.value = '';
        }
      });

      this.render();
    }

    loadTodos() {
      try {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [
          { id: 1, text: 'Odayı toparla', completed: true },
          { id: 2, text: 'Lofi müzik aç', completed: false },
          { id: 3, text: 'Kodlamaya başla', completed: false }
        ];
      } catch (err) {
        return [];
      }
    }

    saveTodos() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
      } catch (err) {
        console.error('To-do kaydedilemedi:', err);
      }
      this.render();
    }

    addTodo(text) {
      const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
      };
      this.todos.unshift(newTodo);
      this.saveTodos();
      this.sound.play('add');
    }

    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodos();
        if (todo.completed) {
          this.sound.play('done');
        } else {
          this.sound.play('blip');
        }
      }
    }

    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id);
      this.saveTodos();
      this.sound.play('delete');
    }

    clearCompleted() {
      const initialCount = this.todos.length;
      const completedCount = this.todos.filter(t => t.completed).length;

      if (completedCount === 0) {
        return 0;
      }

      this.todos = this.todos.filter(t => !t.completed);
      this.saveTodos();
      return completedCount;
    }

    render() {
      this.list.innerHTML = '';

      if (this.todos.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'todo-empty-state';
        empty.textContent = 'Henüz görev yok...';
        this.list.appendChild(empty);
      } else {
        this.todos.forEach(todo => {
          const li = document.createElement('li');
          li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

          // Checkbox
          const chk = document.createElement('input');
          chk.type = 'checkbox';
          chk.className = 'todo-checkbox';
          chk.checked = todo.completed;
          chk.addEventListener('change', () => this.toggleTodo(todo.id));

          // Metin
          const span = document.createElement('span');
          span.className = 'todo-text';
          span.textContent = todo.text;

          // Sil butonu
          const btnDel = document.createElement('button');
          btnDel.className = 'todo-delete-btn';
          btnDel.textContent = '✕';
          btnDel.title = 'Sil';
          btnDel.addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteTodo(todo.id);
          });

          li.appendChild(chk);
          li.appendChild(span);
          li.appendChild(btnDel);
          this.list.appendChild(li);
        });
      }

      // Sayaç güncelleme
      const completedTotal = this.todos.filter(t => t.completed).length;
      const allTotal = this.todos.length;
      this.counter.textContent = `${completedTotal} / ${allTotal}`;

      // Çöp kutusu rozeti güncelleme
      if (this.trashBadge && this.trashHotspot) {
        this.trashBadge.textContent = completedTotal;
        if (completedTotal > 0) {
          this.trashHotspot.classList.add('has-items');
        } else {
          this.trashHotspot.classList.remove('has-items');
        }
      }
    }
  }

  /* ==========================================================================
     6. DEFTER KISAYOLLARI VE RETRO MODAL YÖNETİCİSİ
     ========================================================================== */
  class NotebookManager {
    constructor(soundEngine) {
      this.sound = soundEngine;
      this.storageKey = 'pixel_wallpaper_shortcuts';
      this.shortcuts = this.loadShortcuts();

      this.hotspot = document.getElementById('notebook-hotspot');
      this.modal = document.getElementById('notebook-modal');
      this.btnClose = document.getElementById('modal-close-btn');
      this.grid = document.getElementById('shortcuts-grid');
      this.form = document.getElementById('shortcut-form');
      this.titleInput = document.getElementById('shortcut-title');
      this.urlInput = document.getElementById('shortcut-url');

      this.init();
    }

    init() {
      // Hotspot tıklandığında aç
      this.hotspot.addEventListener('click', () => {
        this.sound.play('blip');
        this.open();
      });

      // Kapatma butonu
      this.btnClose.addEventListener('click', () => {
        this.sound.play('blip');
        this.close();
      });

      // Dışarı tıklandığında kapat
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });

      // ESC tuşu ile kapat
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('active')) {
          this.close();
        }
      });

      // Yeni kısayol ekleme
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = this.titleInput.value.trim();
        let url = this.urlInput.value.trim();
        if (title && url) {
          if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
          }
          this.addShortcut(title, url);
          this.titleInput.value = '';
          this.urlInput.value = '';
        }
      });

      this.render();
    }

    loadShortcuts() {
      try {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [
          { id: 1, title: 'GitHub / Projeler', url: 'https://github.com', icon: '💻' },
          { id: 2, title: 'Google Notlar', url: 'https://keep.google.com', icon: '📝' },
          { id: 3, title: 'Dersler / MDN', url: 'https://developer.mozilla.org', icon: '📚' },
          { id: 4, title: 'Lo-Fi Chill Müzik', url: 'https://www.youtube.com', icon: '🎧' }
        ];
      } catch (err) {
        return [];
      }
    }

    saveShortcuts() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.shortcuts));
      } catch (err) {
        console.error('Kısayollar kaydedilemedi:', err);
      }
      this.render();
    }

    addShortcut(title, url) {
      this.shortcuts.push({
        id: Date.now(),
        title: title,
        url: url,
        icon: '🔗'
      });
      this.saveShortcuts();
      this.sound.play('add');
      ToastManager.show('Kısayol eklendi!');
    }

    deleteShortcut(id) {
      this.shortcuts = this.shortcuts.filter(s => s.id !== id);
      this.saveShortcuts();
      this.sound.play('delete');
    }

    open() {
      this.modal.classList.add('active');
    }

    close() {
      this.modal.classList.remove('active');
    }

    render() {
      this.grid.innerHTML = '';
      this.shortcuts.forEach(item => {
        const card = document.createElement('a');
        card.className = 'shortcut-card';
        card.href = item.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        card.innerHTML = `
          <div class="shortcut-icon">${item.icon || '📌'}</div>
          <div class="shortcut-info">
            <span class="shortcut-name">${item.title}</span>
            <span class="shortcut-desc">${item.url.replace(/^https?:\/\//i, '').slice(0, 24)}</span>
          </div>
        `;

        // Silme butonu
        const btnDel = document.createElement('button');
        btnDel.className = 'shortcut-delete-btn';
        btnDel.textContent = '✕';
        btnDel.title = 'Kısayolu Sil';
        btnDel.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.deleteShortcut(item.id);
        });

        card.appendChild(btnDel);
        this.grid.appendChild(card);
      });
    }
  }

  /* ==========================================================================
     7. ÇÖP KUTUSU ETKİLEŞİMİ (SARSINTI VE TEMİZLEME)
     ========================================================================== */
  class TrashController {
    constructor(todoManager, soundEngine) {
      this.todoManager = todoManager;
      this.sound = soundEngine;
      this.trash = document.getElementById('trash-hotspot');

      this.init();
    }

    init() {
      this.trash.addEventListener('click', () => {
        this.triggerShake();
        const cleared = this.todoManager.clearCompleted();

        if (cleared > 0) {
          this.sound.play('trash');
          ToastManager.show(`🗑️ ${cleared} tamamlanmış görev temizlendi!`);
        } else {
          this.sound.play('blip');
          ToastManager.show('Temizlenecek tamamlanmış görev yok.');
        }
      });
    }

    triggerShake() {
      this.trash.classList.remove('shake');
      // Reflow tetiklemesi
      void this.trash.offsetWidth;
      this.trash.classList.add('shake');
      setTimeout(() => {
        this.trash.classList.remove('shake');
      }, 450);
    }
  }

  /* ==========================================================================
     8. DUVAR RAFI VE PİKSEL KLASÖRLER YÖNETİCİSİ (SHELF & BINDERS)
     ========================================================================== */
  class ShelfManager {
    constructor(soundEngine) {
      this.sound = soundEngine;
      this.storageKey = 'pixel_shelf_folders';
      this.folders = this.loadFolders();
      this.activeFolderId = null;

      this.wrapper = document.getElementById('shelf-binders-wrapper');
      
      // Klasör İçeriği Modalı
      this.modal = document.getElementById('folder-modal');
      this.modalTitle = document.getElementById('folder-modal-title');
      this.modalClose = document.getElementById('folder-modal-close-btn');
      this.itemsGrid = document.getElementById('folder-items-grid');
      this.itemForm = document.getElementById('folder-item-form');
      this.itemTitleInput = document.getElementById('folder-item-title');
      this.itemUrlInput = document.getElementById('folder-item-url');
      this.btnDeleteFolder = document.getElementById('btn-delete-folder');

      // Yeni Klasör Ekleme Modalı
      this.addModal = document.getElementById('add-binder-modal');
      this.addModalClose = document.getElementById('add-binder-close-btn');
      this.newBinderForm = document.getElementById('new-binder-form');
      this.newBinderName = document.getElementById('new-binder-name');
      this.newBinderColor = document.getElementById('new-binder-color');

      this.init();
    }

    init() {
      // Modal Kapatma Olayları
      this.modalClose.addEventListener('click', () => this.closeFolderModal());
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeFolderModal();
      });

      this.addModalClose.addEventListener('click', () => this.closeAddModal());
      this.addModal.addEventListener('click', (e) => {
        if (e.target === this.addModal) this.closeAddModal();
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeFolderModal();
          this.closeAddModal();
        }
      });

      // Klasöre Yeni Bağlantı Ekleme
      this.itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = this.itemTitleInput.value.trim();
        let url = this.itemUrlInput.value.trim();
        if (title && url && this.activeFolderId) {
          if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
          }
          this.addItemToFolder(this.activeFolderId, title, url);
          this.itemTitleInput.value = '';
          this.itemUrlInput.value = '';
        }
      });

      // Klasörü Silme Butonu
      this.btnDeleteFolder.addEventListener('click', () => {
        if (this.activeFolderId) {
          this.deleteFolder(this.activeFolderId);
          this.closeFolderModal();
        }
      });

      // Rafa Yeni Klasör Ekleme Formu
      this.newBinderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = this.newBinderName.value.trim().toUpperCase();
        const color = this.newBinderColor.value;
        if (name) {
          this.addFolder(name, color);
          this.newBinderName.value = '';
          this.closeAddModal();
        }
      });

      this.renderShelf();
    }

    loadFolders() {
      try {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [
          {
            id: 1,
            name: 'PROJELER',
            color: 'col-red',
            items: [
              { id: 101, title: 'GitHub', url: 'https://github.com' },
              { id: 102, title: 'Vercel', url: 'https://vercel.com' },
              { id: 103, title: 'Figma', url: 'https://figma.com' }
            ]
          },
          {
            id: 2,
            name: 'DERSLER',
            color: 'col-blue',
            items: [
              { id: 201, title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
              { id: 202, title: 'Stack Overflow', url: 'https://stackoverflow.com' }
            ]
          },
          {
            id: 3,
            name: 'NOTLAR',
            color: 'col-green',
            items: [
              { id: 301, title: 'Google Keep', url: 'https://keep.google.com' },
              { id: 302, title: 'Notion', url: 'https://notion.so' }
            ]
          },
          {
            id: 4,
            name: 'MEDYA',
            color: 'col-yellow',
            items: [
              { id: 401, title: 'YouTube Lofi', url: 'https://youtube.com' },
              { id: 402, title: 'Spotify', url: 'https://open.spotify.com' }
            ]
          }
        ];
      } catch (err) {
        return [];
      }
    }

    saveFolders() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.folders));
      } catch (err) {
        console.error('Klasörler kaydedilemedi:', err);
      }
      this.renderShelf();
    }

    renderShelf() {
      if (!this.wrapper) return;
      this.wrapper.innerHTML = '';

      this.folders.forEach(folder => {
        const binder = document.createElement('div');
        binder.className = `pixel-binder ${folder.color || 'col-red'}`;
        binder.title = `${folder.name} (${folder.items ? folder.items.length : 0} öğe)`;

        binder.innerHTML = `
          <div class="binder-label-tag">
            <span class="binder-label-text">${folder.name}</span>
          </div>
          <div class="binder-ring"></div>
          <div class="binder-tooltip">📁 ${folder.name} (${folder.items ? folder.items.length : 0})</div>
        `;

        binder.addEventListener('click', () => {
          this.sound.play('slide');
          this.openFolder(folder.id);
        });

        this.wrapper.appendChild(binder);
      });

      // + Yeni Klasör Ekle Butonu
      const btnAdd = document.createElement('div');
      btnAdd.className = 'shelf-add-binder-btn';
      btnAdd.title = 'Rafa Yeni Klasör Ekle';
      btnAdd.textContent = '+';
      btnAdd.addEventListener('click', () => {
        this.sound.play('blip');
        this.openAddModal();
      });
      this.wrapper.appendChild(btnAdd);
    }

    openFolder(folderId) {
      const folder = this.folders.find(f => f.id === folderId);
      if (!folder) return;
      this.activeFolderId = folderId;

      this.modalTitle.textContent = `📁 KLASÖR: ${folder.name} (${folder.items ? folder.items.length : 0})`;
      this.renderFolderItems();
      this.modal.classList.add('active');
    }

    closeFolderModal() {
      this.modal.classList.remove('active');
      this.activeFolderId = null;
    }

    openAddModal() {
      this.addModal.classList.add('active');
    }

    closeAddModal() {
      this.addModal.classList.remove('active');
    }

    renderFolderItems() {
      const folder = this.folders.find(f => f.id === this.activeFolderId);
      if (!folder) return;

      this.itemsGrid.innerHTML = '';

      if (!folder.items || folder.items.length === 0) {
        this.itemsGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: #777; font-style: italic; padding: 12px 0;">Bu klasör henüz boş...</div>';
        return;
      }

      folder.items.forEach(item => {
        const card = document.createElement('a');
        card.className = 'shortcut-card';
        card.href = item.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        card.innerHTML = `
          <div class="shortcut-icon">📄</div>
          <div class="shortcut-info">
            <span class="shortcut-name">${item.title}</span>
            <span class="shortcut-desc">${item.url.replace(/^https?:\/\//i, '').slice(0, 22)}</span>
          </div>
        `;

        const btnDel = document.createElement('button');
        btnDel.className = 'shortcut-delete-btn';
        btnDel.textContent = '✕';
        btnDel.title = 'Öğeyi Sil';
        btnDel.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.deleteItemFromFolder(this.activeFolderId, item.id);
        });

        card.appendChild(btnDel);
        this.itemsGrid.appendChild(card);
      });
    }

    addItemToFolder(folderId, title, url) {
      const folder = this.folders.find(f => f.id === folderId);
      if (!folder) return;
      if (!folder.items) folder.items = [];

      folder.items.push({
        id: Date.now(),
        title: title,
        url: url
      });

      this.saveFolders();
      this.renderFolderItems();
      this.modalTitle.textContent = `📁 KLASÖR: ${folder.name} (${folder.items.length})`;
      this.sound.play('add');
      ToastManager.show('Öğe klasöre eklendi!');
    }

    deleteItemFromFolder(folderId, itemId) {
      const folder = this.folders.find(f => f.id === folderId);
      if (!folder || !folder.items) return;

      folder.items = folder.items.filter(i => i.id !== itemId);
      this.saveFolders();
      this.renderFolderItems();
      this.modalTitle.textContent = `📁 KLASÖR: ${folder.name} (${folder.items.length})`;
      this.sound.play('delete');
    }

    addFolder(name, color) {
      const newFolder = {
        id: Date.now(),
        name: name,
        color: color || 'col-red',
        items: []
      };
      this.folders.push(newFolder);
      this.saveFolders();
      this.sound.play('done');
      ToastManager.show(`"${name}" klasörü rafa kondu!`);
    }

    deleteFolder(folderId) {
      const folder = this.folders.find(f => f.id === folderId);
      const name = folder ? folder.name : '';
      this.folders = this.folders.filter(f => f.id !== folderId);
      this.saveFolders();
      this.sound.play('trash');
      ToastManager.show(`"${name}" klasörü raftan kaldırıldı.`);
    }
  }

  /* ==========================================================================
     9. KOORDİNAT KALİBRATÖRÜ VE CANLI AYAR PANELİ
     ========================================================================== */
  class CalibratorManager {
    constructor(soundEngine) {
      this.sound = soundEngine;
      this.panel = document.getElementById('calibrator-panel');
      this.btnToggle = document.getElementById('btn-toggle-calibrator');
      this.btnClose = document.getElementById('calibrator-close');
      this.btnCopy = document.getElementById('btn-copy-css');

      this.sliders = {
        '--frame-left': document.getElementById('cal-frame-x'),
        '--frame-top': document.getElementById('cal-frame-y'),
        '--todo-left': document.getElementById('cal-todo-x'),
        '--todo-top': document.getElementById('cal-todo-y'),
        '--shelf-left': document.getElementById('cal-shelf-x'),
        '--shelf-top': document.getElementById('cal-shelf-y'),
        '--notebook-left': document.getElementById('cal-book-x'),
        '--notebook-top': document.getElementById('cal-book-y'),
        '--trash-left': document.getElementById('cal-trash-x'),
        '--trash-top': document.getElementById('cal-trash-y'),
      };

      this.init();
    }

    init() {
      this.btnToggle.addEventListener('click', () => {
        this.sound.play('blip');
        this.panel.classList.toggle('active');
        if (this.panel.classList.contains('active')) {
          this.syncSlidersFromCSS();
        }
      });

      this.btnClose.addEventListener('click', () => {
        this.panel.classList.remove('active');
      });

      // Slider değişimlerini CSS değişkenlerine yansıt
      Object.entries(this.sliders).forEach(([varName, slider]) => {
        if (!slider) return;
        slider.addEventListener('input', (e) => {
          const val = `${e.target.value}%`;
          document.documentElement.style.setProperty(varName, val);
        });
      });

      // CSS Kodlarını Panoya Kopyalama
      this.btnCopy.addEventListener('click', () => {
        const rootStyles = getComputedStyle(document.documentElement);
        const cssBlock = `:root {
  --frame-top: ${rootStyles.getPropertyValue('--frame-top').trim()};
  --frame-left: ${rootStyles.getPropertyValue('--frame-left').trim()};
  --frame-width: ${rootStyles.getPropertyValue('--frame-width').trim()};
  --frame-height: ${rootStyles.getPropertyValue('--frame-height').trim()};

  --todo-top: ${rootStyles.getPropertyValue('--todo-top').trim()};
  --todo-left: ${rootStyles.getPropertyValue('--todo-left').trim()};
  --todo-width: ${rootStyles.getPropertyValue('--todo-width').trim()};
  --todo-height: ${rootStyles.getPropertyValue('--todo-height').trim()};

  --shelf-top: ${rootStyles.getPropertyValue('--shelf-top').trim()};
  --shelf-left: ${rootStyles.getPropertyValue('--shelf-left').trim()};
  --shelf-width: ${rootStyles.getPropertyValue('--shelf-width').trim()};
  --shelf-height: ${rootStyles.getPropertyValue('--shelf-height').trim()};

  --notebook-top: ${rootStyles.getPropertyValue('--notebook-top').trim()};
  --notebook-left: ${rootStyles.getPropertyValue('--notebook-left').trim()};
  --notebook-width: ${rootStyles.getPropertyValue('--notebook-width').trim()};
  --notebook-height: ${rootStyles.getPropertyValue('--notebook-height').trim()};

  --trash-top: ${rootStyles.getPropertyValue('--trash-top').trim()};
  --trash-left: ${rootStyles.getPropertyValue('--trash-left').trim()};
  --trash-width: ${rootStyles.getPropertyValue('--trash-width').trim()};
  --trash-height: ${rootStyles.getPropertyValue('--trash-height').trim()};
}`;

        navigator.clipboard.writeText(cssBlock).then(() => {
          this.sound.play('done');
          ToastManager.show('CSS değişkenleri panoya kopyalandı!');
        }).catch(() => {
          console.log(cssBlock);
          ToastManager.show('Konsola yazdırıldı (Ctrl+Shift+I)');
        });
      });
    }

    syncSlidersFromCSS() {
      const computed = getComputedStyle(document.documentElement);
      Object.entries(this.sliders).forEach(([varName, slider]) => {
        if (!slider) return;
        const valStr = computed.getPropertyValue(varName).trim();
        const num = parseFloat(valStr) || 0;
        slider.value = num;
      });
    }
  }

  /* ==========================================================================
     10. HIZLI AYARLAR DOCK (SES & SCANLINE)
     ========================================================================== */
  function setupDock(soundEngine) {
    const btnSound = document.getElementById('btn-toggle-sound');
    const btnScanlines = document.getElementById('btn-toggle-scanlines');
    const scanlines = document.getElementById('scanlines');

    // Ses Durumu
    const updateSoundBtn = () => {
      btnSound.textContent = soundEngine.enabled ? '🔊 SES: AÇIK' : '🔇 SES: KAPALI';
    };
    updateSoundBtn();

    btnSound.addEventListener('click', () => {
      const isNowOn = soundEngine.toggle();
      updateSoundBtn();
      if (isNowOn) soundEngine.play('blip');
      ToastManager.show(isNowOn ? 'Ses efektleri açıldı' : 'Ses efektleri kapatıldı');
    });

    // Scanline Durumu
    let scanlineEnabled = localStorage.getItem('pixel_scanlines') !== 'false';
    const applyScanlines = () => {
      if (scanlines) {
        scanlines.style.display = scanlineEnabled ? 'block' : 'none';
      }
      btnScanlines.textContent = scanlineEnabled ? '📺 SCANLINE: AÇIK' : '📺 SCANLINE: KAPALI';
    };
    applyScanlines();

    btnScanlines.addEventListener('click', () => {
      scanlineEnabled = !scanlineEnabled;
      localStorage.setItem('pixel_scanlines', scanlineEnabled);
      applyScanlines();
      soundEngine.play('blip');
    });
  }

  /* ==========================================================================
     11. UYGULAMA BAŞLATICI (INITIALIZATION)
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const soundEngine = new RetroSoundEngine();
      const mediaManager = new MediaFrameManager(soundEngine);
      await mediaManager.init();

      const todoManager = new TodoManager(soundEngine);
      new ShelfManager(soundEngine);
      new NotebookManager(soundEngine);
      new TrashController(todoManager, soundEngine);
      new CalibratorManager(soundEngine);
      setupDock(soundEngine);

      console.log('Pixel Wallpaper başarıyla başlatıldı!');
    } catch (err) {
      console.error('Uygulama başlatma hatası:', err);
    }
  });

  // Lively Wallpaper Özellik Dinleyicisi (Entegrasyon Kancası)
  window.livelyPropertyListener = function (name, val) {
    if (name === 'soundVolume' && val === 0) {
      localStorage.setItem('pixel_sound_enabled', 'false');
    }
  };

})();
