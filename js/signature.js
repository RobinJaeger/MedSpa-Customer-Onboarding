// ===========================
// Signature Pad Handler
// ===========================

let signaturePad = null;

// Initialize signature pad
function initSignaturePad() {
  const canvas = document.getElementById("signatureCanvas");

  if (!canvas) {
    console.error("Signature canvas not found");
    return;
  }

  // Set canvas size based on container
  resizeCanvas(canvas);

  // Initialize SignaturePad
  signaturePad = new SignaturePad(canvas, {
    backgroundColor: "rgb(255, 255, 255)",
    penColor: "rgb(0, 0, 0)",
    minWidth: 1,
    maxWidth: 2.5,
    throttle: 16, // Smooth drawing at ~60fps
    minDistance: 5,
    velocityFilterWeight: 0.7,
  });

  // Clear signature button
  const clearButton = document.getElementById("clearSignature");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      clearSignature();
    });
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    resizeCanvas(canvas);
  });

  // Prevent scrolling when drawing on touch devices
  canvas.addEventListener(
    "touchstart",
    (e) => {
      // Only prevent if it's a single touch on the canvas
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

  // Store current signature data if exists
  let savedData = null;
  if (signaturePad && !signaturePad.isEmpty()) {
    savedData = signaturePad.toData();
  }

  // Set display size
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;

  // Scale context to ensure correct drawing operations
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);

  // Restore signature if it existed
  if (savedData && signaturePad) {
    signaturePad.fromData(savedData);
  } else if (signaturePad) {
    signaturePad.clear();
  }
}

// Clear signature
function clearSignature() {
  if (signaturePad) {
    signaturePad.clear();

    // Remove error state if present
    const canvas = document.getElementById("signatureCanvas");
    if (canvas) {
      canvas.classList.remove("error");
    }
  }
}

// Check if signature is empty
function isSignatureEmpty() {
  return signaturePad ? signaturePad.isEmpty() : true;
}

// Get signature as data URL (PNG)
function getSignatureDataURL() {
  if (!signaturePad || signaturePad.isEmpty()) {
    return null;
  }

  return signaturePad.toDataURL("image/png");
}

// Get signature as data (for restoration)
function getSignatureData() {
  if (!signaturePad || signaturePad.isEmpty()) {
    return null;
  }

  return signaturePad.toData();
}

// Restore signature from data
function setSignatureData(data) {
  if (signaturePad && data) {
    signaturePad.fromData(data);
  }
}

// Validate signature (show error state if empty)
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

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSignaturePad);
} else {
  initSignaturePad();
}
