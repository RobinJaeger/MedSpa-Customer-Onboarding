#!/bin/bash

# ===========================
# Setup Script für Kosmetikstudio Onboarding
# ===========================

echo "🎨 Kosmetikstudio Client Onboarding - Setup"
echo "============================================"
echo ""

# Erstelle Verzeichnisse
echo "📁 Erstelle Verzeichnisse..."
mkdir -p lib
mkdir -p assets

# Download Bibliotheken
echo ""
echo "📥 Lade JavaScript-Bibliotheken herunter..."

# Signature Pad
echo "  → Signature Pad v4.1.7..."
curl -s -o lib/signature_pad.min.js https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js

if [ -f lib/signature_pad.min.js ]; then
    echo "    ✅ Erfolgreich heruntergeladen"
else
    echo "    ❌ Fehler beim Download"
fi

# jsPDF
echo "  → jsPDF v2.5.1..."
curl -s -o lib/jspdf.umd.min.js https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js

if [ -f lib/jspdf.umd.min.js ]; then
    echo "    ✅ Erfolgreich heruntergeladen"
else
    echo "    ❌ Fehler beim Download"
fi

# Erstelle Platzhalter-Assets falls nicht vorhanden
echo ""
echo "🎨 Erstelle Platzhalter-Assets..."

# Erstelle placeholder.svg für Icons (wird dann zu PNG konvertiert)
if [ ! -f assets/icon-192.png ]; then
    echo "  → Platzhalter-Icons werden erstellt..."
    echo "    ℹ️  Bitte ersetzen Sie die Icons in assets/ mit Ihren eigenen"
    
    # Erstelle einfache Text-Datei als Hinweis
    echo "PLATZHALTER - Bitte eigene Icons hinzufügen:" > assets/ICONS_NEEDED.txt
    echo "- icon-192.png (192x192px)" >> assets/ICONS_NEEDED.txt
    echo "- icon-512.png (512x512px)" >> assets/ICONS_NEEDED.txt
    echo "" >> assets/ICONS_NEEDED.txt
    echo "Kostenlose Icon-Generatoren:" >> assets/ICONS_NEEDED.txt
    echo "- https://favicon.io/" >> assets/ICONS_NEEDED.txt
    echo "- https://realfavicongenerator.net/" >> assets/ICONS_NEEDED.txt
fi

if [ ! -f assets/logo.png ]; then
    echo "  → Platzhalter für Logo..."
    echo "    ℹ️  Bitte ersetzen Sie assets/logo.png mit Ihrem Studio-Logo"
    
    echo "PLATZHALTER - Bitte eigenes Logo hinzufügen:" > assets/LOGO_NEEDED.txt
    echo "- logo.png (empfohlen: 200x80px oder ähnlich)" >> assets/LOGO_NEEDED.txt
fi

# Zusammenfassung
echo ""
echo "============================================"
echo "✅ Setup abgeschlossen!"
echo ""
echo "📦 Heruntergeladene Bibliotheken:"
ls -lh lib/ 2>/dev/null || echo "  Keine Dateien gefunden"
echo ""
echo "📋 Nächste Schritte:"
echo "  1. Fügen Sie Ihre Icons hinzu (siehe assets/ICONS_NEEDED.txt)"
echo "  2. Fügen Sie Ihr Logo hinzu (siehe assets/LOGO_NEEDED.txt)"
echo "  3. Öffnen Sie index.html in einem Browser"
echo ""
echo "🚀 Viel Erfolg mit Ihrem Onboarding-Formular!"
echo ""
