import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAhTXPb7VRexfUQi5nwx02zJ7DY_ywrkk0',
  authDomain: 'disneyplus-clone-test.firebaseapp.com',
  projectId: 'disneyplus-clone-test',
  storageBucket: 'disneyplus-clone-test.appspot.com',
  messagingSenderId: '338907109297',
  appId: '1:338907109297:web:d2b1f402b4f248ea864f90',
  measurementId: 'G-6VVXBD7E3X',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const db = getFirestore();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage();

export { analytics, auth, provider, storage };
export default db;
