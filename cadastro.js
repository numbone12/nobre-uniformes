// cadastro.js
import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

document.getElementById("cadastrar").addEventListener("click", async () => {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const funcao = document.getElementById("funcao").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      nome: nome,
      email: email,
      funcao: funcao,
      criadoEm: new Date()
    });

    document.getElementById("mensagem").innerText = "Usuário cadastrado com sucesso!";
  } catch (error) {
    document.getElementById("mensagem").innerText = "Erro: " + error.message;
  }
});
