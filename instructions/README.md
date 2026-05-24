# BCI Explorer Codex Package

This package contains the design instructions and article-derived data needed to build an interactive educational website about Brain-Computer Interfaces (BCIs), including non-invasive BCI demonstrations and invasive BCI biocompatibility/material simulations.

## Contents

```txt
bci_website_codex_package/
├── README.md
├── CODEX_PROMPT.md
├── docs/
│   ├── WEBSITE_DESIGN_SPEC.md
│   ├── PROFESSIONAL_MODE_REQUIREMENTS.md
│   └── SCIENTIFIC_DATA_NOTES.md
└── src/
    └── data/
        └── bciMaterials.js
```

## Most important instruction

Use `src/data/bciMaterials.js` as the core data file.

Professional Mode should show `articleData` first.  
Simple Mode may show `educationalSimulation`, but it must clearly say those scores are simplified educational estimates, not exact paper results.

## Recommended stack

- React or Next.js
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

Optional:

- React Three Fiber / Three.js for brain/person visualization

## Website summary

The website has three major parts:

1. Landing page: animated choice between invasive and non-invasive BCI.
2. Non-invasive BCI simulation: user places an EEG cap/headset on a simulated person and selects a disability/challenge.
3. Invasive BCI simulation: user selects a brain region and electrode type, implants a simplified electrode, then enters a biocompatibility lab.

The invasive biocompatibility lab has three material layers:

1. Conductive metals, metalloids, and alloys.
2. Biocompatible polymer/scaffold materials.
3. Bioactive or functional coatings.

After each selection, show immediate results. After all three layers are selected, show a final combined implant profile.
