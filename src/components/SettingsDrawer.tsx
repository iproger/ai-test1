import React from 'react';
import { useAppState } from '../state/AppContext';

function SettingsDrawer() {
  const { settings, setSettings } = useAppState();
  return (
    <div
      className="offcanvas offcanvas-end text-bg-dark"
      tabIndex={-1}
      id="settingsDrawer"
      data-bs-backdrop="true"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Settings</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="mb-3">
          <label className="form-label">Update Frequency</label>
          <select
            className="form-select"
            value={settings.updateInterval}
            onChange={e => setSettings({ ...settings, updateInterval: Number(e.target.value) })}
          >
            <option value={16}>Real-Time</option>
            <option value={250}>250 ms</option>
            <option value={1000}>1 s</option>
            <option value={2000}>2 s</option>
          </select>
        </div>
        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="showTemp"
            checked={settings.showTemp}
            onChange={e => setSettings({ ...settings, showTemp: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="showTemp">Show Temperature</label>
        </div>
        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="showNumbers"
            checked={settings.showNumbers}
            onChange={e => setSettings({ ...settings, showNumbers: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="showNumbers">Show Core Numbers</label>
        </div>
        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="throttle"
            checked={settings.throttling}
            onChange={e => setSettings({ ...settings, throttling: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="throttle">Throttling</label>
        </div>
      </div>
    </div>
  );
}

export default SettingsDrawer;
