import React from 'react';

const SettingsPanel: React.FC = () => {
  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="settingsDrawer">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Settings</h5>
        <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="showTemp" />
          <label className="form-check-label" htmlFor="showTemp">Show Temperature</label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
