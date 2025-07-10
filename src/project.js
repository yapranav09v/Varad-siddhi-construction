// Firebase core
import { initializeApp } from 'firebase/app';

// Firebase Realtime Database
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  remove
} from 'firebase/database';

// Firebase Storage
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';

import './styles/project.css';

const firebaseConfig = {
  apiKey: "AIzaSyCUjAW-AxFPSCeHfFjQ_uiveKELpCJfguw",
  authDomain: "varad-siddhi-constructio-a083c.firebaseapp.com",
  databaseURL: "https://varad-siddhi-constructio-a083c-default-rtdb.firebaseio.com",
  projectId: "varad-siddhi-constructio-a083c",
  storageBucket: "varad-siddhi-constructio-a083c.firebasestorage.app",
  messagingSenderId: "952428192549",
  appId: "1:952428192549:web:f41b238f4934f18b0070cc",
  measurementId: "G-36LZJZYHG6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();
const storage = getStorage();

const adminEmail = "admin@example.com";
const adminPassword = "admin123";
let isAdmin = false;
let currentFilter = "Running";

window.toggleLoginForm = function () {
  const loginDiv = document.getElementById("loginDiv");
  loginDiv.style.display = loginDiv.style.display === "none" ? "block" : "none";
};

window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const loginBtn = document.getElementById("loginBtn");

  if (!email || !password) return alert("Please enter both email and password.");
  loginBtn.disabled = true;
  loginBtn.innerText = "Logging in...";

  if (email === adminEmail && password === adminPassword) {
    isAdmin = true;
    localStorage.setItem("isAdmin", "true");
    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("post-form").style.display = "block";
    getdata();
  } else {
    alert("Invalid credentials.");
  }

  loginBtn.disabled = false;
  loginBtn.innerText = "Login";
};

window.logout = function () {
  isAdmin = false;
  localStorage.removeItem("isAdmin");
  document.getElementById("post-form").style.display = "none";
  getdata();
};

window.upload = function () {
  const title = document.getElementById("projectName").value.trim();
  const text = document.getElementById("post").value.trim();
  const image = document.getElementById("image").files[0];
  const status = document.getElementById("status").value;
  if (!title || !text || !image) return alert("All fields are required.");

  const uniqueName = Date.now() + '-' + image.name;
  const storageRef = sRef(storage, 'images/' + uniqueName);
  const uploadTask = uploadBytesResumable(storageRef, image);

  document.getElementById("loader").style.display = "block";
  uploadTask.on("state_changed", null, err => {
    alert("Upload error: " + err.message);
    document.getElementById("loader").style.display = "none";
  }, () => {
    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
      const newPostRef = push(ref(database, 'blogs/'));
      set(newPostRef, { title, text, imageURL: downloadURL, status }).then(() => {
        document.getElementById("projectName").value = "";
        document.getElementById("post").value = "";
        document.getElementById("image").value = "";
        document.getElementById("loader").style.display = "none";
        getdata();
      });
    });
  });
};

window.getdata = function () {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";
  get(ref(database, 'blogs/')).then(snapshot => {
    const data = snapshot.val();
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value.status === currentFilter) {
          postsDiv.innerHTML += `
            <div class="col-md-4 mb-4">
              <div class="card project-card">
                <img src="${value.imageURL}" class="card-img-top" alt="Project Image">
                <div class="card-body">
                  <h5 class="card-title">${escapeHtml(value.title || "Untitled")}</h5>
                  <p class="card-text">${escapeHtml(value.text)}</p>
                  ${isAdmin ? `<button class="btn btn-danger" onclick="delete_post('${key}')">Delete</button>` : ''}
                </div>
              </div>
            </div>`;
        }
      });
    } else {
      postsDiv.innerHTML = "<p class='text-center'>No projects to show.</p>";
    }
  });
};

window.filterProjects = function (status) {
  currentFilter = status;
  getdata();
};

window.delete_post = function (key) {
  remove(ref(database, 'blogs/' + key)).then(() => getdata());
};

function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

window.onload = function () {
  if (localStorage.getItem("isAdmin") === "true") {
    isAdmin = true;
    document.getElementById("post-form").style.display = "block";
  }
  getdata();
};
