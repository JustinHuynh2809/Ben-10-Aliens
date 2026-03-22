import { db } from "./firebase.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const docRef = doc(db, "aliens", id);

const snap = await getDoc(docRef);

const alien = snap.data();

document.getElementById("name").innerText = alien.name;
document.getElementById("image").src = alien.detailURL;
document.getElementById("species").innerText = alien.species;
document.getElementById("abilities").innerText = alien.abilities;
document.getElementById("weakness").innerText = alien.weakness;
document.getElementById("description").innerText = alien.description;
