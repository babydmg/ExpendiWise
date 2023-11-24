import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBomaQZ3Ncbi992tNrGEg-ouTpryJptbNE',
  authDomain: 'expense-tracker-60291.firebaseapp.com',
  projectId: 'expense-tracker-60291',
  storageBucket: 'expense-tracker-60291.appspot.com',
  messagingSenderId: '99631539067',
  appId: '1:99631539067:web:326d8cd06e54bcbb8dd3de',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
