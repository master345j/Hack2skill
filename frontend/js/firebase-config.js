/**
 * Firebase Configuration
 * Initialize Firebase and set up authentication/database
 */

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDemoKeyXXXXXXXXXXXXXXXX", // Replace with your key
    authDomain: "smart-city-dashboard.firebaseapp.com",
    projectId: "smart-city-dashboard",
    storageBucket: "smart-city-dashboard.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefghijk"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.warn('⚠️ Firebase already initialized or demo mode:', error.message);
}

// Get Firebase services
const auth = firebase.auth;
const database = firebase.database;

// Demo Mode Flag
let isDemoMode = false;

/**
 * Check if Firebase is available
 */
function isFirebaseAvailable() {
    return typeof firebase !== 'undefined';
}

/**
 * Enable Demo Mode (for development/demo purposes)
 */
function enableDemoMode() {
    isDemoMode = true;
    console.log('🎬 Demo Mode Enabled');
}

/**
 * Disable Demo Mode
 */
function disableDemoMode() {
    isDemoMode = false;
}
