import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAIGRSQbkls1A5nHBImYKJlJjvb5v8Wqs0",
  authDomain: "my-assets-52481.firebaseapp.com",
  projectId: "my-assets-52481",
  storageBucket: "my-assets-52481.firebasestorage.app",
  messagingSenderId: "809549512911",
  appId: "1:809549512911:web:7667a90c5a1f2e786837ba",
  measurementId: "G-W9Z6CFR6WY"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
