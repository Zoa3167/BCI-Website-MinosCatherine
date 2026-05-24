# BCI Visual Implementation Requirements

## Landing page

The first page must not use simple outline icons as the main image. It should show two realistic models/reference images:

- Invasive BCI: Utah-style microelectrode array / implanted cortical array.
- Non-invasive BCI: EEG cap / headset with electrodes and wires.

Animation:
- Every 5 seconds, crossfade between invasive and non-invasive.
- Add labels: implanted electrode array, brain tissue, signal processor, EEG electrodes, scalp, decoder.
- Do not over-stylize the actual device.

## Non-invasive page

Required sequence:

1. User sees realistic person/avatar.
2. User drags EEG cap onto head.
3. System says: signal detected / calibration started.
4. User chooses disability/challenge.
5. Device appears and connects to cap through decoder.
6. Mental command buttons control device movement.

Device mapping:
- Paralysis -> exoskeleton hand.
- Speech impairment -> speaker.
- Prosthetic hand -> mechanical glove/robotic hand.
- Wheelchair -> powered wheelchair.

## Invasive page

Required sequence:

1. Show brain model with selectable regions.
2. User chooses region.
3. User chooses electrode type.
4. Highlight chosen brain area.
5. Show simplified layers opening.
6. Implant electrode into the correct selected region.
7. Show neural signal connection.

Do not place all electrodes into the same location.

## Tissue response visualization

Required elements:

- Realistic electrode shank/tip.
- Tissue-like background.
- Neuron-like cells.
- Microglia-like cells.
- Astrocyte-like star-shaped cells.
- ROS/inflammation haze.
- Glial scar/encapsulation layer.

Interaction:
- Selecting a less biocompatible material should increase inflammation and encapsulation.
- Selecting a better coating should reduce visible tissue response.

## Professional mode

Professional mode may show real figure references from Frontiers/Wikimedia with attribution.

## Simple mode

Simple mode should use simplified animation derived from the realistic visuals, not raw surgical imagery.
