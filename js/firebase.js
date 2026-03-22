import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCI3lLyejPi44GLf1UxdmljuVO2HWQbufI",
  authDomain: "aliens-ben-ten.firebaseapp.com",
  projectId: "aliens-ben-ten",
  storageBucket: "aliens-ben-ten.firebasestorage.app",
  messagingSenderId: "363751243162",
  appId: "1:363751243162:web:39e9be3196703dbb090e23",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
