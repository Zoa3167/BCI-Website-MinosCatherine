# Prompt to give Codex

Build an interactive educational website called **BCI Explorer**.

Use React or Next.js with Tailwind CSS, Framer Motion, Recharts, and Lucide React.

Use the data file at:

```txt
src/data/bciMaterials.js
```

## Core product goal

The website explains Brain-Computer Interfaces to a mixed audience of students and professionals. It should let users explore invasive and non-invasive BCIs and then investigate how implanted BCI material choices affect biocompatibility.

## Main routes

```txt
/                       Landing page
/non-invasive           Non-invasive BCI simulation
/invasive               Invasive BCI implantation simulation
/invasive/materials     Biocompatibility lab
/about                  Sources, article explanation, and disclaimers
```

## Landing page

Create a dark futuristic landing page. It should automatically switch every 5 seconds between:

1. Invasive BCI: brain with implanted microelectrodes.
2. Non-invasive BCI: person wearing EEG cap or external headset.

Show two large buttons:

- Start with Invasive BCI
- Start with Non-Invasive BCI

## Non-invasive path

Create a simulated person and EEG headset. The user should place/activate the EEG cap on the person. Then the user chooses a disability/challenge:

- Paralysis / limited movement
- Speech impairment
- Prosthetic hand control
- Wheelchair navigation

Use `nonInvasiveUseCases` from the data file.

Display signal strength, noise level, accuracy, training needed, and response delay. Include an Easy Explanation button.

## Invasive path

The user should:

1. Choose a brain region using `brainRegions`.
2. Choose an electrode type using `electrodeTypes`.
3. Watch a simplified implantation animation.
4. Enter the material lab.

Do not make this a surgical guide. It is a simplified educational animation only.

## Biocompatibility lab

The material lab has three sections:

1. Conductive material: use `conductiveMaterials`.
2. Polymer/scaffold material: use `polymerAndScaffoldMaterials`.
3. Functional coating: use `functionalCoatings`.

After each material selection, immediately show:

- Selected material name
- Category
- Professional data table from `articleData`
- Professional explanation
- Graphs based on `educationalSimulation`
- Easy Explanation button

After all three sections are selected, show a final combined implant result.

## Professional Mode vs Simple Mode

Add a toggle:

```txt
Simple Mode | Professional Mode
```

Professional Mode:

- Show `articleData` in tables.
- Show professionalExplanation.
- Include raw terms such as Young’s modulus, impedance, Iba-1, GFAP, neuron density, NF-100, BBB leakage, ROS.

Simple Mode:

- Show easyExplanation.
- Show simple scores from `educationalSimulation`.
- Explain results in plain language.

## Required disclaimer

Show this on material graphs and in About page:

> Educational simulation scores are simplified estimates based on trends described in the review article. They are not exact values from the paper and are not clinical predictions.

## Visual tissue simulation

Create a zoomed-in brain tissue animation using this legend:

- Green cells = healthy neurons
- Purple cells = microglia
- Orange cells = astrocytes
- Red particles = ROS / inflammation
- Gray ring = glial scar
- Blue lines = signal quality

Poor materials should show more red particles, more immune cells, thicker scar, weaker blue signals, and fewer neurons. Better materials/coatings should show fewer red particles, thinner scar, more neurons, and stronger signal.

## Suggested components

```txt
App
LandingPage
BCITypeSwitcher
HeroBCIAnimation
ChoiceCard
ModeToggle
NonInvasiveSimulation
DevicePlacement
DisabilitySelector
NonInvasiveResultPanel
InvasiveSimulation
BrainRegionSelector
ElectrodeTypeSelector
ImplantAnimation
BiocompatibilityLab
MaterialSection
MaterialCard
ProfessionalDataPanel
SimpleExplanationPanel
GraphPanel
BrainTissueVisualization
CombinedImplantResult
AboutPage
```

