import { auth, db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const lista = document.getElementById("listaOrdens");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const uid = user.uid;

  // Buscar função do usuário
  const resUser = await getDocs(collection(db, "usuarios"));
  let funcao = "";
  resUser.forEach(u => {
    if (u.id === uid) {
      funcao = u.data().funcao;
    }
  });

  const ordensSnapshot = await getDocs(collection(db, "ordens"));
  lista.innerHTML = "";

  ordensSnapshot.forEach(async (docSnap) => {
    const dados = docSnap.data();
    const ordemId = docSnap.id;

    const div = document.createElement("div");
    div.style = "border:1px solid #ccc; margin:10px; padding:10px; background:#fff";

    div.innerHTML = `
      <b>Cliente:</b> ${dados.cliente}<br/>
      <b>Estampa:</b> ${dados.estampa}<br/>
      <b>Total de Camisas:</b> ${dados.totalCamisas}<br/>
      <b>Valor Total:</b> R$ ${dados.valorTotal?.toFixed(2) || "–"}<br/>
      <b>Modelos:</b> ${dados.modelos?.join(", ") || "–"}<br/>
      ${dados.imagem ? `<img src="${dados.imagem}" width="150" style="margin-top:10px;" /><br/>` : ""}
      <b>Confirmações:</b><br/>
      ✅ Corte: ${dados.corteConfirmado || "❌"}<br/>
      ✅ Costura: ${dados.costuraConfirmada || "❌"}<br/>
      ✅ Estampa: ${dados.estampaConfirmada || "❌"}<br/>
    `;

    // Botão de confirmação por função
    if (funcao === "Corte" && !dados.corteConfirmado) {
      const btn = document.createElement("button");
      btn.textContent = "Confirmar Corte";
      btn.onclick = async () => {
        await updateDoc(doc(db, "ordens", ordemId), {
          corteConfirmado: user.email
        });
        alert("Corte confirmado!");
        location.reload();
      };
      div.appendChild(btn);
    }

    if (funcao === "Costureira" && !dados.costuraConfirmada) {
      const btn = document.createElement("button");
      btn.textContent = "Confirmar Costura";
      btn.onclick = async () => {
        await updateDoc(doc(db, "ordens", ordemId), {
          costuraConfirmada: user.email
        });
        alert("Costura confirmada!");
        location.reload();
      };
      div.appendChild(btn);
    }

    if (funcao === "Estampador" && !dados.estampaConfirmada) {
      const btn = document.createElement("button");
      btn.textContent = "Confirmar Estampa";
      btn.onclick = async () => {
        await updateDoc(doc(db, "ordens", ordemId), {
          estampaConfirmada: user.email
        });
        alert("Estampa confirmada!");
        location.reload();
      };
      div.appendChild(btn);
    }

    lista.appendChild(div);
  });
});
