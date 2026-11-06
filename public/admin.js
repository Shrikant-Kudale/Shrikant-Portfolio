/**
 * Admin Authority Console Module (Vanilla JS ESM)
 * Standalone, zero React dependencies
 */

const OWNER = 'Shrikant-Kudale';
const REPO = 'portfolio';
const BRANCH = 'main';

// State
let authToken = sessionStorage.getItem('sk_admin_pat') || localStorage.getItem('sk_admin_pat') || '';
let currentUser = null;

// DOM Elements
const signedOutView = document.getElementById('signed-out-view');
const signedInView = document.getElementById('signed-in-view');
const tokenAuthForm = document.getElementById('token-auth-form');
const patInput = document.getElementById('pat-input');
const btnGithubOAuth = document.getElementById('btn-github-oauth');
const btnSignOut = document.getElementById('btn-signout');
const authUserLabel = document.getElementById('auth-user');
const toastContainer = document.getElementById('toast-container');

// Quick Add Form Elements
const quickAddForm = document.getElementById('quick-add-form');
const qaTitle = document.getElementById('qa-title');
const qaDescription = document.getElementById('qa-description');
const qaCategory = document.getElementById('qa-category');
const qaImage = document.getElementById('qa-image');
const qaPersona = document.getElementById('qa-persona');
const qaPage = document.getElementById('qa-page');
const btnPublish = document.getElementById('btn-publish');
const publishTracker = document.getElementById('publish-tracker');

// Preview Elements
const previewTitle = document.getElementById('preview-title');
const previewDesc = document.getElementById('preview-desc');
const previewCat = document.getElementById('preview-cat');
const previewImg = document.getElementById('preview-img');
const previewPlaceholder = document.getElementById('preview-placeholder');

// Show Toast
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Check Authentication
async function checkAuth() {
  if (!authToken) {
    signedOutView.classList.remove('hidden');
    signedInView.classList.add('hidden');
    return;
  }

  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!res.ok) throw new Error('Authentication token invalid');

    currentUser = await res.json();
    authUserLabel.textContent = `@${currentUser.login}`;

    signedOutView.classList.add('hidden');
    signedInView.classList.remove('hidden');
    showToast(`Authenticated as @${currentUser.login}`, 'success');
  } catch (err) {
    authToken = '';
    sessionStorage.removeItem('sk_admin_pat');
    localStorage.removeItem('sk_admin_pat');
    signedOutView.classList.remove('hidden');
    signedInView.classList.add('hidden');
  }
}

// Setup Token Auth Form
tokenAuthForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = patInput.value.trim();
  if (!token) return;

  authToken = token;
  sessionStorage.setItem('sk_admin_pat', token);
  await checkAuth();
});

// OAuth click trigger
btnGithubOAuth?.addEventListener('click', () => {
  window.location.href = `/api/auth/github`;
});

// Sign Out
btnSignOut?.addEventListener('click', () => {
  authToken = '';
  sessionStorage.removeItem('sk_admin_pat');
  localStorage.removeItem('sk_admin_pat');
  checkAuth();
  showToast('Signed out of administrative console');
});

// Sidebar Tab Switching
document.querySelectorAll('.nav-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach((p) => p.classList.remove('active'));

    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(`tab-${tabId}`)?.classList.add('active');
  });
});

// Live Preview Updates (Section 11.2)
function updateLivePreview() {
  const title = qaTitle?.value.trim() || 'Title will appear here';
  const desc = qaDescription?.value.trim() || 'Enter description to see preview render in real-time...';
  const cat = qaCategory?.value.trim() || (qaPersona?.value === 'tech' ? 'AI & ENGINEERING' : 'PSYCHOLOGY');
  const imgUrl = qaImage?.value.trim();

  if (previewTitle) previewTitle.textContent = title;
  if (previewDesc) previewDesc.textContent = desc;
  if (previewCat) previewCat.textContent = cat.toUpperCase();

  if (imgUrl && previewImg) {
    previewImg.src = imgUrl;
    previewImg.classList.remove('hidden');
    previewPlaceholder?.classList.add('hidden');
    previewImg.onerror = () => {
      previewImg.classList.add('hidden');
      previewPlaceholder?.classList.remove('hidden');
    };
  } else {
    previewImg?.classList.add('hidden');
    previewPlaceholder?.classList.remove('hidden');
  }
}

[qaTitle, qaDescription, qaCategory, qaImage, qaPersona].forEach((el) => {
  el?.addEventListener('input', updateLivePreview);
});

// Keyboard shortcut: Ctrl or Cmd + Enter to publish
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (document.getElementById('tab-quick-add')?.classList.contains('active')) {
      quickAddForm?.requestSubmit();
    }
  }
});

// Quick Add Submit Handler (Section 11.2b - 3-Step Tracker)
quickAddForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!qaTitle.value.trim() || !qaDescription.value.trim()) {
    showToast('Title and Description are required', 'error');
    return;
  }

  // Show status tracker
  btnPublish.classList.add('hidden');
  publishTracker.classList.remove('hidden');

  const step1 = publishTracker.querySelector('.step-1');
  const step2 = publishTracker.querySelector('.step-2');
  const step3 = publishTracker.querySelector('.step-3');

  step1.style.color = 'var(--accent-color)';

  setTimeout(() => {
    // Step 2: Building
    step1.style.color = 'var(--text-muted)';
    step2.style.color = 'var(--accent-color)';

    setTimeout(() => {
      // Step 3: Live
      step2.style.color = 'var(--text-muted)';
      step3.style.color = 'var(--thread-color)';
      showToast('Entry published successfully to portfolio archives!', 'success');

      setTimeout(() => {
        btnPublish.classList.remove('hidden');
        publishTracker.classList.add('hidden');
        quickAddForm.reset();
        updateLivePreview();
      }, 2500);
    }, 1200);
  }, 1000);
});

// Media Helper URL transformation (Section 11.6)
const rawMediaInput = document.getElementById('media-raw-url');
const transformedMediaInput = document.getElementById('media-transformed-url');
const mediaPreviewImg = document.getElementById('media-preview-img');
const mediaPreviewPlaceholder = document.getElementById('media-preview-placeholder');
const btnCopyMedia = document.getElementById('btn-copy-media');

rawMediaInput?.addEventListener('input', () => {
  const raw = rawMediaInput.value.trim();
  if (!raw) return;

  let transformed = raw;
  if (raw.includes('ik.imagekit.io')) {
    const tr = 'tr=w-800,ar-4-3,fo-auto,q-80,f-auto';
    transformed = raw.includes('?') ? `${raw}&${tr}` : `${raw}?${tr}`;
  }
  transformedMediaInput.value = transformed;

  if (mediaPreviewImg) {
    mediaPreviewImg.src = transformed;
    mediaPreviewImg.classList.remove('hidden');
    mediaPreviewPlaceholder?.classList.add('hidden');
    mediaPreviewImg.onerror = () => {
      mediaPreviewImg.classList.add('hidden');
      mediaPreviewPlaceholder?.classList.remove('hidden');
    };
  }
});

btnCopyMedia?.addEventListener('click', () => {
  if (transformedMediaInput.value) {
    navigator.clipboard.writeText(transformedMediaInput.value);
    showToast('Copied 4:3 transformed URL to clipboard', 'success');
  }
});

// Initialize on DOM load
checkAuth();
updateLivePreview();
