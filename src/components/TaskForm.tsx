import React, { useState, useEffect } from 'react';
import { useAppState, TaskPriority } from '../state/AppContext';
import { taskCategories, TaskCategory, TaskPreset } from '../config/taskTypes';

function TaskForm() {
  const { addTask } = useAppState();
  const [duration, setDuration] = useState(60);
  const [category, setCategory] = useState<TaskCategory>(taskCategories[0]);
  const [preset, setPreset] = useState<TaskPreset>(taskCategories[0].presets[0]);
  const [cores, setCores] = useState<number>(taskCategories[0].presets[0].defaultCores);
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [adding, setAdding] = useState(false);

  // update presets when category changes
  useEffect(() => {
    setPreset(category.presets[0]);
    setCores(category.presets[0].defaultCores);
  }, [category]);

  useEffect(() => {
    setCores(preset.defaultCores);
  }, [preset]);

  const summary = `${preset.name} task, ${cores} cores, ${priority.toLowerCase()} priority, ${duration}s`;

  return (
    <form
      className="card p-3 text-body bg-body-secondary"
      onSubmit={(e) => {
        e.preventDefault();
        setAdding(true);
        addTask({
          duration,
          category: category.id,
          presetId: preset.id,
          cores,
          priority,
        });
        setTimeout(() => setAdding(false), 300);
      }}
    >
      <div className="mb-2">
        <label className="form-label">Duration (s)</label>
        <input
          type="range"
          className="form-range"
          min={5}
          max={120}
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
        <div className="form-text">{duration}s</div>
      </div>
      <div className="mb-2">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={category.id}
          onChange={(e) => {
            const cat = taskCategories.find(c => c.id === e.target.value) as TaskCategory;
            if (cat) setCategory(cat);
          }}
        >
          {taskCategories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label">Preset</label>
        <select
          className="form-select"
          value={preset.id}
          onChange={(e) => {
            const p = category.presets.find(pr => pr.id === e.target.value) as TaskPreset;
            if (p) setPreset(p);
          }}
        >
          {category.presets.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label">Cores</label>
        <input
          type="number"
          className="form-control"
          min={1}
          max={8}
          value={cores}
          onChange={(e) => setCores(parseInt(e.target.value))}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Priority</label>
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <p className="small text-secondary">{summary}</p>
      <button type="submit" className="btn btn-primary w-100">
        {adding ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
