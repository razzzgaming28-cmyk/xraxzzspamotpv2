// ======================== FIREBASE CONFIG ========================
const firebaseConfig = {
    apiKey: "AIzaSyBNe0TNoSW-40AWQGQ0ykB-hqRI4W3V9QQ",
    authDomain: "akun-5e0dc.firebaseapp.com",
    databaseURL: "https://akun-5e0dc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "akun-5e0dc",
    storageBucket: "akun-5e0dc.firebasestorage.app",
    messagingSenderId: "815443545594",
    appId: "1:815443545594:web:cc1ff2c52f10f1599de843",
    measurementId: "G-PV56MH0Y47"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Export for use in other files
window.db = db;
window.firebase = firebase;

console.log('🔥 Firebase initialized, Tuan!');