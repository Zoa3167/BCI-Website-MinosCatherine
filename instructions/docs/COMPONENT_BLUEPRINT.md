# Component Blueprint

Build these React components.

## App-level

- `App` or Next.js app router
- `ModeToggle`: Simple Mode / Professional Mode
- `Navbar`
- `Footer`

## Landing page

- `LandingPage`
- `BCITypeSwitcher`
- `HeroBCIAnimation`
- `ChoiceCard`

## Non-invasive path

- `NonInvasiveSimulation`
- `DevicePlacement`
- `DisabilitySelector`
- `NonInvasiveResultPanel`

## Invasive path

- `InvasiveSimulation`
- `BrainRegionSelector`
- `ElectrodeTypeSelector`
- `ImplantAnimation`

## Biocompatibility lab

- `BiocompatibilityLab`
- `MaterialSection`
- `MaterialCard`
- `ProfessionalDataPanel`
- `SimpleExplanationPanel`
- `GraphPanel`
- `BrainTissueVisualization`
- `CombinedImplantResult`

## Data imports

```js
import {
  conductiveMaterials,
  polymerAndScaffoldMaterials,
  functionalCoatings,
  measurementDefinitions,
  electrodeTypes,
  brainRegions,
  nonInvasiveUseCases,
  dataUsageWarning
} from "./data/bciMaterials";
```

## Combined score idea

Use this only as an educational simulation:

```js
function weightedAverage(a, b, c, key) {
  return Math.round(
    a.educationalSimulation[key] * 0.45 +
    b.educationalSimulation[key] * 0.25 +
    c.educationalSimulation[key] * 0.30
  );
}
```

For risk scores, lower is better. For signal quality, biocompatibility, and neuron survival, higher is better.
