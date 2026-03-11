// ===========================
// PDF Generator
// ===========================

// Generate PDF from form data
async function generatePDF(formData, signatureDataURL, photoDataURL) {
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

    // Helper function to add a section
    const addSection = (title) => {
      yPosition += 8;
      doc.setFillColor(...primaryColor);
      doc.rect(margin, yPosition - 5, contentWidth, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin + 3, yPosition);
      yPosition += 10;
      doc.setTextColor(...textColor);
    };

    // Helper function to add a field
    const addField = (label, value, isFullWidth = false) => {
      const fieldWidth = isFullWidth ? contentWidth : contentWidth / 2 - 5;

      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin;
      }

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

    // ===========================
    // Header
    // ===========================

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(t("pdfClientOnboarding"), margin, yPosition);

    // Date
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    const currentDate = new Date().toLocaleDateString(
      getCurrentLanguage() === "de" ? "de-DE" : "en-US",
      { year: "numeric", month: "long", day: "numeric" },
    );
    doc.text(`${t("pdfDate")}: ${currentDate}`, margin, yPosition);

    // Divider line
    yPosition += 5;
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // ===========================
    // Personal Information
    // ===========================

    addSection(t("pdfPersonalData"));

    const col1X = margin;
    const col2X = margin + contentWidth / 2 + 5;
    let col1Y = yPosition;
    let col2Y = yPosition;

    // First Name
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(t("firstName") + ":", col1X, col1Y);
    col1Y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(formData.firstName || t("pdfNone"), col1X + 2, col1Y);
    col1Y += 8;

    // Last Name
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(t("lastName") + ":", col2X, col2Y);
    col2Y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(formData.lastName || t("pdfNone"), col2X + 2, col2Y);
    col2Y += 8;

    yPosition = Math.max(col1Y, col2Y);

    // Birth Date
    col1Y = yPosition;
    col2Y = yPosition;

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

    // Email (full width)
    addField(t("email"), formData.email, true);

    // ===========================
    // Health Information
    // ===========================

    addSection(t("pdfHealthData"));

    addField(t("allergies"), formData.allergies, true);
    addField(t("healthNotes"), formData.healthNotes, true);

    // ===========================
    // Preferences
    // ===========================

    addSection(t("pdfPreferences"));

    addField(t("preferencesLabel"), formData.preferences, true);

    // ===========================
    // Photo (if provided)
    // ===========================

    if (photoDataURL) {
      addSection(t("pdfPhoto"));

      // Check if we need a new page for the photo
      if (yPosition > pageHeight - 100) {
        doc.addPage();
        yPosition = margin;
      }

      try {
        // Add photo with max dimensions
        const maxPhotoWidth = contentWidth * 0.6;
        const maxPhotoHeight = 80;

        // Add image (jsPDF will maintain aspect ratio)
        doc.addImage(
          photoDataURL,
          "JPEG",
          margin,
          yPosition,
          maxPhotoWidth,
          maxPhotoHeight,
        );

        yPosition += maxPhotoHeight + 10;
      } catch (error) {
        console.error("Error adding photo to PDF:", error);
        doc.setFontSize(10);
        doc.text("(Photo could not be added)", margin, yPosition);
        yPosition += 10;
      }
    }

    // ===========================
    // Signature
    // ===========================

    // Check if we need a new page for the signature
    if (yPosition > pageHeight - 80) {
      doc.addPage();
      yPosition = margin;
    }

    addSection(t("pdfSignature"));

    if (signatureDataURL) {
      try {
        // Add signature
        const signatureWidth = contentWidth * 0.7;
        const signatureHeight = 40;

        doc.addImage(
          signatureDataURL,
          "PNG",
          margin,
          yPosition,
          signatureWidth,
          signatureHeight,
        );

        yPosition += signatureHeight + 5;

        // Add date under signature
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.text(currentDate, margin, yPosition);
      } catch (error) {
        console.error("Error adding signature to PDF:", error);
        doc.setFontSize(10);
        doc.text("(Signature could not be added)", margin, yPosition);
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

    // Generate filename: Onboarding_LastName_FirstName_YYYY-MM-DD.pdf
    const sanitize = (str) => {
      return str.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "_");
    };

    const dateString = new Date().toISOString().split("T")[0];
    const fileName = `Onboarding_${sanitize(formData.lastName)}_${sanitize(formData.firstName)}_${dateString}.pdf`;

    // Save the PDF
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
