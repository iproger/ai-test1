export const taskCategories = [
  {
    id: "game",
    name: "Games",
    presets: [
      { id: "gta5", name: "GTA V", defaultCores: 6, baseFps: 60 },
      { id: "cyberpunk", name: "Cyberpunk 2077", defaultCores: 8, baseFps: 45 },
      { id: "minecraft", name: "Minecraft", defaultCores: 2, baseFps: 90 },
    ],
  },
  {
    id: "ai",
    name: "AI Training",
    presets: [
      { id: "resnet", name: "ResNet Training", defaultCores: 12, baseOps: 200 },
      { id: "gpt2", name: "GPT-2 Finetune", defaultCores: 16, baseOps: 300 },
    ],
  },
  {
    id: "render",
    name: "Rendering",
    presets: [
      { id: "blender", name: "Blender Scene", defaultCores: 16, baseMs: 400 },
      { id: "premiere", name: "Adobe Premiere Export", defaultCores: 8, baseMs: 600 },
    ],
  },
];

export type TaskCategory = typeof taskCategories[number];
export type TaskPreset = TaskCategory["presets"][number];

export function getPresetMetric(preset: TaskPreset): {
  metricName: string;
  baseValue: number;
} {
  if ("baseFps" in preset) return { metricName: "FPS", baseValue: (preset as any).baseFps };
  if ("baseOps" in preset) return { metricName: "ops/s", baseValue: (preset as any).baseOps };
  if ("baseMs" in preset) return { metricName: "ms", baseValue: (preset as any).baseMs };
  return { metricName: "", baseValue: 0 };
}
