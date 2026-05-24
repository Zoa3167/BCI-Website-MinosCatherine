# Scientific Data Notes

## What the uploaded article is about

The article is a review of implanted brain-machine interface / brain-computer interface materials and designs. It focuses on invasive implanted interfaces, not non-invasive EEG cap material performance.

Use the article-derived data primarily for the invasive BCI biocompatibility lab.

## What data can be treated as article-based

The following are article-based fields:

- Young’s modulus
- Thermal conductance
- Electrical conductance
- Neurotoxicity category
- Allergenic history
- Coating evidence such as lower Iba-1, lower GFAP, higher neuron density, BBB leakage, impedance changes, etc.

These are stored inside `articleData`.

## What data is simulated

The following are simplified teaching scores and are not exact article data:

- biocompatibilityScore
- inflammationRisk
- glialScarRisk
- neuronSurvival
- signalQuality

These are stored inside `educationalSimulation`.

Show a disclaimer whenever these scores are graphed.

## Why scores are simulated

The uploaded paper is a review article. It does not provide one single unified experiment comparing every material under identical conditions. It summarizes many studies with different devices, animal models, measurement methods, and time periods.

Therefore, it is scientifically safer to use:

```txt
Professional Mode: articleData
Simple Mode: educationalSimulation with disclaimer
```

## Biocompatibility logic to teach

A better implanted BCI material generally has:

- Lower mechanical mismatch with brain tissue.
- Lower neurotoxicity.
- Lower ROS / oxidative stress.
- Lower microglial activation.
- Lower astrocyte activation / glial scarring.
- Higher neuron survival near the implant.
- Stable or improved impedance/signal transfer.

## Key marker meanings

- Iba-1: microglial activation marker.
- GFAP: astrocyte activation / gliosis marker.
- Neuron density: neuron survival near implant.
- NF-100: mature neuronal structure marker.
- BBB leakage: disruption of the blood-brain barrier.
- ROS: reactive oxygen species, damaging oxidative molecules.
- Impedance: resistance/reactance to signal transfer at the electrode-tissue interface.
