// painel.js
import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Verifica se o usuário está logado
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const docRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dados = docSnap.data();
      document.getElementById("boasvindas").innerText = `Olá, ${dados.nome} (${dados.funcao})`;
    } else {
      document.getElementById("boasvindas").innerText = "Usuário sem dados no Firestore.";
    }
  } else {
    window.location.href = "login.html"; // redireciona se não estiver logado
  }
});

// Função de logout
window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};
