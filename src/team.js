function toggleAnswer(element) {
    const answer = element.nextElementSibling; 
    const button = element.querySelector('.faq-icon'); 
    if (answer.style.display === "none" || answer.style.display === "") {
        answer.style.display = "block";
        button.textContent = "-";
    } else {
        answer.style.display = "none";
        button.textContent = "+";
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".faq-answer").forEach(answer => {
        answer.style.display = "none";
    });
  });
  
  
  let cardCount = 0;
  
  document.getElementById("addEmployeeBtn").addEventListener("click", addCard);
  
  function addCard() {
      cardCount++;
      const fileInput = document.getElementById("imageUpload");
      const file = fileInput.files[0];
      const employeeName = document.getElementById("employeeName").value.trim();
      const employeeRole = document.getElementById("employeeRole").value.trim();
  
      if (!employeeName || !employeeRole) {
          alert("Please enter employee name and role.");
          return;
      }
  
      if (!file) {
          alert("Please select an image first.");
          return;
      }
  
      const reader = new FileReader();
      reader.onload = function (e) {
          const cardContainer = document.getElementById("cardContainer");
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
              <img src="${e.target.result}" alt="Employee">
              <div class="card-content">
                  <strong>${employeeName}</strong>
                  <p>Role: ${employeeRole}</p>
              </div>
          `;
          
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "X";
          deleteBtn.classList.add("delete-btn");
          deleteBtn.addEventListener("click", () => card.remove());
  
          card.appendChild(deleteBtn);
          cardContainer.appendChild(card);
  
          // Reset input fields
          fileInput.value = "";
          document.getElementById("employeeName").value = "";
          document.getElementById("employeeRole").value = "";
      };
  
      reader.readAsDataURL(file);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll(".container").forEach(img => img.style.display = "none");
  });
  
  
  
  document.getElementById("load-btn").addEventListener("click", function () {
      const cardContainer = document.getElementById("cardContainer");
      cardContainer.style.display = "grid"; 
      document.getElementById("load-btn").style.display = "none"; 
  });
  