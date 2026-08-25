// ======================== STATE ========================
let currentUser = null;
let currentRole = null;
let isRunning = false;
let isStopped = false;
let todayLimit = 0;
let currentColor = localStorage.getItem('themeColor') || 'yellow';
let savedAccounts = JSON.parse(localStorage.getItem('savedAccounts') || '[]');
let newsInterval = null;
let audio = null;
let audio2 = null;
let currentMusic = 'golden';
let loopCount = 1;
let loopRemaining = 0;
let videoPlayed = false;
let currentMode = localStorage.getItem('uiMode') || 'pixel';

// ======================== HANDLERS ========================
const HANDLERS = [
    'hrsbre', 'erafone', 'planetban', 'tuneup', 'hashmicro', 'klook',
    'internetrakyat', 'ultramilk', 'kaniva', 'jembatani', 'rcx',
    'sahabatteknisi', 'auto2000', 'astra', 'royalcanin',
    'watsons', '99co', 'belirumah', 'fastwork', 'beautyhaul',
    'hainaya', 'minumyukkaka', 'sidemang', 'lapormasbup', 'ptspkemenag'
];

// ======================== DOM REFS ========================
const $ = id => document.getElementById(id);
const loginPage = $('loginPage');
const loginUser = $('loginUser');
const loginPass = $('loginPass');
const loginBtn = $('loginBtn');
const savedList = $('savedList');
const robotStatus = $('robotStatus');
const robotIcon = $('robotIcon');
const skipLoadingBtn = $('skipLoadingBtn');
const loginVideo = $('loginVideo');
const videoPlayBtn = $('videoPlayBtn');
const phoneInput = $('phoneInput');
const startBtn = $('startBtn');
const stopBtn = $('stopBtn');
const loopCountSelect = $('loopCount');
const usernameDisplay = $('usernameDisplay');
const roleBubble = $('roleBubble');
const limitDisplay = $('limitDisplay');
const bannedOverlay = $('bannedOverlay');
const notifOverlay = $('notifOverlay');
const notifTitle = $('notifTitle');
const notifMessage = $('notifMessage');
const sidebar = $('sidebar');
const sidebarOverlay = $('sidebarOverlay');
const sidebarClose = $('sidebarClose');
const menuToggle = $('menuToggle');
const popupOverlay = $('popupOverlay');
const popupMessage = $('popupMessage');
const popupTitle = $('popupTitle');
const popupIcon = $('popupIcon');
const popupCloseBtn = $('popupCloseBtn');
const spamStatus = $('spamStatus');
const createUserInput = $('createUserInput');
const createPassInput = $('createPassInput');
const createRoleSelect = $('createRoleSelect');
const createUserBtn = $('createUserBtn');
const createResponse = $('createResponse');
const redeemInput = $('redeemInput');
const redeemBtn = $('redeemBtn');
const redeemResponse = $('redeemResponse');
const chatInput = $('chatInput');
const chatSendBtn = $('chatSendBtn');
const chatLog = $('chatLog');
const themeToggle = $('themeToggle');
const colorToggle = $('colorToggle');
const colorMenu = $('colorMenu');
const musicToggle = $('musicToggle');
const amEmailInput = $('amEmailInput');
const amSendBtn = $('amSendBtn');
const amSendResponse = $('amSendResponse');
const amLinkInput = $('amLinkInput');
const amVerifyBtn = $('amVerifyBtn');
const amVerifyResponse = $('amVerifyResponse');
const newsTrack = $('newsTrack');
const genFormContainer = $('genFormContainer');
const genResponse = $('genResponse');
const modePopup = $('modePopup');
const modeRealBtn = $('modeRealBtn');
const modePixelBtn = $('modePixelBtn');
const modeUIBtn = $('modeUIBtn');
const pageContainer = $('pageContainer');
const mainContainer = $('mainContainer');

// ======================== PAGES HTML ========================
const PAGES = {
    spam: `
        <div class="card">
            <div class="input-area">
                <div class="input-wrap">
                    <span class="prefix"><i class="fa-regular fa-phone"></i></span>
                    <input type="text" id="phoneInput" placeholder="62/08xxxxxxxxx" value="6281234567890">
                </div>
            </div>
            <div class="btn-spam-row">
                <button class="btn-pixel" id="startBtn"><span class="spinner"></span><span class="btn-text"><i class="fa-regular fa-paper-plane"></i> Spam OTP</span></button>
                <button class="btn-pixel btn-pixel-stop" id="stopBtn" disabled><span class="btn-text"><i class="fa-regular fa-stop"></i> Stop</span></button>
            </div>
            <div class="loop-control">
                <label><i class="fa-regular fa-arrows-rotate"></i> Mode Looping</label>
                <select id="loopCount">
                    <option value="1">1x</option>
                    <option value="2">2x</option>
                    <option value="3">3x</option>
                    <option value="4">4x</option>
                    <option value="5" selected>5x</option>
                </select>
            </div>
            <div id="spamStatus" style="margin-top:12px;font-size:13px;font-weight:700;color:var(--label);text-align:center;display:none;">
                <i class="fa-regular fa-spinner fa-spin"></i> Memproses...
            </div>
            <div class="news-slider" id="newsSlider">
                <div class="news-track" id="newsTrack">
                    <div class="news-item">
                        <div style="width:60px;height:60px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;background:var(--log-bg);border-radius:var(--radius);">
                            <i class="fa-regular fa-spinner fa-spin" style="font-size:24px;color:var(--yellow);"></i>
                        </div>
                        <div class="text"><span class="title">Memuat berita...</span></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    create: `
        <div class="card">
            <h3 style="margin-bottom:12px;font-size:16px;display:flex;gap:8px;align-items:center;color:var(--text);"><i class="fa-regular fa-user-plus" style="color:var(--yellow);"></i> Buat Akun</h3>
            <div class="input-wrap" style="display:flex;border:2px solid var(--border);overflow:hidden;margin-bottom:10px;border-radius:var(--radius);">
                <span class="prefix" style="padding:0 12px;background:var(--bg);border-right:2px solid var(--border);display:flex;align-items:center;min-height:46px;"><i class="fa-regular fa-user"></i></span>
                <input type="text" id="createUserInput" placeholder="Username" style="flex:1;padding:10px 14px;border:none;outline:none;font-size:14px;font-weight:600;color:var(--text);font-family:var(--font);min-height:46px;background:var(--input-bg);">
            </div>
            <div class="input-wrap" style="display:flex;border:2px solid var(--border);overflow:hidden;margin-bottom:10px;border-radius:var(--radius);">
                <span class="prefix" style="padding:0 12px;background:var(--bg);border-right:2px solid var(--border);display:flex;align-items:center;min-height:46px;"><i class="fa-regular fa-lock"></i></span>
                <input type="password" id="createPassInput" placeholder="Password" style="flex:1;padding:10px 14px;border:none;outline:none;font-size:14px;font-weight:600;color:var(--text);font-family:var(--font);min-height:46px;background:var(--input-bg);">
            </div>
            <div class="input-wrap" style="display:flex;border:2px solid var(--border);overflow:hidden;margin-bottom:10px;border-radius:var(--radius);">
                <span class="prefix" style="padding:0 12px;background:var(--bg);border-right:2px solid var(--border);display:flex;align-items:center;min-height:46px;"><i class="fa-regular fa-tag"></i></span>
                <select id="createRoleSelect" style="flex:1;padding:10px 14px;border:none;outline:none;font-size:14px;font-weight:600;color:var(--text);font-family:var(--font);min-height:46px;background:var(--input-bg);border-radius:var(--radius);">
                    <option value="member">Member</option>
                    <option value="resseler">Resseler</option>
                </select>
            </div>
            <button class="btn-pixel btn-pixel-success" id="createUserBtn"><i class="fa-regular fa-user-plus"></i> Buat Akun</button>
            <div class="response-box" id="createResponse"></div>
        </div>
    `,
    redeem: `
        <div class="card">
            <h3 style="margin-bottom:12px;font-size:16px;display:flex;gap:8px;align-items:center;color:var(--text);"><i class="fa-regular fa-ticket" style="color:var(--yellow);"></i> Redeem Kode</h3>
            <div class="input-wrap" style="display:flex;border:2px solid var(--border);overflow:hidden;margin-bottom:10px;border-radius:var(--radius);">
                <span class="prefix" style="padding:0 12px;background:var(--bg);border-right:2px solid var(--border);display:flex;align-items:center;min-height:46px;"><i class="fa-regular fa-ticket"></i></span>
                <input type="text" id="redeemInput" placeholder="Masukkan kode redeem" style="flex:1;padding:10px 14px;border:none;outline:none;font-size:14px;font-weight:600;color:var(--text);font-family:var(--font);min-height:46px;background:var(--input-bg);">
            </div>
            <button class="btn-pixel btn-pixel-success" id="redeemBtn"><i class="fa-regular fa-check"></i> Redeem</button>
            <div class="response-box" id="redeemResponse"></div>
        </div>
    `,
    chat: `
        <div class="card">
            <h3 style="margin-bottom:12px;font-size:16px;display:flex;gap:8px;align-items:center;color:var(--text);"><i class="fa-regular fa-comments" style="color:var(--yellow);"></i> Global Chat</h3>
            <div class="chat-log" id="chatLog">
                <div class="chat-empty"><i class="fa-regular fa-comment"></i> Belum ada pesan</div>
            </div>
            <div class="input-wrap" style="display:flex;border:2px solid var(--border);overflow:hidden;border-radius:var(--radius);">
                <span class="prefix" style="padding:0 12px;background:var(--bg);border-right:2px solid var(--border);display:flex;align-items:center;min-height:46px;"><i class="fa-regular fa-message"></i></span>
                <input type="text" id="chatInput" placeholder="Ketik pesan..." style="flex:1;padding:10px 14px;border:none;outline:none;font-size:14px;font-weight:600;color:var(--text);font-family:var(--font);min-height:46px;background:var(--input-bg);">
            </div>
            <button class="btn-pixel" id="chatSendBtn" style="margin-top:8px;"><i class="fa-regular fa-paper-plane"></i> Kirim</button>
        </div>
    `,
    alight: `
        <div class="card">
            <h3 style="margin-bottom:12px;font-size:16px;display:flex;gap:8px;align-items:center;color:var(--text);"><i class="fa-regular fa-video" style="color:var(--yellow);"></i> Alight Motion Premium</h3>
            <div class="am-step">
                <div class="step-title"><span class="num">1</span> Kirim Magic Link</div>
                <div class="tutorial"><i class="fa-regular fa-circle-info" style="color:var(--yellow);"></i> Tempel Alamat Gmail Kamu Untuk Menerima Link Alight Motion.</div>
                <div class="input-wrap">
                    <span class="prefix"><i class="fa-regular fa-envelope"></i></span>
                    <input type="email" id="amEmailInput" placeholder="Email kamu" value="raxzzgt4@gmail.com">
                </div>
                <button class="btn-pixel" id="amSendBtn"><span class="spinner"></span><span class="btn-text"><i class="fa-regular fa-paper-plane"></i> Kirim Magic Link</span></button>
                <div class="response-box" id="amSendResponse"></div>
            </div>
            <div class="am-step">
                <div class="step-title"><span class="num">2</span> Verifikasi Link</div>
                <div class="tutorial"><i class="fa-regular fa-circle-info" style="color:var(--yellow);"></i> Tempel link yang sudah dikirim di email noreply!</div>
                <div class="input-wrap">
                    <span class="prefix"><i class="fa-regular fa-link"></i></span>
                    <input type="text" id="amLinkInput" placeholder="Tempel link dari email" value="https://alightcreative.com/auth_action/?mode=signIn&oobCode=xxx&apiKey=AIzaSyDrZ9jr_Y16ltSBqsQR5IH6I04FRga6Ki0&lang=en">
                </div>
                <button class="btn-pixel btn-pixel-success" id="amVerifyBtn"><span class="spinner"></span><span class="btn-text"><i class="fa-regular fa-check"></i> Buka Premium!</span></button>
                <div class="response-box" id="amVerifyResponse"></div>
            </div>
        </div>
    `,
    generator: `
        <div class="card">
            <h3 style="margin-bottom:12px;font-size:16px;display:flex;gap:8px;align-items:center;color:var(--text);"><i class="fa-regular fa-wand-magic-sparkles" style="color:var(--yellow);"></i> Generator Fake</h3>
            <div class="gen-grid" id="genGrid">
                <div class="gen-card" data-gen="dana">
                    <div class="icon"><i class="fa-regular fa-wallet"></i></div>
                    <div class="name">Dana</div>
                </div>
                <div class="gen-card" data-gen="gopay">
                    <div class="icon"><i class="fa-regular fa-money-bill-wave"></i></div>
                    <div class="name">Gopay</div>
                </div>
                <div class="gen-card" data-gen="ovo">
                    <div class="icon"><i class="fa-regular fa-credit-card"></i></div>
                    <div class="name">Ovo</div>
                </div>
            </div>
            <div id="genFormContainer" style="margin-top:12px;"></div>
            <div class="response-box" id="genResponse"></div>
        </div>
    `
};

// ======================== PAGE LOADER ========================
function loadPage(name) {
    if (PAGES[name]) {
        pageContainer.innerHTML = PAGES[name];
        // Re-bind DOM refs after page load
        bindPageElements(name);
        // Show page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const pageEl = document.createElement('div');
        pageEl.className = 'page active';
        pageEl.id = 'page-' + name;
        pageEl.innerHTML = pageContainer.innerHTML;
        pageContainer.innerHTML = '';
        pageContainer.appendChild(pageEl);
        // Init page specific logic
        initPage(name);
    }
}

function bindPageElements(name) {
    // Re-assign dynamic elements
    if (name === 'spam') {
        window.phoneInput = document.getElementById('phoneInput');
        window.startBtn = document.getElementById('startBtn');
        window.stopBtn = document.getElementById('stopBtn');
        window.loopCountSelect = document.getElementById('loopCount');
        window.spamStatus = document.getElementById('spamStatus');
        window.newsTrack = document.getElementById('newsTrack');
    }
    if (name === 'create') {
        window.createUserInput = document.getElementById('createUserInput');
        window.createPassInput = document.getElementById('createPassInput');
        window.createRoleSelect = document.getElementById('createRoleSelect');
        window.createUserBtn = document.getElementById('createUserBtn');
        window.createResponse = document.getElementById('createResponse');
    }
    if (name === 'redeem') {
        window.redeemInput = document.getElementById('redeemInput');
        window.redeemBtn = document.getElementById('redeemBtn');
        window.redeemResponse = document.getElementById('redeemResponse');
    }
    if (name === 'chat') {
        window.chatInput = document.getElementById('chatInput');
        window.chatSendBtn = document.getElementById('chatSendBtn');
        window.chatLog = document.getElementById('chatLog');
    }
    if (name === 'alight') {
        window.amEmailInput = document.getElementById('amEmailInput');
        window.amSendBtn = document.getElementById('amSendBtn');
        window.amSendResponse = document.getElementById('amSendResponse');
        window.amLinkInput = document.getElementById('amLinkInput');
        window.amVerifyBtn = document.getElementById('amVerifyBtn');
        window.amVerifyResponse = document.getElementById('amVerifyResponse');
    }
    if (name === 'generator') {
        window.genFormContainer = document.getElementById('genFormContainer');
        window.genResponse = document.getElementById('genResponse');
    }
}

function initPage(name) {
    if (name === 'spam') {
        // Re-bind spam events
        if (window.startBtn) {
            window.startBtn.addEventListener('click', startSpam);
        }
        if (window.stopBtn) {
            window.stopBtn.addEventListener('click', stopSpam);
        }
        if (window.phoneInput) {
            window.phoneInput.addEventListener('keydown', e => {
                if (e.key === 'Enter' && !window.startBtn.disabled) startSpam();
            });
        }
        loadNews();
        // Re-bind gen cards
        document.querySelectorAll('.gen-card').forEach(el => {
            el.addEventListener('click', function() {
                const gen = this.dataset.gen;
                if (gen) {
                    currentGen = gen;
                    renderGenForm(gen);
                }
            });
        });
    }
    if (name === 'create') {
        if (window.createUserBtn) {
            window.createUserBtn.addEventListener('click', createUser);
        }
    }
    if (name === 'redeem') {
        if (window.redeemBtn) {
            window.redeemBtn.addEventListener('click', redeemCode);
        }
    }
    if (name === 'chat') {
        if (window.chatSendBtn) {
            window.chatSendBtn.addEventListener('click', sendChatMessage);
        }
        if (window.chatInput) {
            window.chatInput.addEventListener('keydown', e => {
                if (e.key === 'Enter') sendChatMessage();
            });
        }
        loadChatMessages();
    }
    if (name === 'alight') {
        if (window.amSendBtn) {
            window.amSendBtn.addEventListener('click', sendMagicLink);
        }
        if (window.amVerifyBtn) {
            window.amVerifyBtn.addEventListener('click', verifyMagicLink);
        }
    }
    if (name === 'generator') {
        renderGenForm('dana');
        document.querySelectorAll('.gen-card').forEach(el => {
            el.addEventListener('click', function() {
                const gen = this.dataset.gen;
                if (gen) {
                    currentGen = gen;
                    renderGenForm(gen);
                }
            });
        });
    }
}

// ======================== NAVIGATION ========================
document.querySelectorAll('.side-item[data-page]').forEach(el => {
    el.addEventListener('click', () => {
        if (!currentUser && el.dataset.page !== 'login') {
            alert('Login dulu!');
            return;
        }
        showPage(el.dataset.page);
    });
});

function showPage(name) {
    if (name === 'login') {
        loginPage.classList.remove('hidden');
        document.querySelector('.header').style.display = 'none';
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.footer').style.display = 'none';
        return;
    }
    loginPage.classList.add('hidden');
    document.querySelector('.header').style.display = 'block';
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
    loadPage(name);
    closeSidebar();
}

// ======================== SIDEBAR ========================
function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
}
function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
}
menuToggle.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// ======================== LOGIN ========================
loginBtn.addEventListener('click', async () => {
    const user = loginUser.value.trim();
    const pass = loginPass.value.trim();
    if (!user || !pass) {
        updateRobotStatus('Isi username dan password!', 'error');
        return;
    }
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    updateRobotStatus('Memeriksa akun...', 'info');

    const snap = await db.ref('users/' + user).once('value');
    const data = snap.val();
    if (!data) {
        updateRobotStatus('Username Atau Pasword Salah, Silakan Beli Ke @xraxzzv13', 'error');
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        return;
    }
    if (data.password !== pass) {
        updateRobotStatus('Username Atau Pasword Salah, Silakan Beli Ke @xraxzzv13', 'error');
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        return;
    }
    if (data.banned) {
        bannedOverlay.classList.add('active');
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        return;
    }
    updateRobotStatus('Username Kamu Benar, Tunggu Sebentar', 'success');
    setTimeout(() => {
        addSavedAccount(user);
        loginSuccess(user, data);
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
    }, 1000);
});

function loginSuccess(user, data) {
    currentUser = user;
    currentRole = data.role || 'member';
    usernameDisplay.textContent = user;
    roleBubble.textContent = currentRole.toUpperCase();
    roleBubble.className = 'role-bubble role-' + currentRole;
    if (loginLoadingInterval) clearInterval(loginLoadingInterval);
    showPage('spam');
    checkLimit();
    checkNotif();
    loginUser.value = '';
    loginPass.value = '';
    renderSavedAccounts();
    console.log('🔥 XraxzzSpamOtp loaded, Tuan!');
}

// ======================== LOGOUT ========================
document.getElementById('sidebarLogout').addEventListener('click', logout);
document.getElementById('bannedLogoutBtn').addEventListener('click', logout);

function logout() {
    currentUser = null;
    currentRole = null;
    usernameDisplay.textContent = 'Guest';
    roleBubble.textContent = 'GUEST';
    roleBubble.className = 'role-bubble';
    limitDisplay.textContent = '0';
    bannedOverlay.classList.remove('active');
    showPage('login');
    closeSidebar();
    // Reset video
    videoPlayBtn.classList.remove('hidden');
    loginVideo.pause();
    loginVideo.currentTime = 0;
    setTimeout(() => {
        loginVideo.play().catch(() => {});
    }, 500);
}

// ======================== VIDEO LOGIN ========================
videoPlayBtn.addEventListener('click', () => {
    if (loginVideo.paused) {
        loginVideo.play();
        videoPlayBtn.classList.add('hidden');
    }
});

loginVideo.addEventListener('play', () => {
    videoPlayBtn.classList.add('hidden');
    videoPlayed = true;
});

loginVideo.addEventListener('pause', () => {
    if (!loginVideo.ended) {
        videoPlayBtn.classList.remove('hidden');
    }
});

// Auto play
setTimeout(() => {
    loginVideo.play().catch(() => {
        videoPlayBtn.classList.remove('hidden');
    });
}, 500);

// ======================== LOGIN LOADING ========================
let loginLoadingInterval = null;
let loginLoadingStep = 0;
const loginMessages = [
    { msg: 'Username Kamu Benar, Tunggu Sebentar', type: 'success' },
    { msg: 'Username Atau Pasword Salah, Silakan Beli Ke @xraxzzv13', type: 'error' }
];

function startLoginLoading() {
    loginLoadingStep = 0;
    if (loginLoadingInterval) clearInterval(loginLoadingInterval);
    loginLoadingInterval = setInterval(() => {
        loginLoadingStep = (loginLoadingStep + 1) % loginMessages.length;
        const m = loginMessages[loginLoadingStep];
        updateRobotStatus(m.msg, m.type);
    }, 3000);
    updateRobotStatus(loginMessages[0].msg, loginMessages[0].type);
}

function updateRobotStatus(msg, type = 'info') {
    robotStatus.textContent = msg;
    robotStatus.className = 'robot-status ' + type;
    if (type === 'info') { robotIcon.style.color = '#3b82f6'; }
    else if (type === 'success') { robotIcon.style.color = '#10b981'; }
    else if (type === 'error') { robotIcon.style.color = '#ef4444'; }
}

skipLoadingBtn.addEventListener('click', () => {
    if (loginLoadingInterval) clearInterval(loginLoadingInterval);
    showPage('spam');
    checkLimit();
    checkNotif();
    loadNews();
    renderSavedAccounts();
    console.log('🔥 XraxzzSpamOtp loaded (skip), Tuan!');
});

// ======================== SAVED ACCOUNTS ========================
function renderSavedAccounts() {
    if (!savedList) return;
    if (savedAccounts.length === 0) {
        savedList.innerHTML = '<div style="font-size:11px;color:#4a5568;padding:4px 0;">Belum ada akun tersimpan</div>';
        return;
    }
    let html = '';
    savedAccounts.forEach((acc, idx) => {
        html += `
            <div class="acc-item" data-idx="${idx}">
                <span><i class="fa-regular fa-user"></i> ${acc}</span>
                <span class="del" data-idx="${idx}"><i class="fa-regular fa-xmark"></i></span>
            </div>
        `;
    });
    savedList.innerHTML = html;

    savedList.querySelectorAll('.acc-item').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('.del')) return;
            const idx = parseInt(el.dataset.idx);
            const user = savedAccounts[idx];
            if (user) {
                loginUser.value = user;
                loginPass.value = '';
                loginPass.focus();
                updateRobotStatus('Username ditemukan! Masukkan password.', 'success');
            }
        });
        el.querySelector('.del').addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(e.target.closest('.del').dataset.idx);
            savedAccounts.splice(idx, 1);
            localStorage.setItem('savedAccounts', JSON.stringify(savedAccounts));
            renderSavedAccounts();
        });
    });
}

function addSavedAccount(user) {
    if (!savedAccounts.includes(user)) {
        savedAccounts.push(user);
        localStorage.setItem('savedAccounts', JSON.stringify(savedAccounts));
        renderSavedAccounts();
    }
}

// ======================== THEME ========================
let darkMode = localStorage.getItem('darkMode') === 'true';
if (darkMode) document.body.classList.add('dark');
themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', darkMode);
    themeToggle.innerHTML = darkMode ? '<i class="fa-regular fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';
});
themeToggle.innerHTML = darkMode ? '<i class="fa-regular fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';

// ======================== COLOR THEME ========================
const colorMap = {
    yellow: { main: '#fbbf24', hover: '#f59e0b' },
    red: { main: '#ef4444', hover: '#dc2626' },
    green: { main: '#10b981', hover: '#059669' },
    blue: { main: '#3b82f6', hover: '#2563eb' },
    orange: { main: '#f59e0b', hover: '#d97706' },
    gray: { main: '#94a3b8', hover: '#64748b' },
    rainbow: { main: 'linear-gradient(135deg,#ef4444,#f59e0b,#fbbf24,#10b981,#3b82f6,#8b5cf6)', hover: 'linear-gradient(135deg,#dc2626,#d97706,#f59e0b,#059669,#2563eb,#7c3aed)' }
};

function applyColor(color) {
    currentColor = color;
    localStorage.setItem('themeColor', color);
    const c = colorMap[color] || colorMap.yellow;
    if (color === 'rainbow') {
        document.documentElement.style.setProperty('--yellow', '#fbbf24');
        document.documentElement.style.setProperty('--yellow-hover', '#f59e0b');
        document.querySelectorAll('.btn-pixel, .menu-toggle, .theme-toggle, .color-toggle, .music-toggle, .sidebar .side-item:hover, .gen-card:hover, .login-page .btn-pixel-login:hover').forEach(el => {
            el.style.background = 'linear-gradient(135deg,#ef4444,#f59e0b,#fbbf24,#10b981,#3b82f6,#8b5cf6)';
        });
    } else {
        document.documentElement.style.setProperty('--yellow', c.main);
        document.documentElement.style.setProperty('--yellow-hover', c.hover);
        document.querySelectorAll('.btn-pixel, .menu-toggle, .theme-toggle, .color-toggle, .music-toggle, .sidebar .side-item:hover, .gen-card:hover').forEach(el => {
            el.style.background = '';
        });
    }
    if (darkMode && color !== 'rainbow') {
        document.documentElement.style.setProperty('--border', c.main);
        document.documentElement.style.setProperty('--shadow', c.main);
    }
    colorMenu.querySelectorAll('.color-opt').forEach(el => {
        el.style.border = el.dataset.color === color ? '2px solid #1a1a2e' : '2px solid var(--border)';
    });
}

colorToggle.addEventListener('click', () => colorMenu.classList.toggle('open'));
document.addEventListener('click', (e) => {
    if (!colorToggle.contains(e.target) && !colorMenu.contains(e.target)) colorMenu.classList.remove('open');
});
colorMenu.querySelectorAll('.color-opt').forEach(el => {
    el.addEventListener('click', () => {
        applyColor(el.dataset.color);
        colorMenu.classList.remove('open');
    });
});
applyColor(currentColor);

// ======================== BACKGROUND ========================
document.querySelectorAll('.bg-opt').forEach(el => {
    el.addEventListener('click', () => {
        const url = el.dataset.bg;
        if (url === 'default') {
            document.documentElement.style.setProperty('--bg-image', 'none');
        } else {
            document.documentElement.style.setProperty('--bg-image', `url('${url}')`);
        }
        document.documentElement.style.setProperty('--bg-size', 'cover');
        document.documentElement.style.setProperty('--bg-position', 'center');
    });
});

// ======================== MUSIC ========================
let isPlaying = false;
musicToggle.addEventListener('click', () => {
    if (!audio) {
        audio = new Audio('https://files.catbox.moe/r2w580.mp3');
        audio.loop = true;
        audio2 = new Audio('https://files.catbox.moe/drnjud.mp3');
        audio2.loop = true;
    }
    if (isPlaying) {
        audio.pause();
        audio2.pause();
        isPlaying = false;
        musicToggle.innerHTML = '<i class="fa-regular fa-music"></i>';
    } else {
        const choice = confirm('Pilih musik:\nOK = Sesi Potret\nCancel = Golden Brown');
        if (choice) {
            audio2.pause();
            audio.currentTime = 0;
            audio.play().catch(() => {});
            currentMusic = 'sesi';
        } else {
            audio.pause();
            audio2.currentTime = 0;
            audio2.play().catch(() => {});
            currentMusic = 'golden';
        }
        isPlaying = true;
        musicToggle.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
    }
});

// ======================== MODE UI ========================
function applyMode(mode) {
    currentMode = mode;
    localStorage.setItem('uiMode', mode);
    document.body.classList.remove('mode-real');
    if (mode === 'real') {
        document.body.classList.add('mode-real');
        modeRealBtn.classList.add('active');
        modePixelBtn.classList.remove('active');
    } else {
        modeRealBtn.classList.remove('active');
        modePixelBtn.classList.add('active');
    }
    modePopup.classList.remove('active');
}

modeRealBtn.addEventListener('click', () => applyMode('real'));
modePixelBtn.addEventListener('click', () => applyMode('pixel'));
modeUIBtn.addEventListener('click', () => modePopup.classList.toggle('active'));
modePopup.addEventListener('click', (e) => {
    if (e.target === modePopup) modePopup.classList.remove('active');
});
applyMode(currentMode);

// ======================== NOTIF ========================
async function checkNotif() {
    const snap = await db.ref('notifications').orderByKey().limitToLast(1).once('value');
    const data = snap.val();
    if (data) {
        const keys = Object.keys(data);
        const last = data[keys[keys.length - 1]];
        if (last && !last.read) {
            notifTitle.textContent = last.title || 'Pemberitahuan';
            notifMessage.textContent = last.message || 'Pesan dari admin';
            notifOverlay.classList.add('active');
            await db.ref('notifications/' + keys[keys.length - 1]).update({ read: true });
        }
    }
}
document.getElementById('notifCloseBtn').addEventListener('click', () => notifOverlay.classList.remove('active'));

// ======================== POPUP ========================
function showPopup(title, msg, isSuccess = true) {
    popupTitle.textContent = title || 'Berhasil!';
    popupMessage.textContent = msg || 'Proses berhasil dilakukan.';
    popupIcon.innerHTML = isSuccess ? '<i class="fa-regular fa-circle-check"></i>' : '<i class="fa-regular fa-circle-xmark"></i>';
    popupIcon.className = 'icon-big' + (isSuccess ? '' : ' failed');
    popupOverlay.classList.add('active');
}
popupCloseBtn.addEventListener('click', () => popupOverlay.classList.remove('active'));
popupOverlay.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) popupOverlay.classList.remove('active');
});

// ======================== RESPONSE HELPER ========================
function showResp(el, msg, type) {
    el.textContent = msg;
    el.className = 'response-box show ' + type;
    setTimeout(() => { el.className = 'response-box'; }, 6000);
}

// ======================== SPAM FUNCTIONS ========================
function formatPhone(input) {
    let cleaned = input.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = '62' + cleaned.substring(1);
    if (!cleaned.startsWith('62')) cleaned = '62' + cleaned;
    return cleaned;
}

async function sendOTP(phone) {
    try {
        const url = `https://api.alwayscodex.eu.cc/api/tools/spam-otp?number=${phone}`;
        const resp = await fetch(url);
        const data = await resp.json();
        return data && data.status === 'success';
    } catch { return false; }
}

async function startSpam() {
    if (!currentUser) { alert('Login dulu!'); return; }
    if (todayLimit <= 0) { alert('Limit habis!'); return; }
    const raw = document.getElementById('phoneInput')?.value?.trim();
    if (!raw) { alert('Masukkan nomor!'); return; }
    const phone = formatPhone(raw);
    if (phone.length < 10) { alert('Nomor tidak valid!'); return; }

    loopCount = parseInt(document.getElementById('loopCount')?.value) || 1;
    const canUse = await useLimit();
    if (!canUse) { alert('Limit habis!'); return; }

    isRunning = true;
    isStopped = false;
    const startBtnEl = document.getElementById('startBtn');
    const stopBtnEl = document.getElementById('stopBtn');
    const spamStatusEl = document.getElementById('spamStatus');

    startBtnEl.disabled = true;
    startBtnEl.classList.add('loading');
    stopBtnEl.disabled = false;
    spamStatusEl.style.display = 'block';

    let success = false;

    for (let loop = 0; loop < loopCount && isRunning && !isStopped; loop++) {
        spamStatusEl.innerHTML = `<i class="fa-regular fa-spinner fa-spin"></i> Loop ${loop+1}/${loopCount} ...`;

        try {
            const restResult = await sendOTP(phone);
            if (restResult) success = true;
        } catch (e) {}

        for (let i = 0; i < HANDLERS.length && isRunning && !isStopped; i++) {
            try {
                const result = await sendOTP(phone);
                if (result) success = true;
            } catch (e) {}
            if (isStopped) break;
            await new Promise(r => setTimeout(r, 150 + Math.random() * 250));
        }
    }

    startBtnEl.disabled = false;
    startBtnEl.classList.remove('loading');
    stopBtnEl.disabled = true;
    isRunning = false;
    spamStatusEl.style.display = 'none';

    if (!isStopped) {
        if (success) {
            showPopup('Spam OTP Berhasil!', `${loopCount}x spam ke ${phone} berhasil!`);
        } else {
            showPopup('Spam OTP Gagal!', `Gagal mengirim OTP ke ${phone}`, false);
        }
    }
}

function stopSpam() {
    if (isRunning) { isStopped = true;
        document.getElementById('stopBtn').disabled = true; }
}

// ======================== LIMIT ========================
async function checkLimit() {
    if (!currentUser) return;
    const snap = await db.ref('users/' + currentUser).once('value');
    const data = snap.val();
    if (!data) return;
    const today = new Date().toDateString();
    if (data.limitDate !== today) {
        await db.ref('users/' + currentUser).update({ limit: 3, limitDate: today });
        todayLimit = 3;
    } else {
        todayLimit = data.limit || 0;
    }
    limitDisplay.textContent = todayLimit;
    const startBtnEl = document.getElementById('startBtn');
    if (startBtnEl) startBtnEl.disabled = todayLimit <= 0;
}

async function useLimit() {
    if (!currentUser) return false;
    const snap = await db.ref('users/' + currentUser).once('value');
    const data = snap.val();
    if (!data) return false;
    const today = new Date().toDateString();
    let limit = data.limit || 0;
    if (data.limitDate !== today) { limit = 3;
        await db.ref('users/' + currentUser).update({ limit: 3, limitDate: today }); }
    if (limit <= 0) return false;
    await db.ref('users/' + currentUser).update({ limit: limit - 1 });
    todayLimit = limit - 1;
    limitDisplay.textContent = todayLimit;
    const startBtnEl = document.getElementById('startBtn');
    if (startBtnEl) startBtnEl.disabled = todayLimit <= 0;
    return true;
}

// ======================== NEWS ========================
async function loadNews() {
    const track = document.getElementById('newsTrack');
    if (!track) return;
    try {
        const resp = await fetch('https://api.alwayscodex.eu.cc/api/search/infopublik');
        const data = await resp.json();
        if (data && data.data && data.data.length > 0) {
            const items = data.data.slice(0, 10);
            track.innerHTML = items.map(item => `
                <div class="news-item">
                    <img src="${item.thumbnail || item.image || 'https://via.placeholder.com/60'}" alt="news" onerror="this.src='https://via.placeholder.com/60'">
                    <div class="text">
                        <span class="title">${item.title || 'Berita'}</span>
                        ${item.description || item.content || ''}
                    </div>
                </div>
            `).join('');

            let idx = 0;
            if (newsInterval) clearInterval(newsInterval);
            newsInterval = setInterval(() => {
                idx = (idx + 1) % items.length;
                track.style.transform = `translateX(-${idx * 100}%)`;
            }, 4000);
        } else {
            track.innerHTML = `
                <div class="news-item">
                    <div style="width:60px;height:60px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;background:var(--log-bg);border-radius:var(--radius);">
                        <i class="fa-regular fa-circle-exclamation" style="font-size:24px;color:#ef4444;"></i>
                    </div>
                    <div class="text"><span class="title">Tidak ada berita</span></div>
                </div>
            `;
        }
    } catch (e) {
        track.innerHTML = `
            <div class="news-item">
                <div style="width:60px;height:60px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;background:var(--log-bg);border-radius:var(--radius);">
                    <i class="fa-regular fa-circle-exclamation" style="font-size:24px;color:#ef4444;"></i>
                </div>
                <div class="text"><span class="title">Gagal memuat berita</span></div>
            </div>
        `;
    }
}

// ======================== CREATE USER ========================
async function createUser() {
    if (!currentUser) { alert('Login dulu!'); return; }
    const roleData = await db.ref('users/' + currentUser).once('value');
    const myRole = roleData.val()?.role || 'member';
    const user = document.getElementById('createUserInput')?.value?.trim();
    const pass = document.getElementById('createPassInput')?.value?.trim();
    const newRole = document.getElementById('createRoleSelect')?.value;
    const resp = document.getElementById('createResponse');

    if (!user || user.length < 3 || !pass || pass.length < 3) {
        showResp(resp, 'Username & password min 3 karakter!', 'error');
        return;
    }
    if (myRole === 'member') {
        showResp(resp, 'Role Member tidak bisa membuat akun!', 'error');
        return;
    }
    if (myRole === 'resseler' && newRole !== 'member') {
        showResp(resp, 'Resseler hanya bisa membuat akun Member!', 'error');
        return;
    }
    const snap = await db.ref('users/' + user).once('value');
    if (snap.exists()) { showResp(resp, 'Username sudah ada!', 'error'); return; }
    await db.ref('users/' + user).set({
        password: pass,
        role: newRole,
        banned: false,
        limit: 3,
        limitDate: new Date().toDateString(),
        created: new Date().toISOString()
    });
    showResp(resp, '✅ Akun ' + user + ' (' + newRole + ') berhasil dibuat!', 'success');
    document.getElementById('createUserInput').value = '';
    document.getElementById('createPassInput').value = '';
}

// ======================== REDEEM ========================
async function redeemCode() {
    if (!currentUser) { alert('Login dulu!'); return; }
    const code = document.getElementById('redeemInput')?.value?.trim()?.toUpperCase();
    const resp = document.getElementById('redeemResponse');
    if (!code) { showResp(resp, 'Masukkan kode!', 'error'); return; }
    const snap = await db.ref('redeems/' + code).once('value');
    const data = snap.val();
    if (!data) { showResp(resp, 'Kode tidak valid!', 'error'); return; }
    if (data.used >= data.max) { showResp(resp, 'Kode sudah habis!', 'error'); return; }
    const userSnap = await db.ref('users/' + currentUser).once('value');
    const userData = userSnap.val();
    const currentLimit = userData.limit || 0;
    await db.ref('users/' + currentUser).update({ limit: currentLimit + data.limit });
    await db.ref('redeems/' + code).update({ used: data.used + 1 });
    showResp(resp, '✅ Berhasil! +' + data.limit + ' limit', 'success');
    document.getElementById('redeemInput').value = '';
    checkLimit();
}

// ======================== CHAT ========================
async function sendChatMessage() {
    if (!currentUser) { alert('Login dulu!'); return; }
    const msg = document.getElementById('chatInput')?.value?.trim();
    if (!msg) return;
    await db.ref('chats').push({ user: currentUser, message: msg, role: currentRole, time: new Date().toISOString() });
    document.getElementById('chatInput').value = '';
}

function loadChatMessages() {
    const log = document.getElementById('chatLog');
    if (!log) return;
    db.ref('chats').limitToLast(50).off();
    db.ref('chats').limitToLast(50).on('child_added', snap => {
        const data = snap.val();
        if (!data) return;
        const empty = log.querySelector('.chat-empty');
        if (empty) empty.remove();
        const el = document.createElement('div');
        el.className = 'chat-item';
        el.innerHTML = `
            <span><i class="fa-regular fa-comment" style="color:var(--yellow);"></i></span>
            <span style="font-weight:700;">${data.user}</span>
            <span style="font-size:9px;color:var(--label);">(${data.role})</span>
            <span style="margin-left:auto;font-size:10px;color:var(--label);">${data.message}</span>
        `;
        log.appendChild(el);
        log.scrollTop = log.scrollHeight;
    });
}

// ======================== GENERATOR ========================
const genConfigs = {
    dana: {
        title: 'Fake Saldo Dana',
        endpoint: 'https://api.alwayscodex.eu.cc/api/maker/saldo-dana',
        fields: [{ id: 'saldo', label: 'Saldo', placeholder: '100' }]
    },
    gopay: {
        title: 'Fake Saldo Gopay',
        endpoint: 'https://api.alwayscodex.eu.cc/api/maker/saldo-gopay',
        fields: [
            { id: 'saldo', label: 'Saldo', placeholder: '890' },
            { id: 'koin', label: 'Koin', placeholder: '159' },
            { id: 'terpakai', label: 'Terpakai', placeholder: '0' },
            { id: 'bulan', label: 'Bulan', placeholder: 'Mei' }
        ]
    },
    ovo: {
        title: 'Fake Saldo Ovo',
        endpoint: 'https://api.alwayscodex.eu.cc/api/maker/saldo-ovo',
        fields: [{ id: 'saldo', label: 'Saldo', placeholder: '5000002828' }]
    }
};

let currentGen = 'dana';

function renderGenForm(gen) {
    const container = document.getElementById('genFormContainer');
    const resp = document.getElementById('genResponse');
    if (!container) return;
    const config = genConfigs[gen];
    if (!config) return;
    let html = `
        <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:8px;"><i class="fa-regular fa-wand-magic-sparkles" style="color:var(--yellow);"></i> ${config.title}</div>
        <div class="gen-form">
    `;
    config.fields.forEach(f => {
        html += `
            <div class="input-wrap">
                <span class="prefix">${f.label}</span>
                <input type="text" id="gen_${f.id}" placeholder="${f.placeholder}" value="${f.placeholder}">
            </div>
        `;
    });
    html += `
            <button class="btn-pixel btn-pixel-success" id="genSubmitBtn"><i class="fa-regular fa-wand-magic-sparkles"></i> Generate</button>
        </div>
    `;
    container.innerHTML = html;

    document.getElementById('genSubmitBtn').addEventListener('click', () => handleGenerate(gen));
}

async function handleGenerate(gen) {
    const config = genConfigs[gen];
    if (!config) return;
    const resp = document.getElementById('genResponse');

    const params = new URLSearchParams();
    let valid = true;
    config.fields.forEach(f => {
        const val = document.getElementById('gen_' + f.id)?.value?.trim() || f.placeholder;
        if (!val) valid = false;
        params.append(f.id, val);
    });

    if (!valid) { showResp(resp, 'Isi semua field!', 'error'); return; }

    const btn = document.getElementById('genSubmitBtn');
    btn.disabled = true;
    btn.classList.add('loading');
    resp.className = 'response-box';
    resp.style.display = 'none';

    try {
        const url = config.endpoint + '?' + params.toString();
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.status === 'success' && data.data && data.data.url) {
            showPopup('Generate Berhasil!', 'Fake ' + gen + ' berhasil dibuat!');
            showResp(resp, '✅ Berhasil! URL: ' + data.data.url, 'success');
        } else if (data && data.url) {
            showPopup('Generate Berhasil!', 'Fake ' + gen + ' berhasil dibuat!');
            showResp(resp, '✅ Berhasil! URL: ' + data.url, 'success');
        } else {
            showPopup('Generate Gagal!', 'Gagal membuat fake ' + gen, false);
            showResp(resp, '❌ Gagal: ' + JSON.stringify(data), 'error');
        }
    } catch (e) {
        showPopup('Generate Gagal!', 'Error: ' + e.message, false);
        showResp(resp, '❌ Error: ' + e.message, 'error');
    }

    btn.disabled = false;
    btn.classList.remove('loading');
}

// ======================== ALIGHT MOTION ========================
async function sendMagicLink() {
    if (!currentUser) { alert('Login dulu!'); return; }
    if (todayLimit <= 0) { alert('Limit habis!'); return; }

    const canUse = await useLimit();
    if (!canUse) { alert('Limit habis!'); return; }

    const email = document.getElementById('amEmailInput')?.value?.trim();
    const resp = document.getElementById('amSendResponse');
    if (!email || !email.includes('@')) {
        showResp(resp, 'Masukkan email yang valid!', 'error');
        return;
    }
    const btn = document.getElementById('amSendBtn');
    btn.classList.add('loading');
    btn.disabled = true;
    try {
        const url = `https://api.alwayscodex.eu.cc/api/am/sendv2?email=${encodeURIComponent(email)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.status === 'success') {
            showResp(resp, '✅ Magic link berhasil dikirim ke ' + email, 'success');
        } else {
            showResp(resp, '❌ Gagal mengirim', 'error');
        }
    } catch (e) {
        showResp(resp, '❌ Error: ' + e.message, 'error');
    }
    btn.classList.remove('loading');
    btn.disabled = false;
}

async function verifyMagicLink() {
    if (!currentUser) { alert('Login dulu!'); return; }
    if (todayLimit <= 0) { alert('Limit habis!'); return; }

    const canUse = await useLimit();
    if (!canUse) { alert('Limit habis!'); return; }

    const email = document.getElementById('amEmailInput')?.value?.trim();
    const link = document.getElementById('amLinkInput')?.value?.trim();
    const resp = document.getElementById('amVerifyResponse');
    if (!email || !email.includes('@')) {
        showResp(resp, 'Masukkan email yang valid!', 'error');
        return;
    }
    if (!link || !link.startsWith('http')) {
        showResp(resp, 'Masukkan link yang valid!', 'error');
        return;
    }
    const btn = document.getElementById('amVerifyBtn');
    btn.classList.add('loading');
    btn.disabled = true;
    try {
        const url = `https://api.alwayscodex.eu.cc/api/am/verifv2?email=${encodeURIComponent(email)}&link=${encodeURIComponent(link)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.status === 'success') {
            showPopup('Premium Berhasil!', 'Akun Alight Motion Anda sekarang PREMIUM!');
            showResp(resp, '✅ Premium berhasil diaktifkan!', 'success');
        } else {
            showResp(resp, '❌ Gagal verifikasi', 'error');
        }
    } catch (e) {
        showResp(resp, '❌ Error: ' + e.message, 'error');
    }
    btn.classList.remove('loading');
    btn.disabled = false;
}

// ======================== INIT ========================
startLoginLoading();
renderSavedAccounts();
showPage('login');
console.log('🔥 XraxzzSpamOtp loaded, Tuan!');
console.log('📦 All APIs work via alwayscodex.eu.cc');