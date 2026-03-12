// ===========================
// Signature Pad Handler
// ===========================

let signaturePad = null;
let signaturePadPractitioner = null;

// Initialize signature pads
function initSignaturePad() {
  // Initialize customer signature
  const canvas = document.getElementById("signatureCanvas");
  if (canvas) {
    resizeCanvas(canvas);
    signaturePad = new SignaturePad(canvas, {
      backgroundColor: "rgb(255, 255, 255)",
      penColor: "rgb(0, 0, 0)",
      minWidth: 1,
      maxWidth: 2.5,
      throttle: 16,
      minDistance: 5,
      velocityFilterWeight: 0.7,
    });

    // Clear button for customer signature
    const clearButton = document.getElementById("clearSignature");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        clearSignature();
      });
    }

    setupCanvasTouchHandlers(canvas);
  }

  // Initialize practitioner signature
  const canvasPractitioner = document.getElementById(
    "signatureCanvasPractitioner",
  );
  if (canvasPractitioner) {
    resizeCanvas(canvasPractitioner);
    signaturePadPractitioner = new SignaturePad(canvasPractitioner, {
      backgroundColor: "rgb(255, 255, 255)",
      penColor: "rgb(0, 0, 0)",
      minWidth: 1,
      maxWidth: 2.5,
      throttle: 16,
      minDistance: 5,
      velocityFilterWeight: 0.7,
    });

    // Clear button for practitioner signature
    const clearButtonPractitioner = document.getElementById(
      "clearSignaturePractitioner",
    );
    if (clearButtonPractitioner) {
      clearButtonPractitioner.addEventListener("click", () => {
        clearSignaturePractitioner();
      });
    }

    setupCanvasTouchHandlers(canvasPractitioner);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    if (canvas) resizeCanvas(canvas);
    if (canvasPractitioner) resizeCanvas(canvasPractitioner);
  });
}

// Setup touch event handlers for a canvas
function setupCanvasTouchHandlers(canvas) {
  // Prevent scrolling when drawing on touch devices
  canvas.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 1) {
        e.preventDefault();
      }
    },
    { passive: false },
  );

  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false },
  );
}

// Resize canvas to fit container while maintaining resolution
function resizeCanvas(canvas) {
  if (!canvas) return;

  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  const rect = canvas.getBoundingClientRect();

  // Determine which signature pad this canvas belongs to
  const isPractitioner = canvas.id === "signatureCanvasPractitioner";
  const pad = isPractitioner ? signaturePadPractitioner : signaturePad;

  // Store current signature data if exists
  let savedData = null;
  if (pad && !pad.isEmpty()) {
    savedData = pad.toData();
  }

  // Set display size
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;

  // Scale context to ensure correct drawing operations
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);

  // Restore signature if it existed
  if (savedData && pad) {
    pad.fromData(savedData);
  } else if (pad) {
    pad.clear();
  }
}

// Clear customer signature
function clearSignature() {
  if (signaturePad) {
    signaturePad.clear();
    const canvas = document.getElementById("signatureCanvas");
    if (canvas) {
      canvas.classList.remove("error");
    }
  }
}

// Clear practitioner signature
function clearSignaturePractitioner() {
  if (signaturePadPractitioner) {
    signaturePadPractitioner.clear();
    const canvas = document.getElementById("signatureCanvasPractitioner");
    if (canvas) {
      canvas.classList.remove("error");
    }
  }
}

// Check if customer signature is empty
function isSignatureEmpty() {
  return signaturePad ? signaturePad.isEmpty() : true;
}

// Check if practitioner signature is empty
function isSignaturePractitionerEmpty() {
  return signaturePadPractitioner ? signaturePadPractitioner.isEmpty() : true;
}

// Get customer signature as data URL (PNG)
function getSignatureDataURL() {
  if (!signaturePad || signaturePad.isEmpty()) {
    return null;
  }
  return signaturePad.toDataURL("image/png");
}

// Get practitioner signature as data URL (PNG)
function getSignaturePractitionerDataURL() {
  if (!signaturePadPractitioner || signaturePadPractitioner.isEmpty()) {
    return null;
  }
  return signaturePadPractitioner.toDataURL("image/png");
}

// Get customer signature as data (for restoration)
function getSignatureData() {
  if (!signaturePad || signaturePad.isEmpty()) {
    return null;
  }
  return signaturePad.toData();
}

// Get practitioner signature as data (for restoration)
function getSignaturePractitionerData() {
  if (!signaturePadPractitioner || signaturePadPractitioner.isEmpty()) {
    return null;
  }
  return signaturePadPractitioner.toData();
}

// Restore customer signature from data
function setSignatureData(data) {
  if (signaturePad && data) {
    signaturePad.fromData(data);
  }
}

// Restore practitioner signature from data
function setSignaturePractitionerData(data) {
  if (signaturePadPractitioner && data) {
    signaturePadPractitioner.fromData(data);
  }
}

// Validate customer signature (show error state if empty)
function validateSignature() {
  const canvas = document.getElementById("signatureCanvas");
  if (isSignatureEmpty()) {
    if (canvas) {
      canvas.classList.add("error");
    }
    return false;
  }
  if (canvas) {
    canvas.classList.remove("error");
  }
  return true;
}

// Validate practitioner signature (show error state if empty)
function validateSignaturePractitioner() {
  const canvas = document.getElementById("signatureCanvasPractitioner");
  if (isSignaturePractitionerEmpty()) {
    if (canvas) {
      canvas.classList.add("error");
    }
    return false;
  }
  if (canvas) {
    canvas.classList.remove("error");
  }
  return true;
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSignaturePad);
} else {
  initSignaturePad();
}
