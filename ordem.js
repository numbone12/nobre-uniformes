import { auth, db, storage } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.getElementById("enviar").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return alert("Você precisa estar logado.");

  const cliente = document.getElementById("cliente").value;
  const estampa = document.getElementById("estampa").value;
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valorUnitario").value);
  const img = document.getElementById("imagem").files[0];

  const tamanhos = {
    PP: +document.getElementById("PP").value || 0,
    P: +document.getElementById("P").value || 0,
    M: +document.getElementById("M").value || 0,
    G: +document.getElementById("G").value || 0,
    GG: +document.getElementById("GG").value || 0,
    XGG: +document.getElementById("XGG").value || 0,
    XXGG: +document.getElementById("XXGG").value || 0,
    "2": +document.getElementById("2").value || 0,
    "4": +document.getElementById("4").value || 0,
    "6": +document.getElementById("6").value || 0,
    "8": +document.getElementById("8").value || 0,
    "10": +document.getElementById("10").value || 0,
    "12": +document.getElementById("12").value || 0,
  };

  const modelos = [];
  if (document.getElementById("raglan").checked) modelos.push("Raglan");
  if (document.getElementById("pv").checked) modelos.push("Malha PV");
  if (document.getElementById("algodao").checked) modelos.push("Algodão");
  if (document.getElementById("dry").checked) modelos.push("Dry Fit");
  if (document.getElementById("padrao").checked) modelos.push("Padrão");
  if (document.getElementById("regata").checked) modelos.push("Regata");
  if (document.getElementById("polo").checked) modelos.push("Camisa Polo");

  const totalCamisas = Object.values(tamanhos).reduce((a, b) => a + b, 0);
  const valorTotal = valor * totalCamisas;

  let urlImagem = "";
  if (img) {
    const caminho = `artes/${Date.now()}-${img.name}`;
    const storageRef = ref(storage, caminho);
    await uploadBytes(storageRef, img);
    urlImagem = await getDownloadURL(storageRef);
  }

  const id = `${Date.now()}`;
  await setDoc(doc(db, "ordens", id), {
    cliente,
    estampa,
    descricao,
    modelos,
    tamanhos,
    valorUnitario: valor,
    valorTotal,
    totalCamisas,
    imagem: urlImagem,
    criadoPor: user.uid,
    criadoEm: serverTimestamp()
  });

  document.getElementById("msg").innerText = "Ordem salva com sucesso!";
});
