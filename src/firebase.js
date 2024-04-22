// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  // ... (otros campos)
};

const app = initializeApp(firebaseConfig);

var auth_buffer;

try {
  auth_buffer = getAuth(app);
} catch (e) {
  console.log(e);
  auth_buffer = false;
}

var database_buffer;
if(auth_buffer) {
  database_buffer = getDatabase(app);
} else {
  database_buffer = false;
}
const auth = auth_buffer;
const database = database_buffer;

export { auth, database };