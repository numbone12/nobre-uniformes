// login.js
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

console.log("🔥 login.js carregado");

const btn = document.getElementById("entrar");

if (btn) {
  console.log("✅ Botão encontrado");

  btn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    console.log("📨 Tentando logar com:", email, senha);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      if (user.emailVerified) {
        console.log("✅ Email verificado, login autorizado");
        alert("Login realizado com sucesso!");
        window.location.href = "painel.html";
      } else {
        console.warn("⚠️ Email não verificado");
        await user.sendEmailVerification();
        alert("⚠️ Seu e-mail ainda não foi verificado. Enviamos novamente o link.");
      }

    } catch (error) {
      console.error("🚨 Erro no login:", error.code, error.message);
      document.getElementById("erro").innerText = "Erro: " + error.message;
    }
  });
} else {
  console.error("❌ Botão #entrar não encontrado");
}
