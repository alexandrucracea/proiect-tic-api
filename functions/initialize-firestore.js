const serviceAccount = require('../firebase/key/project-tic-80df0-firebase-adminsdk-sz3gm-4b55300631.json');
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, cert } = require('firebase-admin/app');

initializeApp({
  credential: cert(serviceAccount),
});

let firestoreService;
const initializeFirestore = () => {
  if (!firestoreService) {
    firestoreService = getFirestore();
  }
  return firestoreService;
};

module.exports = initializeFirestore;
