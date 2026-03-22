import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const grid = document.querySelector(".alien-grid");

const btn = document.getElementById("createAlienBtn");
const form = document.getElementById("alienFormContainer");

btn.onclick = () => {
  form.style.display = "block";
};

document.getElementById("saveAlien").onclick = async () => {
  const name = document.getElementById("name").value;
  const species = document.getElementById("species").value;
  const abilities = document.getElementById("abilities").value;
  const weakness = document.getElementById("weakness").value;
  const description = document.getElementById("description").value;

  const cardURL = document.getElementById("cardImage").value;
  const detailURL = document.getElementById("detailImage").value;

  await addDoc(collection(db, "aliens"), {
    name,
    species,
    abilities,
    weakness,
    description,
    cardURL,
    detailURL,
  });

  alert("Alien created!");

  loadAliens();
};

async function loadAliens() {
  const snapshot = await getDocs(collection(db, "aliens"));

  grid.innerHTML = "";

  snapshot.forEach((doc) => {
    const alien = doc.data();

    const card = `
      <a href="alien.html?id=${doc.id}" class="alien-card">
        <img src="${alien.cardURL}" class="alien-img">
        <p class="alien-name">${alien.name}</p>
      </a>
    `;

    grid.innerHTML += card;
  });
}

loadAliens();
