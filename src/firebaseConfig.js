const admin = require("firebase-admin");

// Load Firebase service account credentials
const credentials = require("../firebaseServiceKeys.json");

// Initialize the Firebase Admin SDK with the provided credentials
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// Get the Firebase Authentication service
const firebaseAuth = adminApp.auth();

module.exports = {
  adminApp,
  firebaseAuth,
};
