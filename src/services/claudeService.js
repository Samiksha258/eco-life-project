// ============================================================
// claudeService.js
// Calls Anthropic API to analyze user eco activity text
// Returns: { scene, points, feedback, category }
// ============================================================

const SYSTEM_PROMPT = `You are an eco-activity analyzer for the EcoLife app.
When a user describes their daily eco-friendly (or eco-negative) activity, analyze it and respond ONLY with a JSON object.

Choose ONE scene key from this list based on the activity:
- "water_save"    → saving water, fixing leaks, shorter showers, rainwater harvesting
- "water_crisis"  → wasting water, drought, water shortage discussion
- "river_clean"   → cleaning rivers/lakes, swimming in clean water, river walks
- "river_dirty"   → river pollution, dumping waste near water, dirty water
- "tree_plant"    → planting trees/saplings, gardening, growing plants, seeds
- "tree_cut"      → deforestation, cutting trees, saw/axe activity
- "energy_save"   → saving electricity, solar panels, switching off lights, unplugging
- "energy_crisis" → power outage, wasting electricity, leaving things on
- "air_pollution" → vehicle use, factory smoke, burning, poor air quality
- "positive"      → recycling, composting, cycling, walking, vegan eating, general eco good

Respond with EXACTLY this JSON (no markdown, no extra text):
{
  "scene": "<one of the scene keys above>",
  "points": <integer between 50 and 250>,
  "category": "<short category label like 'Water Conservation'>",
  "feedback": "<one encouraging sentence, max 12 words>",
  "isPositive": <true or false>
}`;

export async function analyzeActivity(activityText) {
  const textLower = activityText.toLowerCase();
  
  // Keyword-based fallback logic if API fails
  let scene = "positive";
  let points = 80;
  let category = "Eco Activity";
  let feedback = "Every green action counts!";
  let isPositive = true;

  if (textLower.includes("waste") && textLower.includes("water") || textLower.includes("water shortage")) {
    scene = "water_crisis"; points = -50; category = "Water Waste"; feedback = "Try to conserve water!"; isPositive = false;
  } else if (textLower.includes("saving water") || textLower.includes("save water") || textLower.includes("leak") || textLower.includes("shower")) {
    scene = "water_save"; points = 120; category = "Water Conservation"; feedback = "Great job saving water!"; isPositive = true;
  } else if (textLower.includes("clean") && textLower.includes("river") || textLower.includes("lake")) {
    scene = "river_clean"; points = 150; category = "Nature Clean"; feedback = "Rivers need our help. Well done!"; isPositive = true;
  } else if (textLower.includes("dirty") || textLower.includes("pollution") || textLower.includes("dumping waste") || textLower.includes("trash")) {
    scene = "river_dirty"; points = -100; category = "Pollution"; feedback = "Pollution destroys ecosystems. Be mindful!"; isPositive = false;
  } else if (textLower.includes("plant") || textLower.includes("tree")) {
    scene = "tree_plant"; points = 200; category = "Tree Planting"; feedback = "Trees are the lungs of the Earth!"; isPositive = true;
  } else if (textLower.includes("cut tree") || textLower.includes("deforestation") || textLower.includes("cutting")) {
    scene = "tree_cut"; points = -150; category = "Deforestation"; feedback = "We need more trees, not fewer."; isPositive = false;
  } else if (textLower.includes("saving electricity") || textLower.includes("switched off") || textLower.includes("solar") || textLower.includes("unplug")) {
    scene = "energy_save"; points = 100; category = "Energy Saving"; feedback = "Good energy habits!"; isPositive = true;
  } else if (textLower.includes("wasting electricity") || textLower.includes("left lights on") || textLower.includes("power outage") || textLower.includes("left the light on")) {
    scene = "energy_crisis"; points = -50; category = "Energy Waste"; feedback = "Turn off unused appliances."; isPositive = false;
  } else if (textLower.includes("vehicle") || textLower.includes("car") || textLower.includes("smoke") || textLower.includes("burning") || textLower.includes("driving")) {
    scene = "air_pollution"; points = -80; category = "Air Pollution"; feedback = "Try using public transport or walking."; isPositive = false;
  } else if (textLower.includes("recycle") || textLower.includes("cycle") || textLower.includes("walk") || textLower.includes("compost")) {
    scene = "positive"; points = 100; category = "Eco Action"; feedback = "Awesome eco-friendly action!"; isPositive = true;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: activityText }],
      }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    const text = data.content?.find(b => b.type === "text")?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return {
      scene: parsed.scene || scene,
      points: parsed.points || points,
      category: parsed.category || category,
      feedback: parsed.feedback || feedback,
      isPositive: parsed.isPositive !== false,
    };
  } catch (err) {
    console.error("Claude API error. Using fallback matching logic.");
    return { scene, points, category, feedback, isPositive };
  }
}