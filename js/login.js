import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const form = document.getElementById("login-form");

const email = document.getElementById("email");
const password = document.getElementById("password");

// LOGIN EMAIL
form.addEventListener("submit", (e) => {
  e.preventDefault();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      alert("Đăng nhập thành công");

      window.location.href = "index.html";
    })

    .catch((error) => {
      alert(error.message);
    });
});

// LOGIN GOOGLE
const provider = new GoogleAuthProvider();

document.getElementById("google-login").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      alert("Đăng nhập Google thành công");

      window.location.href = "index.html";
    })

    .catch((error) => {
      alert(error.message);
    });
});
