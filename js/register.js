import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const form = document.getElementById("register-form");

const email = document.getElementById("email");
const password = document.getElementById("password");

// REGISTER EMAIL

form.addEventListener("submit", (e) => {
  e.preventDefault();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      alert("Đăng ký thành công");

      window.location.href = "index.html";
    })

    .catch((error) => {
      alert(error.message);
    });
});

// GOOGLE REGISTER

const provider = new GoogleAuthProvider();

document.getElementById("google-register").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      alert("Đăng ký bằng Google thành công");

      window.location.href = "index.html";
    })

    .catch((error) => {
      alert(error.message);
    });
});
