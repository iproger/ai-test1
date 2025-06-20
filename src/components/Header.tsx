import React from 'react';
import { useAppState, modelList } from '../state/AppContext';

function Header() {
  const { model, setModel } = useAppState();
  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid justify-content-between">
        <select
          className="form-select w-auto"
          value={model.name}
          onChange={(e) => {
            const selected = modelList.find((m) => m.name === e.target.value);
            if (selected) setModel(selected);
          }}
        >
          {modelList.map((m) => (
            <option key={m.name} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
        <button className="btn btn-link text-light" data-bs-toggle="offcanvas" data-bs-target="#settingsDrawer" aria-label="Settings">
          <i className="bi bi-gear-fill" />
        </button>
      </div>
    </nav>
  );
}

export default Header;
