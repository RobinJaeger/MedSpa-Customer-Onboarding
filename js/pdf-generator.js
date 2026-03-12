// ===========================
// PDF Generator
// ===========================

// Generate PDF from form data
async function generatePDF(
  formData,
  signatureDataURL,
  signaturePractitionerDataURL,
) {
  try {
    // Get jsPDF from window (loaded via script tag)
    const { jsPDF } = window.jspdf;

    if (!jsPDF) {
      throw new Error("jsPDF library not loaded");
    }

    // Create new PDF document (A4, portrait)
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Page settings
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let yPosition = margin;

    // Colors
    const primaryColor = [196, 166, 157]; // #C4A69D
    const textColor = [74, 74, 74]; // #4A4A4A
    const lightGray = [200, 200, 200];

    // Helper function to add text with wrapping
    const addText = (text, x, y, maxWidth, fontSize = 10, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setTextColor(...textColor);

      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + lines.length * fontSize * 0.35; // Return new Y position
    };

    // Helper function to check page break
    const checkPageBreak = (neededSpace = 40) => {
      if (yPosition > pageHeight - neededSpace) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Helper function to add a section header
    const addSection = (title) => {
      checkPageBreak(20);
      yPosition += 8;
      doc.setFillColor(...primaryColor);
      doc.rect(margin, yPosition - 5, contentWidth, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin + 3, yPosition);
      yPosition += 10;
      doc.setTextColor(...textColor);
    };

    // Helper function to add a field
    const addField = (label, value, isFullWidth = false) => {
      const fieldWidth = isFullWidth ? contentWidth : contentWidth / 2 - 5;
      checkPageBreak();

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...textColor);
      doc.text(label + ":", margin, yPosition);

      yPosition += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const displayValue = value || t("pdfNone");
      const lines = doc.splitTextToSize(displayValue, fieldWidth - 5);
      doc.text(lines, margin + 2, yPosition);

      yPosition += Math.max(lines.length * 5, 8);
      return yPosition;
    };

    // Helper function to add paragraph text
    const addParagraph = (text) => {
      checkPageBreak();
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);
      const lines = doc.splitTextToSize(text, contentWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 3;
    };

    // Helper function to add bullet list
    const addBulletList = (items) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);

      items.forEach((item) => {
        checkPageBreak();
        const lines = doc.splitTextToSize(item, contentWidth - 5);
        doc.text("•", margin, yPosition);
        doc.text(lines, margin + 5, yPosition);
        yPosition += lines.length * 5;
      });
      yPosition += 3;
    };

    // Helper function to draw checkbox
    const drawCheckbox = (x, y, checked) => {
      const size = 4;
      // Draw checkbox border
      doc.setDrawColor(...textColor);
      doc.setLineWidth(0.3);
      doc.rect(x, y - size + 1, size, size);

      // Draw X if checked
      if (checked) {
        doc.setLineWidth(0.5);
        doc.line(x + 0.5, y - size + 1.5, x + size - 0.5, y - 0.5);
        doc.line(x + size - 0.5, y - size + 1.5, x + 0.5, y - 0.5);
      }
    };

    // Helper function to draw radio button
    const drawRadioButton = (x, y, selected) => {
      const radius = 2;
      // Draw outer circle
      doc.setDrawColor(...textColor);
      doc.setLineWidth(0.3);
      doc.circle(x + radius, y - radius + 0.5, radius);

      // Draw filled circle if selected
      if (selected) {
        doc.setFillColor(...textColor);
        doc.circle(x + radius, y - radius + 0.5, radius * 0.6, "F");
      }
    };

    // ===========================
    // Header
    // ===========================

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(t("pdfClientOnboarding"), margin, yPosition);

    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    const currentDate = new Date().toLocaleDateString(
      getCurrentLanguage() === "de" ? "de-DE" : "en-US",
      { year: "numeric", month: "long", day: "numeric" },
    );
    doc.text(`${t("pdfDate")}: ${currentDate}`, margin, yPosition);

    yPosition += 5;
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // ===========================
    // Personal Information
    // ===========================

    addSection(t("pdfPersonalData"));

    addField(t("customerName"), formData.customerName, true);

    const col1X = margin;
    const col2X = margin + contentWidth / 2 + 5;
    let col1Y = yPosition;
    let col2Y = yPosition;

    // Birth Date
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(t("birthDate") + ":", col1X, col1Y);
    col1Y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const birthDateFormatted = formData.birthDate
      ? new Date(formData.birthDate).toLocaleDateString(
          getCurrentLanguage() === "de" ? "de-DE" : "en-US",
        )
      : t("pdfNone");
    doc.text(birthDateFormatted, col1X + 2, col1Y);
    col1Y += 8;

    // Phone
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(t("phone") + ":", col2X, col2Y);
    col2Y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(formData.phone || t("pdfNone"), col2X + 2, col2Y);
    col2Y += 8;

    yPosition = Math.max(col1Y, col2Y);
    addField(t("email"), formData.email, true);

    // ===========================
    // Section 1: Treatment Description
    // ===========================

    addSection(t("section1Title"));
    addParagraph(t("section1Text"));
    addParagraph(t("section1Text2"));

    // Treatment checkboxes
    const treatmentLabels = {
      manualHairStroke: t("treatmentManualHairStroke"),
      powderShading: t("treatmentPowderShading"),
      comboHairShading: t("treatmentComboHairShading"),
      lipFullShading: t("treatmentLipFullShading"),
      lipPartialShading: t("treatmentLipPartialShading"),
      eyeliner: t("treatmentEyeliner"),
      lashLine: t("treatmentLashLine"),
    };

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    Object.keys(treatmentLabels).forEach((key) => {
      checkPageBreak();
      const checked = formData.treatments.includes(key);
      drawCheckbox(margin, yPosition, checked);
      doc.text(treatmentLabels[key], margin + 7, yPosition);
      yPosition += 6;
    });
    yPosition += 3;

    // ===========================
    // Section 2: Health Information
    // ===========================

    addSection(t("section2Title"));
    addParagraph(t("section2Text"));

    // Health checkboxes
    const healthLabels = {
      noAllergies: t("healthNoAllergies"),
      noBloodDisorders: t("healthNoBloodDisorders"),
      noChronicSkinDiseases: t("healthNoChronicSkinDiseases"),
      noHerpesInfection: t("healthNoHerpesInfection"),
      noPregnancyBreastfeeding: t("healthNoPregnancyBreastfeeding"),
      noRecentCosmeticTreatments: t("healthNoRecentCosmeticTreatments"),
      noCardiovascularEpilepsy: t("healthNoCardiovascularEpilepsy"),
    };

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    Object.keys(healthLabels).forEach((key) => {
      checkPageBreak();
      const checked = formData.healthConditions.includes(key);
      drawCheckbox(margin, yPosition, checked);
      const lines = doc.splitTextToSize(healthLabels[key], contentWidth - 7);
      doc.text(lines, margin + 7, yPosition);
      yPosition += lines.length * 5 + 1;
    });
    yPosition += 5;

    addField(t("healthNotesLabel"), formData.healthNotes, true);

    // ===========================
    // Section 3: Treatment Education
    // ===========================

    addSection(t("section3Title"));
    addParagraph(t("section3Text"));
    addParagraph(t("education1"));

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(t("educationRisksTitle"), margin, yPosition);
    yPosition += 5;

    addBulletList([
      t("educationRisk1"),
      t("educationRisk2"),
      t("educationRisk3"),
      t("educationRisk4"),
    ]);

    doc.setFont("helvetica", "bold");
    doc.text(t("educationSideEffectsTitle"), margin, yPosition);
    yPosition += 5;

    addBulletList([
      t("educationSideEffect1"),
      t("educationSideEffect2"),
      t("educationSideEffect3"),
      t("educationSideEffect4"),
      t("educationSideEffect5"),
    ]);

    // ===========================
    // Section 4: Aftercare
    // ===========================

    addSection(t("section4Title"));
    addParagraph(t("section4Text"));

    addBulletList([
      t("aftercare1"),
      t("aftercare2"),
      t("aftercare3"),
      t("aftercare4"),
      t("aftercare5"),
    ]);

    addParagraph(t("section4Text2"));

    // ===========================
    // Section 5: Liability
    // ===========================

    addSection(t("section5Title"));
    addParagraph(t("section5Text"));

    // ===========================
    // Section 6: Data Protection
    // ===========================

    addSection(t("section6Title"));
    addParagraph(t("section6Text"));

    yPosition += 3;
    doc.setFont("helvetica", "bold");
    doc.text(t("photoConsentTitle"), margin, yPosition);
    yPosition += 5;

    doc.setFont("helvetica", "normal");
    const photoConsentLines = doc.splitTextToSize(
      t("photoConsentText"),
      contentWidth,
    );
    doc.text(photoConsentLines, margin, yPosition);
    yPosition += photoConsentLines.length * 5 + 5;

    // Draw radio buttons for yes/no
    const yesSelected = formData.photoConsent === "yes";
    const noSelected = formData.photoConsent === "no";

    drawRadioButton(margin, yPosition, yesSelected);
    doc.text(t("yes"), margin + 7, yPosition);

    drawRadioButton(margin + 25, yPosition, noSelected);
    doc.text(t("no"), margin + 32, yPosition);

    yPosition += 8;

    // ===========================
    // Section 7: Consent and Signature
    // ===========================

    addSection(t("section7Title"));
    addParagraph(t("section7Text"));

    addBulletList([t("consent1"), t("consent2"), t("consent3"), t("consent4")]);

    addField(t("locationDate"), formData.locationDate, true);

    // ===========================
    // Signatures
    // ===========================

    checkPageBreak(80);

    // Customer Signature
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(t("signatureCustomer"), margin, yPosition);
    yPosition += 5;

    if (signatureDataURL) {
      try {
        const signatureWidth = contentWidth * 0.6;
        const signatureHeight = 30;
        doc.addImage(
          signatureDataURL,
          "PNG",
          margin,
          yPosition,
          signatureWidth,
          signatureHeight,
        );
        yPosition += signatureHeight + 3;
      } catch (error) {
        console.error("Error adding customer signature:", error);
        doc.setFontSize(10);
        doc.text("(Signature could not be added)", margin, yPosition);
        yPosition += 10;
      }
    }

    yPosition += 8;

    // Practitioner Signature
    checkPageBreak(80);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(t("signaturePractitioner"), margin, yPosition);
    yPosition += 5;

    if (signaturePractitionerDataURL) {
      try {
        const signatureWidth = contentWidth * 0.6;
        const signatureHeight = 30;
        doc.addImage(
          signaturePractitionerDataURL,
          "PNG",
          margin,
          yPosition,
          signatureWidth,
          signatureHeight,
        );
        yPosition += signatureHeight + 3;
      } catch (error) {
        console.error("Error adding practitioner signature:", error);
        doc.setFontSize(10);
        doc.text("(Signature could not be added)", margin, yPosition);
        yPosition += 10;
      }
    }

    // ===========================
    // Additional Notes
    // ===========================

    if (formData.treatmentDate || formData.colorNotes) {
      addSection(t("additionalNotesTitle"));

      if (formData.treatmentDate) {
        const treatmentDateFormatted = new Date(
          formData.treatmentDate,
        ).toLocaleDateString(getCurrentLanguage() === "de" ? "de-DE" : "en-US");
        addField(t("treatmentDate"), treatmentDateFormatted, true);
      }

      if (formData.colorNotes) {
        addField(t("colorNotes"), formData.colorNotes, true);
      }
    }

    // ===========================
    // Footer on all pages
    // ===========================

    const pageCount = doc.internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);
      doc.text(
        `${t("studioName")} - ${t("footerText")}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" },
      );
      doc.text(`${i} / ${pageCount}`, pageWidth - margin, pageHeight - 10, {
        align: "right",
      });
    }

    // ===========================
    // Save PDF
    // ===========================

    const sanitize = (str) => {
      return str.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_");
    };

    const dateString = new Date().toISOString().split("T")[0];
    const fileName = `PMU_Consent_${sanitize(formData.customerName)}_${dateString}.pdf`;

    doc.save(fileName);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF: " + error.message);
    return false;
  }
}

// Export function
window.generatePDF = generatePDF;
