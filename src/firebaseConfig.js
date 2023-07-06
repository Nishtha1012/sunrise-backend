const admin = require("firebase-admin");

const credentials = require("../firebaseServiceKeys.json");

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const firebaseAuth = adminApp.auth();

module.exports = {
  adminApp,
  firebaseAuth,
};
