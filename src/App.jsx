import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeAlert,
  BookOpen,
  Brain,
  CheckCircle2,
  CircuitBoard,
  Cpu,
  FlaskConical,
  Info,
  Microscope,
  MousePointer2,
  Radio,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  articleSource,
  brainRegions,
  conductiveMaterials,
  dataUsageWarning,
  electrodeTypes,
  functionalCoatings,
  globalBiocompatibilityNotes,
  measurementDefinitions,
  nonInvasiveUseCases,
  polymerAndScaffoldMaterials,
  tissueLegend,
} from "./data/bciMaterials";

const simulationDisclaimer =
  "Educational simulation scores are simplified estimates based on trends described in the review article. They are not exact values from the paper and are not clinical predictions.";

const simulationKeys = [
  "signalQuality",
  "biocompatibilityScore",
  "inflammationRisk",
  "glialScarRisk",
  "neuronSurvival",
];

const riskKeys = new Set(["inflammationRisk", "glialScarRisk"]);

const metricLabels = {
  signalQuality: "Signal quality",
  biocompatibilityScore: "Biocompatibility",
  inflammationRisk: "Inflammation risk",
  glialScarRisk: "Glial scar risk",
  neuronSurvival: "Neuron survival",
  longTermStability: "Long-term stability",
};

const pages = [
  { path: "/", label: "Explorer", icon: Sparkles },
  { path: "/non-invasive", label: "Non-invasive", icon: Radio },
  { path: "/invasive", label: "Invasive", icon: Brain },
  { path: "/invasive/materials", label: "Materials Lab", icon: FlaskConical },
  { path: "/about", label: "About", icon: BookOpen },
];

const invasiveBrainImages = {
  sectionMap: "/bci-assets/custom/brain-sections-before-implant.png",
  implantReference: "/bci-assets/custom/brain-implant-reference.png",
};

const landingHeroImages = {
  invasive: "/bci-assets/custom/landing-invasive-implant.png",
  nonInvasive: "/bci-assets/custom/landing-noninvasive-eeg-cap.png",
};

const brainRegionGeometry = {
  "motor-cortex": {
    x: "49%",
    y: "29%",
    hotspotX: "49%",
    hotspotY: "30%",
    hotspotW: "9%",
    hotspotH: "23%",
    processorX: "68%",
    processorY: "17%",
    rotation: "-14deg",
    layerX: "66%",
    layerY: "15%",
    label: "Motor cortex",
  },
  "somatosensory-cortex": {
    x: "43%",
    y: "34%",
    hotspotX: "42%",
    hotspotY: "36%",
    hotspotW: "11%",
    hotspotH: "26%",
    processorX: "61%",
    processorY: "18%",
    rotation: "-19deg",
    layerX: "59%",
    layerY: "17%",
    label: "Somatosensory cortex",
  },
  "speech-area": {
    x: "44%",
    y: "54%",
    hotspotX: "44%",
    hotspotY: "55%",
    hotspotW: "22%",
    hotspotH: "14%",
    processorX: "61%",
    processorY: "31%",
    rotation: "-33deg",
    layerX: "58%",
    layerY: "26%",
    label: "Speech / language area",
  },
  "visual-cortex": {
    x: "77%",
    y: "61%",
    hotspotX: "78%",
    hotspotY: "58%",
    hotspotW: "15%",
    hotspotH: "24%",
    processorX: "78%",
    processorY: "31%",
    rotation: "-55deg",
    layerX: "78%",
    layerY: "28%",
    label: "Visual cortex",
  },
};

const electrodeVisuals = {
  "utah-electrode-array": { kind: "utah", label: "Utah array pins" },
  "michigan-probe": { kind: "shank", label: "Thin silicon shank" },
  "microwire-electrode": { kind: "wire", label: "Flexible microwires" },
  "neuropixel-like-probe": { kind: "dense", label: "Dense probe sites" },
};

function App() {
  const path = usePath();
  const [mode, setMode] = useState("simple");
  const [selectedRegion, setSelectedRegion] = useState(brainRegions[0]);
  const [selectedElectrode, setSelectedElectrode] = useState(electrodeTypes[0]);
  const [selectedMaterials, setSelectedMaterials] = useState({
    conductive: null,
    polymer: null,
    coating: null,
  });

  const navigate = (targetPath) => {
    window.history.pushState({}, "", targetPath);
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const routeProps = {
    mode,
    setMode,
    navigate,
    selectedRegion,
    setSelectedRegion,
    selectedElectrode,
    setSelectedElectrode,
    selectedMaterials,
    setSelectedMaterials,
  };

  return (
    <div className="min-h-screen bg-space-950 text-slate-100">
      <Navbar path={path} navigate={navigate} mode={mode} setMode={setMode} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            {renderRoute(path, routeProps)}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function renderRoute(path, props) {
  if (path === "/non-invasive") return <NonInvasiveSimulation {...props} />;
  if (path === "/invasive") return <InvasiveSimulation {...props} />;
  if (path === "/invasive/materials") return <BiocompatibilityLab {...props} />;
  if (path === "/about") return <AboutPage {...props} />;
  return <LandingPage {...props} />;
}

function usePath() {
  const [path, setPath] = useState(window.location.pathname || "/");

  useEffect(() => {
    const update = () => setPath(window.location.pathname || "/");
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return path;
}

function Navbar({ path, navigate, mode, setMode }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-space-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex w-fit items-center gap-3 text-left"
          aria-label="Go to BCI Explorer landing page"
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-glow">
            <Brain size={22} />
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
              BCI Explorer
            </span>
            <span className="text-xs text-slate-400">Interactive neural interface lab</span>
          </span>
        </button>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Primary navigation">
          {pages.map((item) => {
            const Icon = item.icon;
            const active = path === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`nav-pill ${active ? "nav-pill-active" : ""}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <ModeToggle mode={mode} setMode={setMode} />
      </div>
    </header>
  );
}

function ModeToggle({ mode, setMode }) {
  return (
    <div className="mode-toggle" aria-label="Learning mode">
      <button
        type="button"
        onClick={() => setMode("simple")}
        className={mode === "simple" ? "mode-active" : ""}
      >
        Simple Mode
      </button>
      <button
        type="button"
        onClick={() => setMode("professional")}
        className={mode === "professional" ? "mode-active" : ""}
      >
        Professional Mode
      </button>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="border-t border-white/10 bg-space-950 px-4 py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>BCI Explorer is an educational simulation, not medical advice or a surgical guide.</p>
        <button
          type="button"
          onClick={() => navigate("/about")}
          className="inline-flex w-fit items-center gap-2 text-cyan-200 hover:text-cyan-100"
        >
          Sources and disclaimers <ArrowRight size={16} />
        </button>
      </div>
    </footer>
  );
}

function LandingPage({ navigate }) {
  const [activeType, setActiveType] = useState("invasive");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveType((current) => (current === "invasive" ? "non-invasive" : "invasive"));
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const activeCopy =
    activeType === "invasive"
      ? {
          eyebrow: "Implanted interface",
          title: "Microelectrodes read signals inside neural tissue.",
          body: "Explore why implanted BCIs can capture strong signals, and why material biocompatibility matters over time.",
        }
      : {
          eyebrow: "External interface",
          title: "EEG headsets detect patterns through the scalp.",
          body: "Try a safer non-invasive path where the signal is easier to access but weaker and noisier.",
        };

  return (
    <div className="overflow-hidden">
      <section className="hero-section">
        <HeroBCIAnimation type={activeType} />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl">
            <div className="eyebrow">
              <Activity size={16} />
              Interactive science simulation
            </div>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              BCI Explorer
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-300">
              Explore how brain-computer interfaces connect the brain to machines.
            </p>
            <BCITypeSwitcher activeType={activeType} setActiveType={setActiveType} />
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 max-w-2xl rounded-lg border border-white/10 bg-black/30 p-4 backdrop-blur"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                {activeCopy.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{activeCopy.title}</h2>
              <p className="mt-2 text-slate-300">{activeCopy.body}</p>
            </motion.div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => navigate("/invasive")} className="primary-action">
                <Brain size={20} />
                Start with Invasive BCI
              </button>
              <button
                type="button"
                onClick={() => navigate("/non-invasive")}
                className="secondary-action"
              >
                <Radio size={20} />
                Start with Non-Invasive BCI
              </button>
            </div>
          </div>

          <div className="hidden min-h-[560px] lg:block" aria-hidden="true" />
        </div>
      </section>

      <section className="border-y border-white/10 bg-space-900/70 px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <InfoStat icon={Radio} label="Non-invasive lesson" value="Safer access, noisier signals" />
          <InfoStat icon={Brain} label="Invasive lesson" value="Higher signal fidelity, tissue response risk" />
          <InfoStat icon={FlaskConical} label="Materials lab" value="Compare conductors, scaffolds, and coatings" />
        </div>
      </section>
    </div>
  );
}

function BCITypeSwitcher({ activeType, setActiveType }) {
  return (
    <div className="mt-8 inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
      {[
        { id: "invasive", label: "Invasive BCI", icon: Brain },
        { id: "non-invasive", label: "Non-invasive BCI", icon: Radio },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveType(item.id)}
            className={`switch-button ${activeType === item.id ? "switch-button-active" : ""}`}
          >
            <Icon size={17} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function HeroBCIAnimation({ type }) {
  const isInvasive = type === "invasive";
  const imageSrc = isInvasive ? landingHeroImages.invasive : landingHeroImages.nonInvasive;
  const imageAlt = isInvasive
    ? "Realistic invasive brain-computer interface implant with electrode array and ribbon cable"
    : "Realistic non-invasive EEG cap with electrodes and wires";

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-grid" />
      <AnimatePresence mode="wait">
        <motion.div
          key={type}
          className={`hero-image-scene hero-image-scene-${isInvasive ? "invasive" : "noninvasive"}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55 }}
        >
          <div className="landing-device-frame">
            <img className="landing-device-photo" src={imageSrc} alt={imageAlt} />
            <div className="landing-device-vignette" />
          </div>

          {isInvasive ? (
            <div className="landing-visual-labels">
              <span className="landing-label label-array">microelectrode array</span>
              <span className="landing-label label-ribbon">flexible signal cable</span>
              <span className="landing-label label-processor">implant electronics</span>
            </div>
          ) : (
            <div className="landing-visual-labels">
              <span className="landing-label label-electrodes">EEG electrodes</span>
              <span className="landing-label label-fabric">fabric cap</span>
              <span className="landing-label label-wires">signal wires</span>
            </div>
          )}

          <div className="hero-signal-line hero-signal-line-a" />
          <div className="hero-signal-line hero-signal-line-b" />
          <div className="hero-signal-line hero-signal-line-c" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function InfoStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-3 text-cyan-200">
        <Icon size={20} />
        <span className="text-sm font-semibold uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="mt-3 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function NonInvasiveSimulation({ mode }) {
  const [capPlaced, setCapPlaced] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState(nonInvasiveUseCases[0]);
  const [activeCommand, setActiveCommand] = useState("");

  useEffect(() => {
    setActiveCommand("");
  }, [selectedUseCase.id, capPlaced]);

  return (
    <PageShell
      eyebrow="Non-invasive BCI simulation"
      title="Place the EEG headset, then test a support scenario."
      intro="Non-invasive BCI is safer and easier to use, but signals are weaker and noisier because sensors are outside the skull."
      icon={Radio}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <DevicePlacement
          capPlaced={capPlaced}
          setCapPlaced={setCapPlaced}
          selectedUseCase={selectedUseCase}
          activeCommand={activeCommand}
        />
        <div className="space-y-6">
          <DisabilitySelector selectedUseCase={selectedUseCase} setSelectedUseCase={setSelectedUseCase} />
          <NonInvasiveResultPanel
            selectedUseCase={selectedUseCase}
            capPlaced={capPlaced}
            mode={mode}
            activeCommand={activeCommand}
            setActiveCommand={setActiveCommand}
          />
        </div>
      </div>
    </PageShell>
  );
}

function DevicePlacement({ capPlaced, setCapPlaced, selectedUseCase, activeCommand }) {
  return (
    <section className="panel min-h-[620px]">
      <div className="section-heading">
        <div>
          <p className="eyebrow-small">Step 1</p>
          <h2>EEG link and output device</h2>
        </div>
        <MousePointer2 className="text-cyan-200" size={24} />
      </div>

      <div className="device-stage">
        <div
          className={`floating-headset ${capPlaced ? "floating-headset-placed" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => setCapPlaced(true)}
          onKeyDown={(event) => event.key === "Enter" && setCapPlaced(true)}
          aria-label="Place EEG cap on the simulated person"
        >
          <span />
          <span />
          <span />
        </div>
        <div className="sim-person realistic-subject">
          <div className="subject-head">
            <div className="subject-ear subject-ear-left" />
            <div className="subject-ear subject-ear-right" />
            <div className="subject-hair" />
            <div className="subject-face">
              <span className="subject-eye subject-eye-left" />
              <span className="subject-eye subject-eye-right" />
              <span className="subject-nose" />
              <span className="subject-mouth" />
            </div>
            {capPlaced && (
              <>
                <div className="cap-mesh">
                  <span className="mesh-wire mesh-wire-a" />
                  <span className="mesh-wire mesh-wire-b" />
                  <span className="mesh-wire mesh-wire-c" />
                  <span className="mesh-wire mesh-wire-d" />
                  <span className="mesh-wire mesh-wire-e" />
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                  <span key={`cap-sensor-${index}`} className={`cap-sensor cap-sensor-${index + 1}`} />
                ))}
              </>
            )}
          </div>
          <div className="subject-neck" />
          <div className="subject-torso">
            {selectedUseCase.id === "paralysis" && (
              <div className={`wearable-exoskeleton ${commandClass(activeCommand)}`}>
                <span className="exo-shoulder exo-left" />
                <span className="exo-shoulder exo-right" />
                <span className="exo-arm exo-arm-left" />
                <span className="exo-arm exo-arm-right" />
                <span className="exo-hand exo-hand-left" />
                <span className="exo-hand exo-hand-right" />
              </div>
            )}
          </div>
        </div>

        {capPlaced && (
          <>
            <div className="brainwave wave-one" />
            <div className="brainwave wave-two" />
            <div className="brainwave wave-three" />
            <div className="signal-cable cable-to-device" />
          </>
        )}
        <AssistiveDevice
          useCase={selectedUseCase}
          capPlaced={capPlaced}
          activeCommand={activeCommand}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setCapPlaced(true)}
          className="primary-action"
          disabled={capPlaced}
        >
          <Radio size={19} />
          {capPlaced ? "EEG cap activated" : "Place EEG cap"}
        </button>
        <button type="button" onClick={() => setCapPlaced(false)} className="secondary-action">
          Reset placement
        </button>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Click the headset or use the button to place it. After placement, the EEG system routes decoded
        commands to the selected assistive device on the right side of the stage.
      </p>
    </section>
  );
}

function AssistiveDevice({ useCase, capPlaced, activeCommand }) {
  const status = capPlaced ? "linked" : "offline";
  const stateClass = `${status} ${commandClass(activeCommand)}`;

  return (
    <div className={`assistive-device assistive-${useCase.id} ${stateClass}`}>
      <p className="assistive-label">{assistiveDeviceLabel(useCase.id)}</p>
      {useCase.id === "paralysis" && <ExoskeletonHands activeCommand={activeCommand} />}
      {useCase.id === "speech-impairment" && <SpeakerDevice activeCommand={activeCommand} />}
      {useCase.id === "prosthetic-control" && <MechanicalGlove activeCommand={activeCommand} />}
      {useCase.id === "wheelchair-navigation" && <WheelchairDevice activeCommand={activeCommand} />}
    </div>
  );
}

function ExoskeletonHands({ activeCommand }) {
  return (
    <div className={`exo-device ${commandClass(activeCommand)}`}>
      <div className="exo-device-forearm left" />
      <div className="exo-device-forearm right" />
      <div className="exo-device-hand left">
        {Array.from({ length: 5 }).map((_, index) => <span key={`left-finger-${index}`} />)}
      </div>
      <div className="exo-device-hand right">
        {Array.from({ length: 5 }).map((_, index) => <span key={`right-finger-${index}`} />)}
      </div>
    </div>
  );
}

function SpeakerDevice({ activeCommand }) {
  const word = activeCommand ? activeCommand.replace("Focus: ", "") : "";
  return (
    <div className={`speaker-device ${activeCommand ? "speaking" : ""}`}>
      <div className="speaker-body">
        <span className="speaker-cone" />
        <span className="speaker-ring ring-one" />
        <span className="speaker-ring ring-two" />
      </div>
      <div className="speech-screen">{word || "..."}</div>
    </div>
  );
}

function MechanicalGlove({ activeCommand }) {
  return (
    <div className={`mechanical-glove ${commandClass(activeCommand)}`}>
      <div className="glove-palm" />
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={`glove-finger-${index}`} className={`glove-finger glove-finger-${index + 1}`} />
      ))}
      <div className="glove-cuff" />
    </div>
  );
}

function WheelchairDevice({ activeCommand }) {
  return (
    <div className={`wheelchair-device ${commandClass(activeCommand)}`}>
      <div className="wheelchair-path" />
      <div className="wheelchair-frame">
        <span className="chair-back" />
        <span className="chair-seat" />
        <span className="chair-wheel wheel-large" />
        <span className="chair-wheel wheel-small" />
      </div>
    </div>
  );
}

function assistiveDeviceLabel(id) {
  const labels = {
    paralysis: "BCI-linked hand exoskeleton",
    "speech-impairment": "BCI-linked speech speaker",
    "prosthetic-control": "BCI-linked mechanical glove",
    "wheelchair-navigation": "BCI-linked wheelchair",
  };
  return labels[id] || "BCI-linked device";
}

function commandClass(command) {
  return command ? command.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "idle";
}

function DisabilitySelector({ selectedUseCase, setSelectedUseCase }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow-small">Step 2</p>
          <h2>Choose a challenge</h2>
        </div>
        <ShieldCheck className="text-emerald-300" size={24} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {nonInvasiveUseCases.map((useCase) => (
          <button
            key={useCase.id}
            type="button"
            onClick={() => setSelectedUseCase(useCase)}
            className={`choice-card ${selectedUseCase.id === useCase.id ? "choice-card-active" : ""}`}
          >
            <span>{useCase.title}</span>
            <small>{useCase.device}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function NonInvasiveResultPanel({ selectedUseCase, capPlaced, mode, activeCommand, setActiveCommand }) {
  const [showEasy, setShowEasy] = useState(mode === "simple");

  useEffect(() => {
    setShowEasy(mode === "simple");
  }, [mode, selectedUseCase.id]);

  const commands = commandOptionsFor(selectedUseCase.id);
  const commandOutput = outputForCommand(selectedUseCase.id, activeCommand);

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow-small">Step 3</p>
          <h2>Signal result</h2>
        </div>
        <Activity className={capPlaced ? "text-cyan-200" : "text-slate-500"} size={24} />
      </div>

      {!capPlaced && (
        <div className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
          Place the EEG cap first to activate the signal simulation.
        </div>
      )}

      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
          {selectedUseCase.title}
        </p>
        <p className="mt-2 text-slate-300">{selectedUseCase.interaction}</p>
        <p className="mt-2 text-white">{selectedUseCase.outcome}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {Object.entries(selectedUseCase.metrics).map(([key, value]) => (
          <MetricPill key={key} label={formatFieldLabel(key)} value={value} />
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-space-900/70 p-4">
        <p className="text-sm font-semibold text-slate-200">Try a mental command</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {commands.map((command) => (
            <button
              key={command}
              type="button"
              onClick={() => setActiveCommand(command)}
              disabled={!capPlaced}
              className={`command-button ${activeCommand === command ? "command-button-active" : ""}`}
            >
              {command}
            </button>
          ))}
        </div>
        <div className="mt-4 min-h-[72px] rounded-lg border border-cyan-200/20 bg-cyan-950/20 p-4 text-cyan-100">
          {capPlaced
            ? commandOutput || "Choose a command to see how the external BCI output responds."
            : "No signal is available until the EEG cap is placed."}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowEasy((current) => !current)}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-cyan-200/30 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10"
      >
        <Info size={16} />
        Easy Explanation
      </button>
      {showEasy && <p className="mt-3 rounded-lg bg-white/[0.04] p-4 text-slate-200">{selectedUseCase.easyExplanation}</p>}
    </section>
  );
}

function commandOptionsFor(id) {
  const options = {
    paralysis: ["Imagine Left Hand", "Imagine Right Hand", "Rest"],
    "speech-impairment": ["Focus: I", "Focus: Need", "Focus: Help"],
    "prosthetic-control": ["Open Hand", "Close Hand", "Hold"],
    "wheelchair-navigation": ["Forward", "Left", "Right", "Stop"],
  };
  return options[id] || ["Start", "Stop"];
}

function outputForCommand(id, command) {
  if (!command) return "";
  const outputs = {
    paralysis: `${command} detected. The hand exoskeleton assists the corresponding arm while the controller filters noisy EEG input.`,
    "speech-impairment": `${command.replace("Focus: ", "")} selected. The speaker converts the chosen word into audible output.`,
    "prosthetic-control": `${command} command sent. The mechanical glove changes finger position after a short response delay.`,
    "wheelchair-navigation": `${command} command queued. The wheelchair model moves after the safety controller validates the command.`,
  };
  return outputs[id] || `${command} detected.`;
}

function MetricPill({ label, value }) {
  const score = qualitativeScore(value);
  return (
    <div className="metric-pill">
      <div className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-cyan-300" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function qualitativeScore(value) {
  const normalized = value.toLowerCase();
  if (normalized.includes("medium-low")) return 45;
  if (normalized.includes("medium-high")) return 70;
  if (normalized.includes("high")) return 86;
  if (normalized.includes("medium")) return 58;
  if (normalized.includes("low")) return 28;
  return 50;
}

function InvasiveSimulation({
  mode,
  navigate,
  selectedRegion,
  setSelectedRegion,
  selectedElectrode,
  setSelectedElectrode,
}) {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    setAnimationStarted(false);
  }, [selectedRegion.id, selectedElectrode.id]);

  return (
    <PageShell
      eyebrow="Invasive BCI simulation"
      title="Select a target region and electrode, then watch a simplified implant animation."
      intro="This is an educational simulation, not a surgical guide. The goal is to show why tissue response and material choice affect long-term BCI performance."
      icon={Brain}
    >
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <BrainRegionSelector selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} mode={mode} />
          <ElectrodeTypeSelector
            selectedElectrode={selectedElectrode}
            setSelectedElectrode={setSelectedElectrode}
            mode={mode}
          />
        </div>
        <ImplantAnimation
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedElectrode={selectedElectrode}
          animationStarted={animationStarted}
          setAnimationStarted={setAnimationStarted}
          navigate={navigate}
        />
      </div>
    </PageShell>
  );
}

function BrainRegionSelector({ selectedRegion, setSelectedRegion }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow-small">Step 1</p>
          <h2>Brain region</h2>
        </div>
        <Brain className="text-violet-200" size={24} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {brainRegions.map((region) => (
          <button
            key={region.id}
            type="button"
            onClick={() => setSelectedRegion(region)}
            className={`choice-card ${selectedRegion.id === region.id ? "choice-card-active" : ""}`}
          >
            <span>{region.name}</span>
            <small>{region.simpleUse}</small>
          </button>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-white/[0.04] p-4 text-sm text-slate-300">{selectedRegion.description}</p>
    </section>
  );
}

function ElectrodeTypeSelector({ selectedElectrode, setSelectedElectrode, mode }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow-small">Step 2</p>
          <h2>Electrode type</h2>
        </div>
        <CircuitBoard className="text-cyan-200" size={24} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {electrodeTypes.map((electrode) => (
          <button
            key={electrode.id}
            type="button"
            onClick={() => setSelectedElectrode(electrode)}
            className={`choice-card ${selectedElectrode.id === electrode.id ? "choice-card-active" : ""}`}
          >
            <span>{electrode.name}</span>
            <small>{mode === "professional" ? electrode.professionalDescription : electrode.simpleDescription}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function ImplantAnimation({
  selectedRegion,
  setSelectedRegion,
  selectedElectrode,
  animationStarted,
  setAnimationStarted,
  navigate,
}) {
  const regionGeometry = brainRegionGeometry[selectedRegion.id] || brainRegionGeometry["motor-cortex"];
  const electrodeVisual = electrodeVisuals[selectedElectrode.id] || electrodeVisuals["utah-electrode-array"];

  return (
    <section className="panel min-h-[720px]">
      <div className="section-heading">
        <div>
          <p className="eyebrow-small">Step 3</p>
          <h2>Layered implantation animation</h2>
        </div>
        <ScanLine className="text-cyan-200" size={24} />
      </div>

      <div
        className={`implant-stage photo-implant-stage ${animationStarted ? "implant-open" : ""}`}
        style={{
          "--target-x": regionGeometry.x,
          "--target-y": regionGeometry.y,
          "--processor-x": regionGeometry.processorX,
          "--processor-y": regionGeometry.processorY,
          "--implant-rotation": regionGeometry.rotation,
          "--layer-x": regionGeometry.layerX,
          "--layer-y": regionGeometry.layerY,
        }}
      >
        <img
          className="brain-section-photo"
          src={invasiveBrainImages.sectionMap}
          alt="Realistic side view of brain regions before implantation"
        />
        <img
          className="implant-reference-photo"
          src={invasiveBrainImages.implantReference}
          alt="Reference image of an implanted brain-computer interface"
        />
        <div className="photo-stage-vignette" />

        {brainRegions.map((region) => {
          const geometry = brainRegionGeometry[region.id];
          return (
            <button
              key={region.id}
              type="button"
              className={`brain-photo-hotspot ${selectedRegion.id === region.id ? "brain-photo-hotspot-active" : ""}`}
              style={{
                "--hotspot-x": geometry.hotspotX,
                "--hotspot-y": geometry.hotspotY,
                "--hotspot-w": geometry.hotspotW,
                "--hotspot-h": geometry.hotspotH,
              }}
              onClick={() => setSelectedRegion(region)}
              aria-label={`Select ${region.name}`}
            />
          );
        })}

        <div className="photo-region-target">
          <span>{regionGeometry.label}</span>
        </div>

        <div className="photo-layer-stack" aria-hidden="true">
          <span className="photo-layer scalp">scalp</span>
          <span className="photo-layer skull">skull</span>
          <span className="photo-layer dura">dura</span>
        </div>

        <div
          className={`photo-implant-device implant-${electrodeVisual.kind} ${
            animationStarted ? "implant-device-active" : "implant-device-preview"
          }`}
          aria-hidden="true"
        >
          <div className="photo-implant-processor">
            <span />
            <span />
          </div>
          <div className="photo-implant-ribbon">
            {Array.from({ length: 9 }).map((_, index) => <span key={`ribbon-${index}`} />)}
          </div>
          <div className="photo-electrode-array">
            {probeSitesFor(electrodeVisual.kind)}
          </div>
        </div>

        {animationStarted && (
          <>
            <div className="photo-signal-trace trace-one" />
            <div className="photo-signal-trace trace-two" />
            <div className="photo-reaction-label photo-reaction-damage">layer opening</div>
            <div className="photo-reaction-label photo-reaction-target">implant site</div>
          </>
        )}
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Selected setup</p>
        <p className="mt-2 text-white">
          {selectedElectrode.name} targeting the {selectedRegion.name}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Implanted BCIs can record stronger signals close to neurons, but the insertion path and chronic
          electrode-tissue interface can trigger immune and scar responses.
        </p>
        <p className="mt-2 text-sm text-cyan-100">
          The implant position is tied to the selected region. Choose a different brain section and the
          interface target moves to that section before implantation.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => setAnimationStarted(true)} className="primary-action">
          <Zap size={19} />
          Run animation
        </button>
        <button type="button" onClick={() => navigate("/invasive/materials")} className="secondary-action">
          Enter Biocompatibility Lab
          <ArrowRight size={18} />
        </button>
      </div>
      <p className="mt-4 text-sm text-amber-100">
        Educational animation only. It omits surgical planning, patient-specific anatomy, and clinical
        procedure details.
      </p>
    </section>
  );
}

function probeSitesFor(kind) {
  if (kind === "utah") {
    return Array.from({ length: 12 }).map((_, index) => <span key={`utah-site-${index}`} />);
  }
  if (kind === "wire") {
    return Array.from({ length: 4 }).map((_, index) => <span key={`wire-site-${index}`} />);
  }
  if (kind === "dense") {
    return Array.from({ length: 10 }).map((_, index) => <span key={`dense-site-${index}`} />);
  }
  return Array.from({ length: 4 }).map((_, index) => <span key={`shank-site-${index}`} />);
}

function BiocompatibilityLab({ mode, selectedMaterials, setSelectedMaterials }) {
  const updateMaterial = (key, material) => {
    setSelectedMaterials((current) => ({ ...current, [key]: material }));
  };

  return (
    <PageShell
      eyebrow="Biocompatibility lab"
      title="Build an implanted BCI material stack."
      intro="Choose a conductive material, a polymer or scaffold, and a functional coating. Each selection updates professional article data, simple teaching scores, graphs, and tissue response."
      icon={FlaskConical}
    >
      <div className="space-y-8">
        <LabModeNotice mode={mode} />
        <MaterialSection
          title="Conductive material"
          subtitle="Core electrode or conductive track"
          materials={conductiveMaterials}
          selected={selectedMaterials.conductive}
          onSelect={(material) => updateMaterial("conductive", material)}
          mode={mode}
        />
        <MaterialSection
          title="Polymer / scaffold material"
          subtitle="Protective, flexible, or structural material"
          materials={polymerAndScaffoldMaterials}
          selected={selectedMaterials.polymer}
          onSelect={(material) => updateMaterial("polymer", material)}
          mode={mode}
        />
        <MaterialSection
          title="Functional coating"
          subtitle="Bioactive, anti-inflammatory, antioxidant, or anti-fouling layer"
          materials={functionalCoatings}
          selected={selectedMaterials.coating}
          onSelect={(material) => updateMaterial("coating", material)}
          mode={mode}
        />
        <CombinedImplantResult selectedMaterials={selectedMaterials} mode={mode} />
      </div>
    </PageShell>
  );
}

function LabModeNotice({ mode }) {
  return (
    <div className="rounded-lg border border-cyan-200/20 bg-cyan-950/20 p-4">
      <div className="flex items-start gap-3">
        <Info className="mt-1 text-cyan-200" size={20} />
        <div>
          <p className="font-semibold text-white">
            {mode === "professional"
              ? "Professional Mode shows article-derived fields first."
              : "Simple Mode uses plain-language explanations and simulation scores."}
          </p>
          <p className="mt-1 text-sm text-slate-300">{dataUsageWarning.recommendedDisplay}</p>
        </div>
      </div>
    </div>
  );
}

function MaterialSection({ title, subtitle, materials, selected, onSelect, mode }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow-small">{subtitle}</p>
          <h2>{title}</h2>
        </div>
        <Microscope className="text-cyan-200" size={24} />
      </div>

      <div className="material-grid">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            active={selected?.id === material.id}
            onClick={() => onSelect(material)}
          />
        ))}
      </div>

      {selected ? (
        <MaterialResult material={selected} mode={mode} />
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-5 text-slate-300">
          Select a material to open its article data, interpretation, graph, and tissue visualization.
        </div>
      )}
    </section>
  );
}

function MaterialCard({ material, active, onClick }) {
  const score = material.educationalSimulation.biocompatibilityScore;
  return (
    <button type="button" onClick={onClick} className={`material-card ${active ? "material-card-active" : ""}`}>
      <span className="flex items-start justify-between gap-3">
        <span>
          <strong>{material.name}</strong>
          <small>{material.category}</small>
        </span>
        {active && <CheckCircle2 className="shrink-0 text-cyan-200" size={18} />}
      </span>
      <span className="mt-4 block">
        <span className="flex items-center justify-between text-xs text-slate-400">
          <span>Bio score</span>
          <span>{score}</span>
        </span>
        <span className="mt-2 block h-1.5 rounded-full bg-slate-800">
          <span className="block h-full rounded-full bg-cyan-300" style={{ width: `${score}%` }} />
        </span>
      </span>
    </button>
  );
}

function MaterialResult({ material, mode }) {
  const [showEasy, setShowEasy] = useState(mode === "simple");

  useEffect(() => {
    setShowEasy(mode === "simple");
  }, [mode, material.id]);

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <div className="rounded-lg border border-cyan-200/20 bg-cyan-950/20 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Selected Material</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">{material.name}</h3>
          <p className="mt-2 text-slate-300">{material.category}</p>
        </div>

        {mode === "professional" ? (
          <ProfessionalDataPanel material={material} />
        ) : (
          <SimpleExplanationPanel material={material} />
        )}

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <button
            type="button"
            onClick={() => setShowEasy((current) => !current)}
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/30 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/10"
          >
            <Info size={16} />
            Easy Explanation
          </button>
          {showEasy && <p className="mt-4 text-slate-200">{material.easyExplanation}</p>}
        </div>
      </div>

      <div className="space-y-6">
        <GraphPanel title={`${material.name} educational simulation`} simulation={material.educationalSimulation} />
        <BrainTissueVisualization material={material} simulation={material.educationalSimulation} />
      </div>
    </div>
  );
}

function ProfessionalDataPanel({ material }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex items-center gap-3">
        <Microscope className="text-cyan-200" size={22} />
        <div>
          <h3 className="text-xl font-semibold text-white">Article Data</h3>
          <p className="text-sm text-slate-400">Article-derived fields are shown before simulation scores.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <tbody>
            {Object.entries(material.articleData).map(([key, value]) => (
              <tr key={key}>
                <th>
                  <span className="inline-flex items-center gap-2">
                    {formatFieldLabel(key)}
                    <DefinitionTooltip fieldKey={key} />
                  </span>
                </th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 rounded-lg border border-violet-200/20 bg-violet-950/20 p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">
          Professional interpretation
        </p>
        <p className="mt-2 text-slate-200">{material.professionalExplanation}</p>
      </div>
      <TechnicalDefinitionStrip />
    </div>
  );
}

function DefinitionTooltip({ fieldKey }) {
  const definition = definitionForField(fieldKey);
  if (!definition) return null;
  return (
    <span
      className="inline-grid h-5 w-5 place-items-center rounded-full border border-cyan-200/30 text-cyan-200"
      title={`${definition.simpleMeaning} ${definition.professionalMeaning}`}
      aria-label={`${definition.label}: ${definition.simpleMeaning}`}
    >
      <Info size={12} />
    </span>
  );
}

function definitionForField(key) {
  const normalized = key.toLowerCase();
  if (normalized.includes("young")) return measurementDefinitions.youngsModulus;
  if (normalized.includes("thermal")) return measurementDefinitions.thermalConductance;
  if (normalized.includes("electrical")) return measurementDefinitions.electricalConductance;
  if (normalized.includes("impedance")) return measurementDefinitions.impedance;
  if (normalized.includes("iba")) return measurementDefinitions.iba1;
  if (normalized.includes("gfap")) return measurementDefinitions.gfap;
  if (normalized.includes("neurondensity")) return measurementDefinitions.neuronDensity;
  if (normalized.includes("nf100")) return measurementDefinitions.nf100;
  if (normalized.includes("bbb")) return measurementDefinitions.bbbLeakage;
  return null;
}

function TechnicalDefinitionStrip() {
  const terms = [
    measurementDefinitions.youngsModulus,
    measurementDefinitions.impedance,
    measurementDefinitions.iba1,
    measurementDefinitions.gfap,
    measurementDefinitions.neuronDensity,
    measurementDefinitions.nf100,
    measurementDefinitions.ros,
    measurementDefinitions.bbbLeakage,
  ];

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {terms.map((term) => (
        <div key={term.label} className="rounded-lg bg-black/20 p-3 text-sm">
          <p className="font-semibold text-cyan-100">{term.label}</p>
          <p className="mt-1 text-slate-400">{term.simpleMeaning}</p>
        </div>
      ))}
    </div>
  );
}

function SimpleExplanationPanel({ material }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex items-center gap-3">
        <Sparkles className="text-cyan-200" size={22} />
        <div>
          <h3 className="text-xl font-semibold text-white">Simple Mode result</h3>
          <p className="text-sm text-slate-400">Plain-language explanation with simplified scores.</p>
        </div>
      </div>
      <p className="text-slate-200">{material.easyExplanation}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {simulationKeys.map((key) => (
          <ScoreBar key={key} label={metricLabels[key]} value={material.educationalSimulation[key]} risk={riskKeys.has(key)} />
        ))}
      </div>
      <p className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100">
        {simulationDisclaimer}
      </p>
    </div>
  );
}

function ScoreBar({ label, value, risk = false }) {
  const fill = risk ? "bg-rose-300" : "bg-cyan-300";
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-300">{label}</span>
        <strong className={risk ? "text-rose-200" : "text-cyan-100"}>{value}</strong>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-800">
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${value}%` }} />
      </div>
      <p className="mt-2 text-xs text-slate-500">{risk ? "Lower is better" : "Higher is better"}</p>
    </div>
  );
}

function GraphPanel({ title, simulation }) {
  const data = simulationKeys.map((key) => ({
    key,
    name: metricLabels[key],
    value: simulation[key],
    type: riskKeys.has(key) ? "risk" : "benefit",
  }));

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-slate-400">Simplified teaching scores, 0 to 100.</p>
        </div>
        <Activity className="text-cyan-200" size={22} />
      </div>
      <div className="h-[300px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 6, right: 18, bottom: 6, left: 22 }}>
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: "#cbd5e1", fontSize: 12 }}
              width={132}
            />
            <Tooltip
              cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
              contentStyle={{
                background: "#07111f",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 8,
                color: "#e2e8f0",
              }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {data.map((entry) => (
                <Cell key={entry.key} fill={entry.type === "risk" ? "#fb7185" : "#22d3ee"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100">
        {simulationDisclaimer}
      </p>
    </div>
  );
}

function BrainTissueVisualization({ material, simulation }) {
  const health = Math.round(
    (simulation.biocompatibilityScore + simulation.neuronSurvival + simulation.signalQuality) / 3 -
      (simulation.inflammationRisk + simulation.glialScarRisk) / 6
  );
  const neuronCount = clamp(Math.round(simulation.neuronSurvival / 8), 4, 12);
  const immuneCount = clamp(Math.round((simulation.inflammationRisk + simulation.glialScarRisk) / 18), 3, 10);
  const rosCount = clamp(Math.round(simulation.inflammationRisk / 6), 3, 15);
  const scarWidth = clamp(Math.round(simulation.glialScarRisk / 11), 2, 8);
  const signalStrength = clamp(simulation.signalQuality / 100, 0.25, 1);
  const extracellularOpacity = clamp((simulation.inflammationRisk + simulation.glialScarRisk) / 180, 0.18, 0.85);

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Zoomed brain tissue response</h3>
          <p className="text-sm text-slate-400">{material?.name || "Combined implant"}: health index {health}</p>
        </div>
        <Waves className="text-cyan-200" size={22} />
      </div>
      <div
        className="tissue-stage realistic-tissue"
        style={{
          "--scar-width": `${scarWidth}px`,
          "--signal-opacity": signalStrength,
          "--matrix-opacity": extracellularOpacity,
        }}
      >
        <div className="tissue-depth depth-one" />
        <div className="tissue-depth depth-two" />
        <div className="scar-ring scar-matrix" />
        <div className="implant-core-mini neural-probe-cross-section">
          <span />
          <span />
          <span />
        </div>
        {Array.from({ length: neuronCount }).map((_, index) => (
          <span
            key={`neuron-${index}`}
            className="cell neuron-cell realistic-neuron"
            style={cellPosition(index, 13, 8)}
          >
            <i />
            <b />
          </span>
        ))}
        {Array.from({ length: immuneCount }).map((_, index) => (
          <span
            key={`micro-${index}`}
            className="cell microglia-cell realistic-microglia"
            style={cellPosition(index, 17, 18)}
          >
            <i />
            <b />
          </span>
        ))}
        {Array.from({ length: immuneCount }).map((_, index) => (
          <span
            key={`astro-${index}`}
            className="cell astrocyte-cell realistic-astrocyte"
            style={cellPosition(index, 19, 31)}
          >
            <i />
            <b />
          </span>
        ))}
        {Array.from({ length: rosCount }).map((_, index) => (
          <span key={`ros-${index}`} className="ros-particle" style={cellPosition(index, 23, 11)} />
        ))}
        <span className="blue-signal blue-signal-a" />
        <span className="blue-signal blue-signal-b" />
        <span className="blue-signal blue-signal-c" />
      </div>
      <div className="mt-4 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
        {Object.entries(tissueLegend).map(([key, value]) => (
          <div key={key} className="legend-row">
            <span className={`legend-dot legend-${key}`} />
            <span>{formatFieldLabel(key)}: {value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function cellPosition(index, multiplier, offset) {
  const left = 8 + ((index * multiplier + offset) % 84);
  const top = 9 + ((index * (multiplier + 11) + offset * 2) % 78);
  return { left: `${left}%`, top: `${top}%` };
}

function CombinedImplantResult({ selectedMaterials, mode }) {
  const { conductive, polymer, coating } = selectedMaterials;
  const ready = conductive && polymer && coating;

  const combined = useMemo(() => {
    if (!ready) return null;
    const values = {};
    simulationKeys.forEach((key) => {
      values[key] = weightedAverage(conductive, polymer, coating, key);
    });
    values.longTermStability = Math.round(
      values.signalQuality * 0.32 +
        values.biocompatibilityScore * 0.32 +
        values.neuronSurvival * 0.22 +
        (100 - values.inflammationRisk) * 0.07 +
        (100 - values.glialScarRisk) * 0.07
    );
    return values;
  }, [ready, conductive, polymer, coating]);

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow-small">Final profile</p>
          <h2>Combined implant result</h2>
        </div>
        <Cpu className="text-cyan-200" size={24} />
      </div>

      {!ready ? (
        <div className="grid gap-4 md:grid-cols-3">
          <ChecklistItem label="Conductive material" done={Boolean(conductive)} value={conductive?.name} />
          <ChecklistItem label="Polymer / scaffold" done={Boolean(polymer)} value={polymer?.name} />
          <ChecklistItem label="Functional coating" done={Boolean(coating)} value={coating?.name} />
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <ChecklistItem label="Conductive material" done value={conductive.name} />
              <ChecklistItem label="Polymer / scaffold" done value={polymer.name} />
              <ChecklistItem label="Functional coating" done value={coating.name} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "signalQuality",
                "biocompatibilityScore",
                "inflammationRisk",
                "glialScarRisk",
                "neuronSurvival",
                "longTermStability",
              ].map((key) => (
                <FinalMetricCard key={key} label={metricLabels[key]} value={combined[key]} risk={riskKeys.has(key)} />
              ))}
            </div>
            {mode === "professional" && (
              <div className="rounded-lg border border-violet-200/20 bg-violet-950/20 p-4 text-sm text-slate-200">
                <p className="font-semibold text-violet-100">Professional interpretation</p>
                <p className="mt-2">
                  The combined profile weights conductive material at 45%, polymer/scaffold at 25%, and
                  functional coating at 30%. Use it only as a teaching model because the review article
                  summarizes different studies rather than a single matched comparison.
                </p>
              </div>
            )}
            <p className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-sm text-amber-100">
              {simulationDisclaimer}
            </p>
          </div>
          <div className="space-y-6">
            <FinalRadar values={combined} />
            <BrainTissueVisualization material={{ name: "Combined material stack" }} simulation={combined} />
          </div>
        </div>
      )}
    </section>
  );
}

function ChecklistItem({ label, done, value }) {
  return (
    <div className={`rounded-lg border p-4 ${done ? "border-cyan-200/25 bg-cyan-950/20" : "border-white/10 bg-white/[0.03]"}`}>
      <div className="flex items-center gap-2">
        <CheckCircle2 className={done ? "text-cyan-200" : "text-slate-600"} size={18} />
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold text-white">{value || "Not selected"}</p>
    </div>
  );
}

function FinalMetricCard({ label, value, risk }) {
  const interpretation = risk ? riskLabel(value) : benefitLabel(value);
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-slate-300">{label}</span>
        <strong className={risk ? "text-rose-200" : "text-cyan-100"}>{value}</strong>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${risk ? "bg-rose-300" : "bg-cyan-300"}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-400">{interpretation}</p>
    </div>
  );
}

function FinalRadar({ values }) {
  const data = [
    { metric: "Signal", value: values.signalQuality },
    { metric: "Bio", value: values.biocompatibilityScore },
    { metric: "Low inflammation", value: 100 - values.inflammationRisk },
    { metric: "Low scar", value: 100 - values.glialScarRisk },
    { metric: "Neurons", value: values.neuronSurvival },
    { metric: "Stability", value: values.longTermStability },
  ];

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-xl font-semibold text-white">Combined profile graph</h3>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(148, 163, 184, 0.22)" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
            <Radar dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.32} />
            <Tooltip
              contentStyle={{
                background: "#07111f",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 8,
                color: "#e2e8f0",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function weightedAverage(a, b, c, key) {
  return Math.round(
    a.educationalSimulation[key] * 0.45 +
      b.educationalSimulation[key] * 0.25 +
      c.educationalSimulation[key] * 0.3
  );
}

function AboutPage() {
  const definitionRows = Object.values(measurementDefinitions);

  return (
    <PageShell
      eyebrow="Sources, article context, and disclaimers"
      title="How BCI Explorer uses the review article."
      intro="The invasive material lab separates article-derived data from simplified educational simulation scores so students can learn without mistaking the model for clinical prediction."
      icon={BookOpen}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow-small">Primary article</p>
              <h2>{articleSource.title}</h2>
            </div>
            <BookOpen className="text-cyan-200" size={24} />
          </div>
          <div className="space-y-3 text-slate-300">
            <p>
              <strong className="text-white">Authors:</strong> {articleSource.authors}
            </p>
            <p>
              <strong className="text-white">Journal:</strong> {articleSource.journal}, volume{" "}
              {articleSource.volume}, pages {articleSource.pages}, {articleSource.year}
            </p>
            <p>
              <strong className="text-white">Website use:</strong> {articleSource.sourceUse}
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-amber-300/20 bg-amber-300/10 p-4 text-amber-100">
            <div className="flex items-start gap-3">
              <BadgeAlert className="mt-1 shrink-0" size={20} />
              <p>{simulationDisclaimer}</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Why the website uses two modes
            </p>
            <p className="mt-3 text-slate-300">
              The review article summarizes many material studies with different device geometries, animal
              models, measurement methods, and time periods. Professional Mode shows fields such as Young's
              modulus, impedance, Iba-1, GFAP, neuron density, NF-100, BBB leakage, and ROS-related notes.
              Simple Mode turns the same trends into a teaching model with clearly labeled estimates.
            </p>
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow-small">Reference definitions</p>
              <h2>Technical terms</h2>
            </div>
            <Info className="text-cyan-200" size={24} />
          </div>
          <div className="space-y-3">
            {definitionRows.map((definition) => (
              <div key={definition.label} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <h3 className="font-semibold text-white">{definition.label}</h3>
                <p className="mt-1 text-sm text-slate-300">{definition.simpleMeaning}</p>
                <p className="mt-2 text-sm text-slate-400">{definition.professionalMeaning}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel mt-6">
        <div className="section-heading">
          <div>
            <p className="eyebrow-small">Biocompatibility logic</p>
            <h2>What the simulation teaches</h2>
          </div>
          <ShieldCheck className="text-emerald-300" size={24} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(globalBiocompatibilityNotes).map(([key, value]) => (
            <div key={key} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <h3 className="font-semibold text-cyan-100">{formatFieldLabel(key)}</h3>
              <p className="mt-2 text-sm text-slate-300">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, intro, icon: Icon, children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="mb-8 max-w-4xl">
        <div className="eyebrow">
          <Icon size={16} />
          {eyebrow}
        </div>
        <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{intro}</p>
      </div>
      {children}
    </div>
  );
}

function benefitLabel(value) {
  if (value >= 84) return "Very strong";
  if (value >= 70) return "Strong";
  if (value >= 55) return "Moderate";
  return "Limited";
}

function riskLabel(value) {
  if (value <= 30) return "Low risk";
  if (value <= 48) return "Moderate risk";
  if (value <= 70) return "High risk";
  return "Very high risk";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatFieldLabel(input) {
  const manual = {
    youngsModulusGPa: "Young's modulus",
    thermalConductance_W_mK: "Thermal conductance",
    electricalConductance_S_m: "Electrical conductance",
    materialUsed: "Material used",
    neuronAdhesion: "Neuron adhesion",
    foreignBodyResponse: "Foreign body response",
    studyLength: "Study length",
    iba1: "Iba-1",
    gfap: "GFAP",
    neuronDensity: "Neuron density",
    nf100: "NF-100",
    signalStrength: "Signal strength",
    noiseLevel: "Noise level",
    trainingNeeded: "Training needed",
    responseDelay: "Response delay",
    healthyNeurons: "Healthy neurons",
    rosInflammation: "ROS / inflammation",
    glialScar: "Glial scar",
    brainTissueYoungsModulus: "Brain tissue Young's modulus",
    stiffnessWarning: "Stiffness mismatch",
    rosWarning: "ROS warning",
    impedanceWarning: "Impedance warning",
    immuneMarkers: "Immune markers",
  };
  if (manual[input]) return manual[input];
  return input
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

export default App;
