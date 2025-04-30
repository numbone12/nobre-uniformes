// firebase.js

// Importa os scripts do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

// Sua configuração do Firebase (essa veio da sua conta)
const firebaseConfig = {
  apiKey: "AIzaSyC8D2dy2iKYZF-Aj3RfSA44v8dZb4N9Qw",
  authDomain: "ordem-de-servico-57659.firebaseapp.com",
  projectId: "ordem-de-servico-57659",
  storageBucket: "ordem-de-servico-57659.appspot.com",
  messagingSenderId: "448175741572",
  appId: "1:448175741572:web:9dbf83269c81a966656691",
  measurementId: "G-TJFC5M7567"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os módulos
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
