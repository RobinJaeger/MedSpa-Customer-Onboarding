// ===========================
// Main Application Logic
// ===========================

// Initialize application
function initApp() {
  // Get form and elements
  const form = document.getElementById("onboardingForm");
  const resetFormBtn = document.getElementById("resetForm");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const successMessage = document.getElementById("successMessage");

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

// Handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Collect form data
  const formData = collectFormData();

  // Get signatures
  const signatureDataURL = getSignatureDataURL();
  const signaturePractitionerDataURL = getSignaturePractitionerDataURL();

  if (!signatureDataURL) {
    alert(t("signatureRequired"));
    validateSignature();
    return;
  }

  if (!signaturePractitionerDataURL) {
    alert(t("signatureRequired"));
    validateSignaturePractitioner();
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
      signaturePractitionerDataURL,
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

  // Validate required fields
  const customerName = document.getElementById("customerName");
  const birthDate = document.getElementById("birthDate");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const locationDate = document.getElementById("locationDate");

  if (customerName && !customerName.value.trim()) {
    customerName.focus();
    alert(t("customerName") + ": " + t("requiredField"));
    isValid = false;
    return isValid;
  }

  if (birthDate && !birthDate.value.trim()) {
    birthDate.focus();
    alert(t("birthDate") + ": " + t("requiredField"));
    isValid = false;
    return isValid;
  }

  if (phone && !phone.value.trim()) {
    phone.focus();
    alert(t("phone") + ": " + t("requiredField"));
    isValid = false;
    return isValid;
  }

  if (email && !email.value.trim()) {
    email.focus();
    alert(t("email") + ": " + t("requiredField"));
    isValid = false;
    return isValid;
  }

  // Validate email format
  if (email && email.value.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.focus();
      alert(t("invalidEmail"));
      isValid = false;
      return isValid;
    }
  }

  if (locationDate && !locationDate.value.trim()) {
    locationDate.focus();
    alert(t("locationDate") + ": " + t("requiredField"));
    isValid = false;
    return isValid;
  }

  // Validate photo consent radio button is selected
  const photoConsentRadios = document.querySelectorAll(
    'input[name="photoConsent"]',
  );
  let photoConsentSelected = false;
  photoConsentRadios.forEach((radio) => {
    if (radio.checked) photoConsentSelected = true;
  });

  if (!photoConsentSelected) {
    alert(t("photoConsentTitle") + ": " + t("requiredField"));
    isValid = false;
    return isValid;
  }

  // Validate signatures
  if (!validateSignature()) {
    alert(t("signatureRequired"));
    isValid = false;
    return isValid;
  }

  if (!validateSignaturePractitioner()) {
    alert(t("signatureRequired"));
    isValid = false;
    return isValid;
  }

  return isValid;
}

// Collect form data
function collectFormData() {
  // Collect treatment checkboxes
  const treatmentCheckboxes = document.querySelectorAll(
    'input[name="treatment[]"]:checked',
  );
  const treatments = Array.from(treatmentCheckboxes).map((cb) => cb.value);

  // Collect health checkboxes
  const healthCheckboxes = document.querySelectorAll(
    'input[name="health[]"]:checked',
  );
  const healthConditions = Array.from(healthCheckboxes).map((cb) => cb.value);

  // Get photo consent
  const photoConsentRadio = document.querySelector(
    'input[name="photoConsent"]:checked',
  );
  const photoConsent = photoConsentRadio ? photoConsentRadio.value : "";

  return {
    customerName: document.getElementById("customerName")?.value.trim() || "",
    birthDate: document.getElementById("birthDate")?.value || "",
    phone: document.getElementById("phone")?.value.trim() || "",
    email: document.getElementById("email")?.value.trim() || "",
    treatments: treatments,
    healthConditions: healthConditions,
    healthNotes: document.getElementById("healthNotes")?.value.trim() || "",
    locationDate: document.getElementById("locationDate")?.value.trim() || "",
    photoConsent: photoConsent,
    treatmentDate: document.getElementById("treatmentDate")?.value || "",
    colorNotes: document.getElementById("colorNotes")?.value.trim() || "",
  };
}

// Reset form
function resetForm() {
  const form = document.getElementById("onboardingForm");

  if (form) {
    form.reset();
  }

  // Clear signatures
  clearSignature();
  clearSignaturePractitioner();

  // Remove any error states
  const canvas = document.getElementById("signatureCanvas");
  const canvasPractitioner = document.getElementById(
    "signatureCanvasPractitioner",
  );

  if (canvas) {
    canvas.classList.remove("error");
  }

  if (canvasPractitioner) {
    canvasPractitioner.classList.remove("error");
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

  // Check checkboxes
  const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
  if (checkboxes.length > 0) {
    return true;
  }

  // Check radio buttons
  const radios = form.querySelectorAll('input[type="radio"]:checked');
  if (radios.length > 0) {
    return true;
  }

  if (!isSignatureEmpty()) {
    return true;
  }

  if (!isSignaturePractitionerEmpty()) {
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
