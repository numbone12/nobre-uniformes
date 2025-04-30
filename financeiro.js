import { auth, db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const painel = document.getElementById("painel");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const resUser = await getDocs(collection(db, "usuarios"));
  let funcao = "";
  resUser.forEach(u => {
    if (u.id === user.uid) {
      funcao = u.data().funcao;
    }
  });

  if (funcao !== "Administrador") {
    painel.innerHTML = "<p style='color:red'>Acesso restrito ao administrador.</p>";
    return;
  }

  const ordensSnap = await getDocs(collection(db, "ordens"));
  let totalCamisas = 0;
  let totalDinheiro = 0;

  const html = [];

  ordensSnap.forEach(docSnap => {
    const dados = docSnap.data();
    html.push(`
      <div style="border:1px solid #ccc; margin:10px; padding:10px; background:#fff">
        <b>Cliente:</b> ${dados.cliente} <br/>
        <b>Estampa:</b> ${dados.estampa} <br/>
        <b>Total Camisas:</b> ${dados.totalCamisas || 0} <br/>
        <b>Valor Total:</b> R$ ${dados.valorTotal?.toFixed(2) || 0}
      </div>
    `);
    totalCamisas += dados.totalCamisas || 0;
    totalDinheiro += dados.valorTotal || 0;
  });

  painel.innerHTML = `
    <h3>Resumo Geral</h3>
    <p><b>Total de Camisas:</b> ${totalCamisas}</p>
    <p><b>Total Financeiro:</b> R$ ${totalDinheiro.toFixed(2)}</p>
    <hr/>
    ${html.join("")}
  `;
});
