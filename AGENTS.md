Agent Instructions

This project is a frontend-only interactive CPU simulator built with React, TypeScript, and Tailwind CSS. It simulates realistic CPU behavior over time, including thread-level load execution, hybrid core grouping, task scheduling, temperature behavior, and real-time performance output. The simulator is designed to run entirely in the browser, including on iPad Pro, and presents a Windows/macOS-style dashboard UI for managing CPUs, tasks, and system states.

## Project Goals
- Simulate the behavior of real and custom CPUs, including Apple, Intel, AMD, and Snapdragon models.
- Visualize logical threads, grouped by core, cluster, and die.
- Support custom CPUs with multiple clusters, thread ratios, cache, AVX support, and memory.
- Allow real-time task creation and execution across threads with simulated FPS or ops/sec metrics.
- Reflect system-level behaviors like thermal throttling and temperature rise.
- Provide persistent settings and CPU configurations via localStorage.
- Deliver a smooth, responsive, interactive UI for modern browsers and tablets.

## Agent Architecture

All runtime behavior is controlled by modular agents. Each agent simulates a unit of work or system state and operates on each tick of the simulation loop.

### CoreAgent
- Represents one logical thread.
- Maintains:
  - load: percentage from task
  - temperature: in °C, rising with load
  - isThrottled: boolean flag
- Accepts load input from TaskAgent.
- Sends current state to UI visualizer and ThermalAgent.

### TaskAgent
- Represents a single executable task.
- Attributes:
  - name, type, duration, intensity, loadProfile, targetCores
- On each tick:
  - Updates internal progress
  - Distributes load to assigned CoreAgents
  - Emits real-time performance metric (e.g. FPS, ops/sec)
  - Can be paused, resumed, canceled via UI
  - Can be reassigned between cores

### SchedulerAgent
- Assigns and distributes tasks across available threads.
- Can operate in:
  - Manual mode: user assigns threads
  - Auto mode: load-balanced
- Ensures threads aren’t overloaded unless settings allow it
- Handles dynamic reassignment requests from UI

### ThermalAgent
- Tracks temperature of each core.
- Increases temperature based on core load
- Cools down cores when idle
- Triggers throttling when temperature exceeds max limit (if enabled)
- Notifies CoreAgent to reduce simulated frequency

## Agent Communication
- TaskAgent → emits load to → CoreAgent
- CoreAgent → sends temperature → ThermalAgent
- ThermalAgent → updates isThrottled on CoreAgent
- SchedulerAgent ↔ coordinates TaskAgent and CoreAgent assignment

## Simulation Loop
- All agents execute on a shared simulation loop (e.g. every 100ms).
- Each tick:
  - Tasks update time and load
  - Cores receive load and adjust state
  - Thermal updates are applied
  - UI is updated with new values

## Extension
To add new agents (e.g. CacheAgent, PowerAgent, MemoryAgent), implement:
- state: internal per-tick data
- tick(): main update logic per simulation step
- dispatch() or emit(): interface with other agents
- Maintain agent modularity and isolate logic per unit

Agents should not use global state. All communication should be routed through shared state management or message passing. Keep agent updates deterministic and UI-synchronized for consistent simulation accuracy.
