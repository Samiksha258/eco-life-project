// ── Background images ──
import airPollutionBg        from "../assets/backgrounds/air-pollution.png";
import cleanRiverBg          from "../assets/backgrounds/clean-river.png";
import cuttingTreesBg        from "../assets/backgrounds/cutting-trees.png";
import dirtyRiverBg          from "../assets/backgrounds/dirty-river.png";
import electricitySavingBg   from "../assets/backgrounds/electricity-saving.png";
import electricityShortageBg from "../assets/backgrounds/electricity-shortage.png";
import plantingPlantBg       from "../assets/backgrounds/planting-plant.png";
import positiveImageBg       from "../assets/backgrounds/positive-image.png";
import saveWaterBg           from "../assets/backgrounds/save-water.png";
import waterShortageBg       from "../assets/backgrounds/water-shortage.png";

// ── Character images (filenames match exactly what's in your characters folder) ──
import angryChar    from "../assets/characters/angry.png";
import goodJobChar  from "../assets/characters/good-job.png";
import happyChar    from "../assets/characters/happy.png";
import shockChar    from "../assets/characters/shock.png";
import thinkChar    from "../assets/characters/think.png";
import tooHappyChar from "../assets/characters/too-happy.png";

export const SCENE_IMAGES = {
  water_save: {
    bg: saveWaterBg,
    bgGradient: "linear-gradient(135deg,#0ea5e9 0%,#38bdf8 40%,#7dd3fc 70%,#e0f2fe 100%)",
    bgLabel: "Save Water",     bgEmoji: "💧",
    char: happyChar,           charEmoji: "😊", charMood: "happy",
    tip: "Great job conserving water! Every drop counts 💧",
    accent: "#0ea5e9",
  },
  water_crisis: {
    bg: waterShortageBg,
    bgGradient: "linear-gradient(135deg,#b45309 0%,#d97706 50%,#fbbf24 100%)",
    bgLabel: "Water Shortage", bgEmoji: "🏜️",
    char: shockChar,           charEmoji: "😨", charMood: "shock",
    tip: "Water shortage is real. Log your water-saving activities!",
    accent: "#d97706",
  },
  river_clean: {
    bg: cleanRiverBg,
    bgGradient: "linear-gradient(135deg,#06b6d4 0%,#22d3ee 50%,#a5f3fc 100%)",
    bgLabel: "Clean River",    bgEmoji: "🏞️",
    char: tooHappyChar,        charEmoji: "🤩", charMood: "too_happy",
    tip: "Rivers are the lifelines of ecosystems. Keep them clean!",
    accent: "#06b6d4",
  },
  river_dirty: {
    bg: dirtyRiverBg,
    bgGradient: "linear-gradient(135deg,#78350f 0%,#92400e 50%,#b45309 100%)",
    bgLabel: "Dirty River",    bgEmoji: "🌊",
    char: angryChar,           charEmoji: "😠", charMood: "angry",
    tip: "Pollution is destroying our rivers. Take action today!",
    accent: "#92400e",
  },
  tree_plant: {
    bg: plantingPlantBg,
    bgGradient: "linear-gradient(135deg,#15803d 0%,#4ade80 50%,#bbf7d0 100%)",
    bgLabel: "Planting Trees", bgEmoji: "🌳",
    char: goodJobChar,         charEmoji: "👍", charMood: "good_job",
    tip: "Each tree you plant absorbs ~22 kg of CO₂ per year!",
    accent: "#16a34a",
  },
  tree_cut: {
    bg: cuttingTreesBg,
    bgGradient: "linear-gradient(135deg,#7f1d1d 0%,#dc2626 50%,#fca5a5 100%)",
    bgLabel: "Deforestation",  bgEmoji: "🪓",
    char: angryChar,           charEmoji: "😤", charMood: "angry",
    tip: "Forests are being lost at an alarming rate. Plant more trees!",
    accent: "#dc2626",
  },
  energy_save: {
    bg: electricitySavingBg,
    bgGradient: "linear-gradient(135deg,#f59e0b 0%,#fbbf24 50%,#fde68a 100%)",
    bgLabel: "Energy Saving",  bgEmoji: "⚡",
    char: happyChar,           charEmoji: "😄", charMood: "happy",
    tip: "Switching off unused lights saves up to 10% of electricity!",
    accent: "#f59e0b",
  },
  energy_crisis: {
    bg: electricityShortageBg,
    bgGradient: "linear-gradient(135deg,#1e1b4b 0%,#3730a3 50%,#6366f1 100%)",
    bgLabel: "Energy Crisis",  bgEmoji: "🔌",
    char: shockChar,           charEmoji: "😱", charMood: "shock",
    tip: "Energy shortage affects millions. Every unit saved matters!",
    accent: "#6366f1",
  },
  air_pollution: {
    bg: airPollutionBg,
    bgGradient: "linear-gradient(135deg,#374151 0%,#6b7280 50%,#9ca3af 100%)",
    bgLabel: "Air Pollution",  bgEmoji: "🏭",
    char: angryChar,           charEmoji: "😷", charMood: "angry",
    tip: "Air quality is dangerous. Reduce vehicle use today!",
    accent: "#6b7280",
  },
  positive: {
    bg: positiveImageBg,
    bgGradient: "linear-gradient(135deg,#064e3b 0%,#059669 40%,#34d399 70%,#a7f3d0 100%)",
    bgLabel: "Eco Positive",   bgEmoji: "🌍",
    char: tooHappyChar,        charEmoji: "🤗", charMood: "too_happy",
    tip: "You're making our planet healthier! Keep going!",
    accent: "#059669",
  },
  thinking: {
    bg: positiveImageBg,
    bgGradient: "linear-gradient(135deg,#7c3aed 0%,#a78bfa 50%,#ddd6fe 100%)",
    bgLabel: "Analyzing...",   bgEmoji: "🤔",
    char: thinkChar,           charEmoji: "🤔", charMood: "think",
    tip: "Processing your eco activity...",
    accent: "#7c3aed",
  },
};

export const DEFAULT_SCENE = "positive";