# Professional Mode Requirements

Professional Mode is for researchers, professionals, and advanced students. It should show real article-derived fields before simplified scores.

## Main rule

When a user selects a material, Professional Mode must display the `articleData` object from `src/data/bciMaterials.js`.

Do not only show a 0–100 score.

## Professional material panel structure

```txt
Selected Material: [name]
Category: [category]

Article Data:
- youngsModulusGPa: ...
- thermalConductance_W_mK: ...
- electricalConductance_S_m: ...
- neurotoxicity: ...
- allergenicHistory: ...

Professional Interpretation:
[professionalExplanation]

Button: Easy Explanation
```

For functional coatings, the fields may instead include:

- materialUsed
- neuronAdhesion
- foreignBodyResponse
- studyLength
- iba1
- gfap
- neuronDensity
- nf100
- impedance

## Easy Explanation button

When clicked, reveal `easyExplanation`.

Example:

```txt
L1 protein made the implant more brain-friendly: fewer immune reactions, less scar-like tissue response, more healthy neurons, and stable electrical performance.
```

## Definitions

Use `measurementDefinitions` from the data file. Add tooltip icons next to technical terms:

- Young’s modulus
- Thermal conductance
- Electrical conductance
- Impedance
- Iba-1
- GFAP
- Neuron density
- NF-100
- ROS
- BBB leakage

## Example: L1 protein

Professional data should show:

```txt
Iba-1: Lower within 60 μm of implant compared to control
GFAP: Significantly lower 240 μm from implantation site
Neuron density: Significantly higher
NF-100: Increased, showing mature neurons
Impedance: No change compared to uncoated controls at 4 weeks
Study length: 2–4 months
```

Professional interpretation:

```txt
Lower Iba-1 suggests reduced microglial activation.
Lower GFAP suggests reduced astrocyte activation and glial scarring.
Higher neuron density suggests better neuron survival near the implant.
Increased NF-100 suggests more mature neuronal structures.
Stable impedance suggests the coating did not harm electrical performance.
```

## Example: Tungsten

Professional data should show:

```txt
Young’s modulus: 411 GPa
Thermal conductance: 170 W/m·K
Electrical conductance: 2.0 × 10^7 S/m
Neurotoxicity: Variable results
Allergenic history: Rare
```

Professional interpretation:

```txt
Tungsten has high electrical conductance, but its very high stiffness creates strong mechanical mismatch with soft brain tissue. The article also notes cytotoxic concerns under oxidizing conditions.
```
