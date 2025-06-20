import React from 'react';

function SettingsDrawer() {
  return (
    <div
      className="offcanvas offcanvas-end text-bg-dark"
      tabIndex={-1}
      id="settingsDrawer"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Settings</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="showTemp" />
          <label className="form-check-label" htmlFor="showTemp">Show Temperature</label>
        </div>
      </div>
    </div>
  );
}

export default SettingsDrawer;
