    // login.js
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.getElementById("entrar").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    alert("Login realizado com sucesso!");

    // Redirecionar para o painel
    window.location.href = "painel.html";
  } catch (error) {
    document.getElementById("erro").innerText = "Erro: " + error.message;
  }
});
