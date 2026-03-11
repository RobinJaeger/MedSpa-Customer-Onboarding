// ===========================
// Internationalization (i18n)
// ===========================

const translations = {
  de: {
    // Page
    pageTitle: "Kunden-Onboarding | Kosmetikstudio",
    studioName: "Kosmetikstudio",
    formTitle: "Kunden-Onboarding Formular",

    // Sections
    personalInfo: "Persönliche Daten",
    healthInfo: "Gesundheitsinformationen",
    preferences: "Präferenzen & Notizen",
    photoUpload: "Foto (optional)",
    signature: "Unterschrift",

    // Personal Information
    firstName: "Vorname",
    lastName: "Nachname",
    birthDate: "Geburtsdatum",
    phone: "Telefonnummer",
    email: "E-Mail",

    // Placeholders
    firstNamePlaceholder: "z.B. Anna",
    lastNamePlaceholder: "z.B. Schmidt",
    phonePlaceholder: "+49 123 456789",
    emailPlaceholder: "beispiel@email.de",

    // Health Information
    allergies: "Allergien",
    allergiesPlaceholder: "Bitte geben Sie bekannte Allergien an...",
    healthNotes: "Gesundheitliche Hinweise",
    healthNotesPlaceholder: "Medikamente, Hauterkrankungen, etc...",

    // Preferences
    preferencesLabel: "Notizen",
    preferencesPlaceholder:
      "Besondere Wünsche, bevorzugte Behandlungen, etc...",

    // Photo
    photoLabel: "Hautzustand / Vorher-Foto",
    choosePhoto: "Foto auswählen oder aufnehmen",
    removePhoto: "Entfernen",

    // Signature
    signatureHint: "Bitte unterschreiben Sie mit dem Finger oder einem Stift",
    clearSignature: "Unterschrift löschen",

    // Buttons
    resetForm: "Formular zurücksetzen",
    generatePDF: "PDF erstellen",

    // Messages
    generating: "PDF wird erstellt...",
    successText: "PDF erfolgreich erstellt!",

    // Footer
    footerText: "© 2026 Kosmetikstudio | Alle Daten bleiben auf Ihrem Gerät",

    // Validation
    requiredField: "Dieses Feld ist erforderlich",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    signatureRequired: "Unterschrift ist erforderlich",

    // Confirm
    confirmReset:
      "Möchten Sie das Formular wirklich zurücksetzen? Alle eingegebenen Daten gehen verloren.",

    // PDF
    pdfClientOnboarding: "Kunden-Onboarding",
    pdfDate: "Datum",
    pdfPersonalData: "Persönliche Daten",
    pdfHealthData: "Gesundheitsinformationen",
    pdfPreferences: "Präferenzen & Notizen",
    pdfPhoto: "Foto",
    pdfSignature: "Unterschrift des Kunden",
    pdfNone: "Keine Angabe",
  },

  en: {
    // Page
    pageTitle: "Client Onboarding | Beauty Studio",
    studioName: "Beauty Studio",
    formTitle: "Client Onboarding Form",

    // Sections
    personalInfo: "Personal Information",
    healthInfo: "Health Information",
    preferences: "Preferences & Notes",
    photoUpload: "Photo (optional)",
    signature: "Signature",

    // Personal Information
    firstName: "First Name",
    lastName: "Last Name",
    birthDate: "Date of Birth",
    phone: "Phone Number",
    email: "Email",

    // Placeholders
    firstNamePlaceholder: "e.g. Anna",
    lastNamePlaceholder: "e.g. Smith",
    phonePlaceholder: "+1 123 456789",
    emailPlaceholder: "example@email.com",

    // Health Information
    allergies: "Allergies",
    allergiesPlaceholder: "Please list any known allergies...",
    healthNotes: "Health Notes",
    healthNotesPlaceholder: "Medications, skin conditions, etc...",

    // Preferences
    preferencesLabel: "Notes",
    preferencesPlaceholder: "Special requests, preferred treatments, etc...",

    // Photo
    photoLabel: "Skin Condition / Before Photo",
    choosePhoto: "Choose or take a photo",
    removePhoto: "Remove",

    // Signature
    signatureHint: "Please sign with your finger or a stylus",
    clearSignature: "Clear Signature",

    // Buttons
    resetForm: "Reset Form",
    generatePDF: "Generate PDF",

    // Messages
    generating: "Generating PDF...",
    successText: "PDF created successfully!",

    // Footer
    footerText: "© 2026 Beauty Studio | All data stays on your device",

    // Validation
    requiredField: "This field is required",
    invalidEmail: "Please enter a valid email address",
    signatureRequired: "Signature is required",

    // Confirm
    confirmReset:
      "Are you sure you want to reset the form? All entered data will be lost.",

    // PDF
    pdfClientOnboarding: "Client Onboarding",
    pdfDate: "Date",
    pdfPersonalData: "Personal Information",
    pdfHealthData: "Health Information",
    pdfPreferences: "Preferences & Notes",
    pdfPhoto: "Photo",
    pdfSignature: "Client Signature",
    pdfNone: "Not specified",
  },
};

// Current language (default: browser language or German)
let currentLanguage = "de";

// Initialize i18n
function initI18n() {
  // Default language is German
  currentLanguage = "de";

  // Check localStorage for saved language preference
  const savedLang = localStorage.getItem("preferredLanguage");
  if (savedLang && translations[savedLang]) {
    currentLanguage = savedLang;
  }

  // Apply translations
  applyTranslations();

  // Update language buttons
  updateLanguageButtons();

  // Add event listeners to language buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang && translations[lang]) {
        setLanguage(lang);
      }
    });
  });
}

// Set language
function setLanguage(lang) {
  if (!translations[lang]) return;

  currentLanguage = lang;
  localStorage.setItem("preferredLanguage", lang);

  applyTranslations();
  updateLanguageButtons();

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Apply translations to the page
function applyTranslations() {
  const t = translations[currentLanguage];

  // Update page title
  document.title = t.pageTitle;

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (t[key]) {
      element.textContent = t[key];
    }
  });

  // Update all placeholders with data-i18n-placeholder attribute
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (t[key]) {
      element.placeholder = t[key];
    }
  });
}

// Update language button states
function updateLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const lang = btn.getAttribute("data-lang");
    if (lang === currentLanguage) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Get translation by key
function t(key) {
  return translations[currentLanguage][key] || key;
}

// Get current language
function getCurrentLanguage() {
  return currentLanguage;
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initI18n);
} else {
  initI18n();
}
