// ===========================
// Internationalization (i18n)
// ===========================

const translations = {
  de: {
    // Page
    pageTitle: "Kundeneinverständniserklärung für Permanent Make-up (PMU)",
    studioName: "Kosmetikstudio",
    formTitle: "Kundeneinverständniserklärung für Permanent Make-up (PMU)",

    // Personal Information
    customerName: "Name der Kundin / des Kunden",
    birthDate: "Geburtsdatum",
    phone: "Telefonnummer",
    email: "E-Mail-Adresse",

    // Section 1: Treatment Description
    section1Title: "1. Beschreibung der Behandlung",
    section1Text:
      "Ich, die unterzeichnende Kundin / der unterzeichnende Kunde, erkläre mich ausdrücklich damit einverstanden, dass an mir eine kosmetische Pigmentierung (Permanent Make-up) durchgeführt wird.",
    section1Text2:
      "Diese Behandlung umfasst das Einbringen von Farbpigmenten in die obere Hautschicht mittels einer feinen Nadel/Blade und erfolgt an folgenden Bereichen: (bitte ankreuzen):",

    // Treatment Types
    treatmentManualHairStroke: "manuelle Härchenzeichnung",
    treatmentPowderShading: "Puderschattierung",
    treatmentComboHairShading: "Kombi aus Härchen & Schattierung",
    treatmentLipFullShading: "Lippenpigmentierung, Vollschattierung",
    treatmentLipPartialShading: "Lippenpigmentierung, Teilschattierung",
    treatmentEyeliner: "Lidstrich",
    treatmentLashLine: "Wimpernkranzverdichtung oben/unten",

    // Section 2: Health Information
    section2Title: "2. Gesundheitliche Angaben",
    section2Text:
      "Ich bestätige, dass ich die folgenden Angaben wahrheitsgemäß gemacht habe:",

    // Health Checkboxes
    healthNoAllergies: "Keine Allergien gegen Farb- oder Pflegeprodukte",
    healthNoBloodDisorders:
      "Keine Blutgerinnungsstörungen / Einnahme blutverdünnender Medikamente",
    healthNoChronicSkinDiseases:
      "Keine chronischen Hauterkrankungen (z. B. Neurodermitis, Psoriasis)",
    healthNoHerpesInfection: "Keine aktive Herpesinfektion (bei Lippen-PMU)",
    healthNoPregnancyBreastfeeding: "Keine Schwangerschaft oder Stillzeit",
    healthNoRecentCosmeticTreatments:
      "Keine kürzlich durchgeführten kosmetischen Behandlungen im betroffenen Bereich",
    healthNoCardiovascularEpilepsy:
      "Keine bekannten Herz-Kreislauf-Erkrankungen / Epilepsie",
    healthNotesLabel: "Falls etwas davon zutrifft, bitte hier notieren:",

    // Section 3: Treatment Education
    section3Title: "3. Aufklärung über die Behandlung",
    section3Text:
      "Ich wurde ausführlich über folgende Punkte aufgeklärt und habe sie verstanden:",

    education1:
      "- Der Ablauf der Behandlung, inkl. Technik, verwendete Farben und Instrumente.",
    educationRisksTitle: "Mögliche Risiken, u. a.:",
    educationRisk1: "Hautirritationen, Schwellungen, Rötungen",
    educationRisk2: "Infektionen bei unzureichender Nachsorge",
    educationRisk3: "allergische Reaktionen auf Pigmente oder Pflegeprodukte",
    educationRisk4: "ungleichmäßiges Abheilen / Pigmentverlust",

    educationSideEffectsTitle: "Mögliche Nebenwirkungen und Komplikationen",
    educationSideEffect1:
      "Dass eine Nachbehandlung erforderlich ist, da etwa 30–60 % der Farbe nach der ersten Behandlung verblassen können.",
    educationSideEffect2:
      "Dass die Abheilung individuell unterschiedlich verläuft (Dauer: ca. 5–14 Tage).",
    educationSideEffect3:
      "Dass das endgültige Ergebnis erst nach vollständiger Abheilung (ca. 4–6 Wochen) sichtbar ist.",
    educationSideEffect4:
      "Dass bei vorher bestehenden Hautveränderungen (z. B. Narben, Couperose, Neurodermitis) ein abweichendes Ergebnis möglich ist.",
    educationSideEffect5:
      "Dass die Behandlung keine medizinische oder dermatologische Maßnahme darstellt.",

    // Section 4: Aftercare
    section4Title: "4. Nachbehandlung und Abheilung",
    section4Text:
      "Ich verpflichte mich, die mitgegebenen oder mündlich erklärten Pflegehinweise während der Abheilzeit gewissenhaft zu befolgen, insbesondere:",

    aftercare1: "Kein Kratzen oder Abreißen von Krusten oder Schorf",
    aftercare2:
      "Kein Solarium, Schwimmbad, Sauna oder starke Sonnenbestrahlung in den ersten 7 Tagen",
    aftercare3:
      "Kein Make-up oder aggressive Pflegeprodukte auf den behandelten Arealen",
    aftercare4: "Kontakt mit Schmutz, Schweiß oder Reibung vermeiden",
    aftercare5: "Kein direkter starker Wasserkontakt auf die Partie",

    section4Text2:
      "Mir ist bewusst, dass eine unsachgemäße Nachsorge das Ergebnis erheblich beeinträchtigen kann und nicht unter die Haftung der Behandlerin / des Behandlers fällt.",

    // Section 5: Liability
    section5Title: "5. Haftungsausschluss",
    section5Text:
      "Ich erkläre hiermit, dass ich die Behandlung freiwillig und auf eigene Verantwortung durchführen lasse. Ich entbinde die Behandlerin / den Behandler von jeglicher Haftung für mögliche unerwünschte Reaktionen oder ästhetische Ergebnisse, sofern diese nicht auf grobe Fahrlässigkeit zurückzuführen sind.",

    // Section 6: Data Protection
    section6Title: "6. Datenschutz",
    section6Text:
      "Ich bin damit einverstanden, dass meine personenbezogenen Daten im Rahmen der Behandlung dokumentiert und gespeichert werden. Eine Weitergabe an Dritte erfolgt nicht.",

    photoConsentTitle: "Einwilligung zur Fotoverwendung",
    photoConsentText:
      "Ich bin damit einverstanden, dass im Rahmen der Behandlung (z.B. Vorher-Nachher-Bild) von mir gemacht werden. Diese dürfen zu Dokumentations- und Werbezwecken verwendet werden, insbesondere auf Social Media (z.B. Instagram, Tik Tok), auf der Webseite sowie in Print- oder Online-Medien des Studios.",

    yes: "ja",
    no: "nein",

    // Section 7: Consent and Signature
    section7Title: "7. Einverständnis und Unterschrift",
    section7Text: "Ich bestätige, dass ich:",

    consent1: "die Behandlung in vollem Umfang verstanden habe.",
    consent2: "umfassend aufgeklärt wurde.",
    consent3:
      "alle Fragen gestellt und zufriedenstellend beantwortet bekommen habe.",
    consent4: "mit der Durchführung einverstanden bin.",

    locationDate: "Ort, Datum",

    // Signatures
    signatureCustomer: "Unterschrift Kundin / Kunde",
    signaturePractitioner: "Unterschrift Behandler:in",
    signatureHint: "Bitte unterschreiben Sie mit dem Finger oder einem Stift",
    signatureHintPractitioner: "Unterschrift der Behandlerin / des Behandlers",
    clearSignature: "Unterschrift löschen",

    // Additional Notes
    additionalNotesTitle: "Zusätzliche Notizen",
    treatmentDate: "Datum der Behandlung:",
    colorNotes: "Farbkombination/Notizen:",

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
    pdfClientOnboarding:
      "Kundeneinverständniserklärung für Permanent Make-up (PMU)",
    pdfDate: "Datum",
    pdfPersonalData: "Persönliche Daten",
    pdfSignature: "Unterschrift",
    pdfNone: "Keine Angabe",
  },

  en: {
    // Page
    pageTitle: "Client Consent Form for Permanent Make-up (PMU)",
    studioName: "Beauty Studio",
    formTitle: "Client Consent Form for Permanent Make-up (PMU)",

    // Personal Information
    customerName: "Name of Client",
    birthDate: "Date of Birth",
    phone: "Phone Number",
    email: "Email Address",

    // Section 1: Treatment Description
    section1Title: "1. Treatment Description",
    section1Text:
      "I, the undersigned client, expressly consent to receiving cosmetic pigmentation (Permanent Make-up).",
    section1Text2:
      "This treatment involves the introduction of color pigments into the upper skin layer using a fine needle/blade and will be performed on the following areas: (please check):",

    // Treatment Types
    treatmentManualHairStroke: "manual hair stroke technique",
    treatmentPowderShading: "powder shading",
    treatmentComboHairShading: "combination of hair strokes & shading",
    treatmentLipFullShading: "lip pigmentation, full shading",
    treatmentLipPartialShading: "lip pigmentation, partial shading",
    treatmentEyeliner: "eyeliner",
    treatmentLashLine: "lash line enhancement upper/lower",

    // Section 2: Health Information
    section2Title: "2. Health Information",
    section2Text:
      "I confirm that I have truthfully provided the following information:",

    // Health Checkboxes
    healthNoAllergies: "No allergies to color or care products",
    healthNoBloodDisorders:
      "No blood clotting disorders / taking blood-thinning medications",
    healthNoChronicSkinDiseases:
      "No chronic skin diseases (e.g. atopic dermatitis, psoriasis)",
    healthNoHerpesInfection: "No active herpes infection (for lip PMU)",
    healthNoPregnancyBreastfeeding: "Not pregnant or breastfeeding",
    healthNoRecentCosmeticTreatments:
      "No recent cosmetic treatments in the affected area",
    healthNoCardiovascularEpilepsy:
      "No known cardiovascular diseases / epilepsy",
    healthNotesLabel: "If any of these apply, please note here:",

    // Section 3: Treatment Education
    section3Title: "3. Treatment Information",
    section3Text:
      "I have been thoroughly informed about the following points and have understood them:",

    education1:
      "- The course of treatment, including technique, colors and instruments used.",
    educationRisksTitle: "Possible risks, including:",
    educationRisk1: "Skin irritation, swelling, redness",
    educationRisk2: "Infections with inadequate aftercare",
    educationRisk3: "allergic reactions to pigments or care products",
    educationRisk4: "uneven healing / pigment loss",

    educationSideEffectsTitle: "Possible side effects and complications",
    educationSideEffect1:
      "That a follow-up treatment is required, as approximately 30-60% of the color may fade after the first treatment.",
    educationSideEffect2:
      "That healing varies individually (duration: approximately 5-14 days).",
    educationSideEffect3:
      "That the final result is only visible after complete healing (approximately 4-6 weeks).",
    educationSideEffect4:
      "That pre-existing skin changes (e.g. scars, couperose, atopic dermatitis) may result in a different outcome.",
    educationSideEffect5:
      "That the treatment is not a medical or dermatological procedure.",

    // Section 4: Aftercare
    section4Title: "4. Aftercare and Healing",
    section4Text:
      "I commit to carefully following the provided or verbally explained care instructions during the healing period, in particular:",

    aftercare1: "No scratching or picking of crusts or scabs",
    aftercare2:
      "No tanning salon, swimming pool, sauna, or strong sun exposure for the first 7 days",
    aftercare3: "No make-up or aggressive care products on the treated areas",
    aftercare4: "Avoid contact with dirt, sweat, or friction",
    aftercare5: "No direct strong water contact on the area",

    section4Text2:
      "I am aware that improper aftercare can significantly affect the result and is not the responsibility of the practitioner.",

    // Section 5: Liability
    section5Title: "5. Liability Disclaimer",
    section5Text:
      "I hereby declare that I am undergoing treatment voluntarily and at my own responsibility. I release the practitioner from any liability for possible adverse reactions or aesthetic results, provided they are not due to gross negligence.",

    // Section 6: Data Protection
    section6Title: "6. Data Protection",
    section6Text:
      "I consent to my personal data being documented and stored as part of the treatment. No data will be shared with third parties.",

    photoConsentTitle: "Consent for Photo Use",
    photoConsentText:
      "I consent to photos being taken as part of the treatment (e.g. before-and-after photos). These may be used for documentation and advertising purposes, particularly on social media (e.g. Instagram, TikTok), on the website, and in print or online media of the studio.",

    yes: "yes",
    no: "no",

    // Section 7: Consent and Signature
    section7Title: "7. Consent and Signature",
    section7Text: "I confirm that I:",

    consent1: "have fully understood the treatment.",
    consent2: "have been comprehensively informed.",
    consent3: "have asked all questions and received satisfactory answers.",
    consent4: "consent to the treatment.",

    locationDate: "Place, Date",

    // Signatures
    signatureCustomer: "Client Signature",
    signaturePractitioner: "Practitioner Signature",
    signatureHint: "Please sign with your finger or a stylus",
    signatureHintPractitioner: "Signature of the practitioner",
    clearSignature: "Clear Signature",

    // Additional Notes
    additionalNotesTitle: "Additional Notes",
    treatmentDate: "Treatment Date:",
    colorNotes: "Color Combination/Notes:",

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
    pdfClientOnboarding: "Client Consent Form for Permanent Make-up (PMU)",
    pdfDate: "Date",
    pdfPersonalData: "Personal Information",
    pdfSignature: "Signature",
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
