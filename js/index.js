import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const grid = document.querySelector(".alien-grid");

const btn = document.getElementById("createAlienBtn");
const form = document.getElementById("alienFormContainer");

const editForm = document.getElementById("editFormContainer");

const searchInput = document.getElementById("searchInput");

let currentEditId = null;

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

  snapshot.forEach((docSnap) => {
    const alien = docSnap.data();

    const card = `

<div class="alien-card">

<a href="alien.html?id=${docSnap.id}">

<img src="${alien.cardURL}" class="alien-img">

<p class="alien-name">${alien.name}</p>

</a>

<div class="alien-actions">

<button class="edit-btn" data-id="${docSnap.id}">Edit</button>

<button class="delete-btn" data-id="${docSnap.id}">Delete</button>

</div>

</div>

`;

    grid.innerHTML += card;
  });
}

loadAliens();

/* DELETE ALIEN */

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;

    if (confirm("Delete this alien?")) {
      await deleteDoc(doc(db, "aliens", id));

      loadAliens();
    }
  }
});

/* EDIT ALIEN */

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-btn")) {
    currentEditId = e.target.dataset.id;

    const snapshot = await getDocs(collection(db, "aliens"));

    snapshot.forEach((d) => {
      if (d.id === currentEditId) {
        const a = d.data();

        document.getElementById("editName").value = a.name;
        document.getElementById("editSpecies").value = a.species;
        document.getElementById("editAbilities").value = a.abilities;
        document.getElementById("editWeakness").value = a.weakness;
        document.getElementById("editDescription").value = a.description;
        document.getElementById("editCardImage").value = a.cardURL;
        document.getElementById("editDetailImage").value = a.detailURL;

        editForm.style.display = "block";
      }
    });
  }
});

/* UPDATE ALIEN */

document.getElementById("updateAlien").onclick = async () => {
  await updateDoc(doc(db, "aliens", currentEditId), {
    name: document.getElementById("editName").value,
    species: document.getElementById("editSpecies").value,
    abilities: document.getElementById("editAbilities").value,
    weakness: document.getElementById("editWeakness").value,
    description: document.getElementById("editDescription").value,
    cardURL: document.getElementById("editCardImage").value,
    detailURL: document.getElementById("editDetailImage").value,
  });

  editForm.style.display = "none";

  loadAliens();
};

/* SEARCH */

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const cards = document.querySelectorAll(".alien-card");

  cards.forEach((card) => {
    const name = card.querySelector(".alien-name").innerText.toLowerCase();

    card.style.display = name.includes(value) ? "block" : "none";
  });
});
