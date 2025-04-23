import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRa7Cq_JqPvyICBk9mozxD3XmYwcl-Jm4",
    authDomain: "club-a74c0.firebaseapp.com",
    projectId: "club-a74c0",
    storageBucket: "club-a74c0.firebasestorage.app",
    messagingSenderId: "7273594842",
    appId: "1:7273594842:web:b3a2782b533a5f64b74ae3",
    measurementId: "G-XGJWBYTWRB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
  console.log("[Debug] DOM loaded - checking elements");

  const registrationForm = document.getElementById('registration-form');
  let formContainer = document.getElementById('form-container');

  if (!registrationForm) {
    console.error("[Error] Form element not found");
    return;
  }

  if (!formContainer) {
    console.warn("[Warning] Form container not found, using body");
    formContainer = document.body;
  }

  registrationForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log("[Debug] Form submission started");

    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    try {
      // Validate form
      if (!this.name.value.trim() || !this.idNumber.value.trim()) {
        throw new Error("Name and ID Number are required");
      }

      const formData = {
        name: this.name.value.trim(),
        year: this.year.value,
        section: this.section.value,
        idNumber: this.idNumber.value.trim(),
        hasLaptop: this.hasLaptop.value,
        timestamp: serverTimestamp()
      };

      console.log("[Debug] Submitting data:", formData);

      const docRef = await addDoc(collection(db, "workshop"), { ...formData });

      showSuccessMessage(formContainer, docRef.id);
    } catch (error) {
      console.error("[Error] Submission failed:", {
        error: error.message,
        stack: error.stack
      });
      showErrorMessage(formContainer, error.message);
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
});

// Success handler
function showSuccessMessage(container, docId) {
  container.innerHTML = `
    <div class="success-message">
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Registration Complete!</h3>
      <p>Thank you for registering. Your reference ID: ${docId}</p>
      <button class="btn btn-primary" id="register-another">Register Another Student</button>
    </div>
  `;

  document.getElementById('register-another').addEventListener('click', function () {
    location.reload();
  });
}

// Error handler
function showErrorMessage(container, errorMsg) {
  const errorHtml = `
    <div class="error-message">
      <div class="error-icon">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <h3>Registration Failed</h3>
      <p>${errorMsg || 'Please try again later'}</p>
      <button class="btn btn-retry" id="retry-registration">Try Again</button>
    </div>
  `;

  container.innerHTML = errorHtml;

  document.getElementById('retry-registration').addEventListener('click', function () {
    location.reload();
  });
}
