/**
 * Authentication Management
 * Firebase Auth integration with UI
 */

let currentUser = null;

/**
 * Initialize Authentication UI
 */
function initAuthUI() {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const demoButton = document.getElementById('demoButton');

    // Tab switching
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Login Form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        handleLogin(email, password);
    });

    // Sign Up Form
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;

        if (password !== confirm) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        handleSignup(email, password);
    });

    // Demo Mode Button
    demoButton.addEventListener('click', () => {
        isDemoMode = true;
        onAuthSuccess('demo@example.com');
    });
}

/**
 * Handle Login
 */
async function handleLogin(email, password) {
    try {
        if (isDemoMode) {
            onAuthSuccess(email);
            return;
        }

        if (!isFirebaseAvailable()) {
            showNotification('Firebase not available. Using demo mode...', 'info');
            isDemoMode = true;
            onAuthSuccess(email);
            return;
        }

        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        onAuthSuccess(userCredential.user.email);
    } catch (error) {
        showNotification('Login failed: ' + error.message, 'error');
        console.error('Auth error:', error);
    }
}

/**
 * Handle Sign Up
 */
async function handleSignup(email, password) {
    try {
        if (isDemoMode) {
            onAuthSuccess(email);
            return;
        }

        if (!isFirebaseAvailable()) {
            showNotification('Firebase not available. Using demo mode...', 'info');
            isDemoMode = true;
            onAuthSuccess(email);
            return;
        }

        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        onAuthSuccess(userCredential.user.email);
    } catch (error) {
        showNotification('Sign up failed: ' + error.message, 'error');
        console.error('Auth error:', error);
    }
}

/**
 * Handle Successful Authentication
 */
function onAuthSuccess(email) {
    currentUser = { email };
    document.getElementById('userEmail').textContent = email;
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('loadingScreen').classList.add('hidden');

    initDashboard();
    showNotification(`Welcome ${email}!`, 'success');
}

/**
 * Handle Logout
 */
async function handleLogout() {
    try {
        if (!isDemoMode && isFirebaseAvailable()) {
            await firebase.auth().signOut();
        }
        
        currentUser = null;
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('authModal').classList.remove('hidden');
        document.getElementById('loadingScreen').classList.remove('hidden');
        
        // Reset forms
        document.getElementById('loginForm').reset();
        document.getElementById('signupForm').reset();
        
        showNotification('Logged out successfully', 'success');
    } catch (error) {
        showNotification('Logout failed: ' + error.message, 'error');
        console.error('Logout error:', error);
    }
}

/**
 * Check If User Is Logged In
 */
function checkAuthStatus() {
    if (isDemoMode) {
        return currentUser !== null;
    }

    if (!isFirebaseAvailable()) {
        return false;
    }

    return firebase.auth().currentUser !== null;
}

/**
 * Set Up Auth State Listener
 */
function setupAuthListener() {
    if (!isFirebaseAvailable()) {
        console.log('Firebase not available. Demo mode ready.');
        return;
    }

    firebase.auth().onAuthStateChanged((user) => {
        document.getElementById('loadingScreen').classList.add('hidden');
        
        if (user) {
            onAuthSuccess(user.email);
        } else {
            document.getElementById('authModal').classList.remove('hidden');
        }
    });
}

/**
 * Initialize Auth
 */
document.addEventListener('DOMContentLoaded', () => {
    initAuthUI();
    
    // Setup logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Check auth status
    setTimeout(() => {
        setupAuthListener();
    }, 1000);
});
