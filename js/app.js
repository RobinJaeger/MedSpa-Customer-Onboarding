// ===========================
// Main Application Logic
// ===========================

// State
let uploadedPhotoDataURL = null;

// Initialize application
function initApp() {
  // Get form and elements
  const form = document.getElementById("onboardingForm");
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("photoPreview");
  const previewImage = document.getElementById("previewImage");
  const removePhotoBtn = document.getElementById("removePhoto");
  const resetFormBtn = document.getElementById("resetForm");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const successMessage = document.getElementById("successMessage");

  // ===========================
  // Photo Upload Handling
  // ===========================

  if (photoInput) {
    photoInput.addEventListener("change", handlePhotoUpload);
  }

  if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", removePhoto);
  }

  // ===========================
  // Form Submission
  // ===========================

  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  // ===========================
  // Reset Form
  // ===========================

  if (resetFormBtn) {
    resetFormBtn.addEventListener("click", handleResetForm);
  }

  // ===========================
  // Warn before leaving with unsaved data
  // ===========================

  window.addEventListener("beforeunload", (e) => {
    if (hasFormData()) {
      e.preventDefault();
      e.returnValue = "";
      return "";
    }
  });
}

// Handle photo upload
function handlePhotoUpload(event) {
  const file = event.target.files[0];

  if (!file) return;

  // Validate file type
  if (!file.type.match("image.*")) {
    alert("Please select an image file.");
    return;
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    alert("Image file is too large. Maximum size is 5MB.");
    event.target.value = "";
    return;
  }

  // Read and compress image
  const reader = new FileReader();

  reader.onload = function (e) {
    compressImage(e.target.result, (compressedDataURL) => {
      uploadedPhotoDataURL = compressedDataURL;
      displayPhotoPreview(compressedDataURL);
    });
  };

  reader.readAsDataURL(file);
}

// Compress image to reduce PDF size
function compressImage(dataURL, callback) {
  const img = new Image();

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculate new dimensions (max 1200px width)
    const maxWidth = 1200;
    let width = img.width;
    let height = img.height;

    if (width > maxWidth) {
      height = (maxWidth / width) * height;
      width = maxWidth;
    }

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Draw image
    ctx.drawImage(img, 0, 0, width, height);

    // Get compressed data URL
    const compressedDataURL = canvas.toDataURL("image/jpeg", 0.8);

    callback(compressedDataURL);
  };

  img.src = dataURL;
}

// Display photo preview
function displayPhotoPreview(dataURL) {
  const photoPreview = document.getElementById("photoPreview");
  const previewImage = document.getElementById("previewImage");

  if (photoPreview && previewImage) {
    previewImage.src = dataURL;
    photoPreview.classList.remove("hidden");
  }
}

// Remove photo
function removePhoto() {
  uploadedPhotoDataURL = null;

  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("photoPreview");
  const previewImage = document.getElementById("previewImage");

  if (photoInput) {
    photoInput.value = "";
  }

  if (photoPreview) {
    photoPreview.classList.add("hidden");
  }

  if (previewImage) {
    previewImage.src = "";
  }
}

// Handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Collect form data
  const formData = collectFormData();

  // Get signature
  const signatureDataURL = getSignatureDataURL();

  if (!signatureDataURL) {
    alert(t("signatureRequired"));
    validateSignature(); // This will add error styling
    return;
  }

  // Show loading overlay
  showLoading();

  // Small delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    // Generate PDF
    const success = await generatePDF(
      formData,
      signatureDataURL,
      uploadedPhotoDataURL,
    );

    if (success) {
      // Hide loading
      hideLoading();

      // Show success message
      showSuccess();

      // Reset form after delay
      setTimeout(() => {
        hideSuccess();
        resetForm();
      }, 2000);
    } else {
      hideLoading();
    }
  } catch (error) {
    console.error("Error in form submission:", error);
    hideLoading();
    alert("An error occurred while generating the PDF. Please try again.");
  }
}

// Validate form
function validateForm() {
  let isValid = true;

  // Validate required fields: First Name, Last Name
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");

  if (firstName && !firstName.value.trim()) {
    firstName.focus();
    alert(t("firstName") + ": " + t("requiredField"));
    isValid = false;
  }

  if (lastName && !lastName.value.trim()) {
    lastName.focus();
    alert(t("lastName") + ": " + t("requiredField"));
    isValid = false;
  }

  // Validate signature
  if (!validateSignature()) {
    alert(t("signatureRequired"));
    isValid = false;
  }

  // Validate email if provided
  const email = document.getElementById("email");
  if (email && email.value.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.focus();
      alert(t("invalidEmail"));
      isValid = false;
    }
  }

  return isValid;
}

// Collect form data
function collectFormData() {
  return {
    firstName: document.getElementById("firstName")?.value.trim() || "",
    lastName: document.getElementById("lastName")?.value.trim() || "",
    birthDate: document.getElementById("birthDate")?.value || "",
    phone: document.getElementById("phone")?.value.trim() || "",
    email: document.getElementById("email")?.value.trim() || "",
    allergies: document.getElementById("allergies")?.value.trim() || "",
    healthNotes: document.getElementById("healthNotes")?.value.trim() || "",
    preferences: document.getElementById("preferences")?.value.trim() || "",
  };
}

// Reset form
function resetForm() {
  const form = document.getElementById("onboardingForm");

  if (form) {
    form.reset();
  }

  // Clear signature
  clearSignature();

  // Remove photo
  removePhoto();

  // Remove any error states
  const canvas = document.getElementById("signatureCanvas");
  if (canvas) {
    canvas.classList.remove("error");
  }
}

// Handle reset button click
function handleResetForm() {
  if (hasFormData()) {
    if (confirm(t("confirmReset"))) {
      resetForm();
    }
  } else {
    resetForm();
  }
}

// Check if form has any data
function hasFormData() {
  const form = document.getElementById("onboardingForm");
  if (!form) return false;

  const inputs = form.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="tel"], input[type="date"], textarea',
  );

  for (let input of inputs) {
    if (input.value.trim()) {
      return true;
    }
  }

  if (!isSignatureEmpty()) {
    return true;
  }

  if (uploadedPhotoDataURL) {
    return true;
  }

  return false;
}

// Show loading overlay
function showLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) {
    loadingOverlay.classList.remove("hidden");
  }
}

// Hide loading overlay
function hideLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) {
    loadingOverlay.classList.add("hidden");
  }
}

// Show success message
function showSuccess() {
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.classList.remove("hidden");
  }
}

// Hide success message
function hideSuccess() {
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.classList.add("hidden");
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
