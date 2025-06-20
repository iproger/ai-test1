# Agent Instructions

This project is a frontend-only interactive CPU simulator built with React, TypeScript, and Tailwind CSS. It runs entirely in the browser and targets modern desktop and tablet devices. The dashboard emulates Windows/macOS activity monitors with smooth animations and real-time updates.

## Project Goals
- Simulate real and custom CPUs including Apple, Intel, AMD, and Snapdragon models.
- Visualize logical threads grouped by core, cluster, and die.
- Support creation of custom CPUs with configurable clusters, caches, AVX support, and memory.
- Allow real-time task creation and execution with live FPS or ops/sec metrics.
- Reflect temperature and throttling behavior influenced by simulated load.
- Persist user settings, CPU selections, and task queues in `localStorage`.
- Maintain a responsive and touch-friendly UI for iPad Pro and MacBook Air.

## Agent Architecture
### CoreAgent
- Represents one logical thread.
- Tracks current load, temperature, and throttled state.
- Receives load input from tasks and reports state for visualization and thermal control.

### TaskAgent
- Represents a single executable task.
- Stores name, type, duration, intensity, load profile, and thread assignment.
- Updates progress and distributes load on each simulation tick.
- Emits real-time performance metrics and supports pause/resume/cancel actions.

### SchedulerAgent
- Distributes TaskAgents across CoreAgents.
- Supports manual and automatic assignment modes.
- Ensures balanced load unless user settings allow oversubscription.

### ThermalAgent
- Monitors and updates core temperatures.
- Applies cooling and heating rates per tick.
- Flags cores as throttled when temperature exceeds limits.

## Agent Communication
- **TaskAgent → CoreAgent**: sends load usage per tick.
- **CoreAgent → ThermalAgent**: reports temperature for evaluation.
- **ThermalAgent → CoreAgent**: updates throttling state.
- **SchedulerAgent ↔ TaskAgent/CoreAgent**: manages thread assignments.

## Simulation Loop
All agents run on a shared simulation tick (e.g. every 100 ms). Each cycle:
1. TaskAgents progress and apply load to assigned cores.
2. CoreAgents update internal state based on received load.
3. ThermalAgent adjusts temperatures and triggers throttling.
4. UI components read updated values and render animations.

## Extension
To introduce new behavior (e.g. CacheAgent or PowerAgent):
1. Define the agent state and `tick()` logic.
2. Connect it to other agents through explicit messaging or shared state hooks.
3. Keep each agent modular so logic remains isolated and deterministic.

Agents should avoid global mutable state. Use React context or explicit message passing so the simulator remains predictable and synchronized with the UI.

Development workflow:
- Install dependencies with `npm install`.
- Use `npm run dev` for development.
- Bump the `version` field in `package.json` for each new build so the header shows
  the correct release number.
- Run `npm run build` to generate production files in the project root and ensure
  asset links are updated.
