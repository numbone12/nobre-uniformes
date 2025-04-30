// login.js
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

console.log("🔥 login.js carregado");

const btn = document.getElementById("entrar");

if (btn) {
  console.log("✅ Botão encontrado");

  btn.addEventListener("click", async () => {
    console.log("🟢 Botão clicado");

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado com sucesso!");
      window.location.href = "painel.html";
    } catch (error) {
      console.error("🚨 Erro no login:", error);
      document.getElementById("erro").innerText = "Erro: " + error.message;
    }
  });
} else {
  console.error("❌ Botão #entrar não encontrado");
}
