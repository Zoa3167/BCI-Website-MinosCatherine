# Website Design Specification: BCI Explorer

## 1. Goal

Create an interactive educational website for explaining Brain-Computer Interfaces, or BCIs, and material biocompatibility. The audience includes both students and professionals.

The website should not feel like a static article. It should feel like an interactive science simulation.

## 2. Overall flow

```txt
Landing Page
│
├── Non-Invasive BCI path
│   ├── Put EEG cap/headset on simulated person
│   ├── Choose a disability/challenge
│   ├── Watch how BCI helps
│   └── See simple metrics and explanation
│
└── Invasive BCI path
    ├── Choose brain region
    ├── Choose electrode type
    ├── Watch simplified implantation animation
    └── Enter biocompatibility lab
        ├── Choose conductive material
        ├── Choose polymer/scaffold material
        ├── Choose functional coating
        └── See final combined implant result
```

## 3. Landing page

Use a dark, futuristic, scientific UI.

The hero visual automatically alternates every 5 seconds:

- Invasive BCI: brain with implanted microelectrodes.
- Non-invasive BCI: person wearing EEG cap/headset.

Landing page text:

```txt
BCI Explorer
Explore how brain-computer interfaces connect the brain to machines.
```

Buttons:

```txt
Start with Invasive BCI
Start with Non-Invasive BCI
```

## 4. Non-invasive BCI path

Purpose: show BCIs that do not require surgery.

User interaction:

1. Simulated person appears.
2. EEG cap/headset appears next to person.
3. User drags or clicks the headset into position.
4. Signal animation appears.
5. User selects a challenge:
   - Paralysis / limited movement
   - Speech impairment
   - Prosthetic hand control
   - Wheelchair navigation
6. Website shows how external brain signals can help.

Metrics to display:

- Signal strength
- Noise level
- Accuracy
- Training needed
- Response delay

Core lesson:

```txt
Non-invasive BCI is safer and easier to use, but signals are weaker and noisier because sensors are outside the skull.
```

## 5. Invasive BCI path

Purpose: show implanted neural interfaces and why biocompatibility matters.

Steps:

1. Select brain region:
   - Motor cortex
   - Speech area
   - Visual cortex
   - Somatosensory cortex
2. Select electrode type:
   - Utah Electrode Array
   - Michigan Probe
   - Microwire Electrode
   - Neuropixel-like Probe
3. Simplified animation shows electrode entering selected region.
4. Show biological reaction labels:
   - Tissue damage
   - ROS production
   - Microglia activation
   - Astrocyte activation
   - BBB leakage
   - Glial scar formation
5. Enter Biocompatibility Lab.

Important disclaimer:

```txt
This is an educational simulation, not a surgical guide.
```

## 6. Biocompatibility lab

The lab has three layers:

1. Conductive material: core electrode or conductive track.
2. Polymer/scaffold material: protective or structural material.
3. Functional coating: bioactive or anti-inflammatory coating.

Each section uses material cards. When a card is selected, display an immediate result.

After all three layers are selected, display a final combined result.

## 7. Immediate material result

When the user selects any material, show:

1. Material name.
2. Material category.
3. Professional article-based data table.
4. Professional interpretation.
5. Educational simulation graph.
6. Easy Explanation button.

## 8. Final combined implant result

After selecting all three layers, show:

- Selected conductive material
- Selected polymer/scaffold
- Selected functional coating
- Overall signal quality
- Overall biocompatibility
- Inflammation risk
- Glial scar risk
- Neuron survival
- Long-term stability

The final result can be calculated by averaging or weighted averaging `educationalSimulation` scores. Make clear this is an educational simulation.

Suggested rough weighting:

```txt
Conductive material: 45%
Polymer/scaffold: 25%
Functional coating: 30%
```

## 9. Professional Mode and Simple Mode

Add a global toggle.

Professional Mode:

- Show articleData tables.
- Show professionalExplanation.
- Show definitions for measurements.
- Use terms like Young’s modulus, impedance, Iba-1, GFAP, ROS, BBB leakage.

Simple Mode:

- Show easyExplanation.
- Show simple scores.
- Avoid dense technical terms unless the user asks.

## 10. Graphs

Use two types of graphs:

### Article-based property graphs

Examples:

- Young’s modulus comparison
- Electrical conductance comparison
- Thermal conductance comparison
- Toxicity category display
- Allergenic history display

### Educational simulation graphs

Examples:

- Biocompatibility score
- Inflammation risk
- Glial scar risk
- Neuron survival
- Signal quality

Always label simulation graphs clearly.

## 11. Visual style

Use:

- Dark navy/black background
- Neon blue, cyan, purple accents
- Cards with glassmorphism
- Animated signals
- Smooth transitions
- Clean educational layout

The website should look professional enough for scientists but still understandable for students.
