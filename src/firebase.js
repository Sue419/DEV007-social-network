// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // lo exporto para usarlo en todas las otras paginas
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAnKOEfXjEtP0hUS-0ZRJ2L6q29OXsV7bo',
  authDomain: 'labgram-53b0c.firebaseapp.com',
  projectId: 'labgram-53b0c',
  storageBucket: 'labgram-53b0c.appspot.com',
  messagingSenderId: '240384744782',
  appId: '1:240384744782:web:88c6c3bd80dece4d10521f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Inicia firebase
export const auth = getAuth(app); // inicia autentication
export const db = getFirestore(app);
