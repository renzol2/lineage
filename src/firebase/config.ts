import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const fb = firebase;

try {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  if (process.env.NODE_ENV !== 'production') {
    db.useEmulator('localhost', 8080);
  }
} catch (e) {
  console.error('Firebase initialization error', e);
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();

export const signInWithGoogle = async () => {
  await auth.signInWithPopup(googleProvider);
}

export const signOut = async () => {
  await auth.signOut();
}
