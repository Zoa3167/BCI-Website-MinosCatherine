// src/data/realisticBciAssets.js
// Realistic BCI visual asset manifest for BCI Explorer.
// Run `node scripts/download_assets.mjs` first to download files to public/bci-assets/sources/.

export const realisticBciAssets = {
  landingPage: {
    invasive: {
      title: "Realistic invasive BCI / Utah electrode array",
      localSrc: "/bci-assets/sources/invasive_utah_array_patent.jpg",
      fallbackRemoteSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Utah_array_pat5215088.jpg",
      caption: "Utah-style penetrating microelectrode array reference",
      useInstruction:
        "Use this as the invasive BCI hero visual or as a texture/reference. Add a realistic brain/cortex background and animate the array approaching/entering a selected cortex region."
    },
    nonInvasive: {
      title: "Realistic non-invasive EEG BCI experiment",
      localSrc: "/bci-assets/sources/noninvasive_bci_experiment.jpg",
      fallbackRemoteSrc: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Brain-computer_interface_experiment.jpg",
      caption: "EEG cap BCI experiment with live signal screen",
      useInstruction:
        "Use this for the non-invasive hero visual. Do not replace with an abstract helmet icon. Add subtle signal traces and UI overlay only."
    }
  },

  nonInvasiveSimulation: {
    eegCapCloseup: {
      localSrc: "/bci-assets/sources/eeg_recording_cap_closeup.jpg",
      fallbackRemoteSrc: "https://upload.wikimedia.org/wikipedia/commons/4/41/EEG_Recording_Cap.jpg",
      useInstruction:
        "Use as a realistic texture/reference for the draggable EEG cap. The cap should look like fabric with multiple electrodes and wires, not a simple sci-fi helmet."
    },
    bciSystemReference: {
      localSrc: "/bci-assets/sources/bci_system_public_domain.jpg",
      fallbackRemoteSrc: "https://upload.wikimedia.org/wikipedia/commons/4/42/Brain-computer_interface_%28BCI%29_system.jpg",
      useInstruction:
        "Use as a reference for BCI connected to computer. The interactive page should connect EEG cap to exoskeleton hand, speaker, mechanical glove, or wheelchair depending on selected disability."
    },
    challengeDevices: [
      {
        id: "paralysis",
        label: "Paralysis / Limited Movement",
        outputDevice: "Exoskeleton hand",
        animationRequirement:
          "When the user clicks mental commands such as Open, Close, Lift, or Relax, animate the exoskeleton hand on the person moving accordingly. Show signal path: EEG cap -> decoder screen -> exoskeleton hand."
      },
      {
        id: "speech-impairment",
        label: "Speech Impairment",
        outputDevice: "Speaker / voice synthesizer",
        animationRequirement:
          "When the user selects a mental command or target phrase, animate the BCI decoder sending output to a speaker. The speaker should display/say a phrase such as 'I need help' or 'I am thirsty'."
      },
      {
        id: "prosthetic-hand",
        label: "Prosthetic Hand Control",
        outputDevice: "Mechanical glove / robotic hand",
        animationRequirement:
          "When the user clicks Open Hand, Close Hand, Pinch, or Point, animate the mechanical glove/robotic hand moving. Show signal path from EEG cap to decoder to glove."
      },
      {
        id: "wheelchair",
        label: "Wheelchair Navigation",
        outputDevice: "Powered wheelchair",
        animationRequirement:
          "When the user clicks Forward, Left, Right, or Stop, animate the wheelchair moving in a small map/room. Add safety warning if signal confidence is low."
      }
    ]
  },

  invasiveSimulation: {
    brainRegionMap: {
      localSrc: "/bci-assets/sources/brain_lobes.svg",
      fallbackRemoteSrc: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Lobes_of_the_brain_NL.svg",
      useInstruction:
        "Use as an anatomical map base. Make selectable overlays for motor cortex, somatosensory cortex, visual cortex, and speech/language area. Implant electrodes into the selected region, not a fixed default location."
    },
    implantedArraysReference: {
      localSrc: "/bci-assets/sources/frontiers_implanted_arrays_fig1.webp",
      fallbackRemoteSrc: "https://www.frontiersin.org/files/Articles/759711/xml-images/fbioe-09-759711-g001.webp",
      useInstruction:
        "Use only as a professional/reference panel or inspiration for realistic placement. For general audiences, do not show graphic surgical detail unless user enables professional mode."
    },
    implantationAnimationRequirements: [
      "Show a realistic brain model with visible cortex regions.",
      "When the user chooses motor cortex, implant into motor cortex; when visual cortex, implant into occipital/visual cortex; when somatosensory, implant into postcentral region; when speech area, implant into language region.",
      "Show simplified layers opening: scalp -> skull -> dura/meninges -> cortex. Keep it educational, not a surgical guide.",
      "Animate the electrode entering tissue only after the selected region is highlighted.",
      "Show reference wires/processor connection after implantation.",
      "Do not use the same implant location for all electrode types or brain regions."
    ]
  },

  tissueResponse: {
    encapsulationReference: {
      localSrc: "/bci-assets/sources/frontiers_encapsulation_fig3.webp",
      fallbackRemoteSrc: "https://www.frontiersin.org/files/Articles/759711/xml-images/fbioe-09-759711-g003.webp",
      useInstruction:
        "Use as realistic reference for tissue encapsulation around Utah electrode arrays. Build a zoom-in animation with realistic tissue texture and cell layers rather than floating cartoon particles."
    },
    damageReference: {
      localSrc: "/bci-assets/sources/frontiers_damage_encapsulation_fig5.webp",
      fallbackRemoteSrc: "https://www.frontiersin.org/files/Articles/759711/xml-images/fbioe-09-759711-g005.webp",
      useInstruction:
        "Use as reference for low/high damage or encapsulation states in professional mode."
    },
    visualizationRequirements: [
      "Replace abstract particles with tissue-like background: pink/gray neural tissue, capillaries, cell bodies, and extracellular matrix texture.",
      "Show electrode shank/tip physically embedded in tissue.",
      "Nearby cells should include neuron-like cells, microglia-like cells, and astrocyte-like star-shaped cells.",
      "Inflammation should be visualized as increased microglial clustering, astrocyte activation, red/orange ROS haze, and thicker encapsulation around electrode.",
      "Good materials/coatings should reduce cell clustering and keep signal traces clearer.",
      "Bad materials should thicken encapsulation and reduce neural signal strength."
    ]
  },

  attributionRequired: true
};

export default realisticBciAssets;
