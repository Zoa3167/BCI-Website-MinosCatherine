# Paste this prompt into Codex

The BCI website currently uses fake-looking abstract images and incomplete animations. Replace them using the realistic asset manifest in `src/data/realisticBciAssets.js` and the downloaded assets in `public/bci-assets/sources/`.

## Main rule
Do not generate random abstract sci-fi art. Use the provided realistic images/references as the base for the visual design, then add UI overlays and animations.

## Tasks

1. Run `node scripts/download_assets.mjs`.
2. Import `realisticBciAssets` from `src/data/realisticBciAssets.js`.
3. Update the landing page:
   - Invasive slide: use the Utah electrode array reference and a realistic brain/cortex background.
   - Non-invasive slide: use the EEG BCI experiment / EEG cap reference.
   - The images should automatically interchange every few seconds.
   - Keep overlays minimal: labels, arrows, glow, signal traces.

4. Update the non-invasive BCI page:
   - Use a realistic simulated person or realistic photo-like avatar, not a flat cartoon.
   - The EEG cap should look like a real cap with fabric, electrodes, and wires.
   - After user places the cap, show a real signal path: EEG cap -> decoder/computer -> selected assistive device.
   - Challenge/device mappings:
     - Paralysis / limited movement -> exoskeleton hand on the person.
     - Speech impairment -> speaker / voice synthesizer.
     - Prosthetic hand control -> mechanical glove / robotic hand.
     - Wheelchair navigation -> powered wheelchair.
   - When the user clicks a mental command, the selected device must move or respond accordingly.

5. Update the invasive implantation animation:
   - Use a realistic brain with selectable regions.
   - Show selected brain region before implantation.
   - Do not implant all interfaces in the same place.
   - Show simplified layers: scalp -> skull -> dura/meninges -> cortex.
   - Keep it educational, not a surgical guide.

6. Update the brain tissue response visualization:
   - Use realistic tissue/cell texture around the implant.
   - Electrode must be embedded in tissue.
   - Show neurons, microglia, astrocytes, ROS/inflammation haze, and glial encapsulation.
   - Good material/coating = less inflammation and thinner encapsulation.
   - Bad material/coating = more cell clustering, thicker encapsulation, weaker signal.

7. Add attribution to About/Credits page using `docs/LICENSE_AND_ATTRIBUTION.md`.

8. Do not use unlicensed Getty/Wired/commercial images. Use the URLs and licenses in `assets_manifest.json`.
