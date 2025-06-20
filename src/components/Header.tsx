import React from 'react';
import { useAppState, modelList } from '../state/AppContext';

function Header() {
  const { model, setModel } = useAppState();
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 sticky top-0 z-10">
      <select
        className="bg-gray-700 p-2 rounded"
        value={model.name}
        onChange={(e) => {
          const selected = modelList.find(m => m.name === e.target.value);
          if (selected) setModel(selected);
        }}
      >
        {modelList.map((m) => (
          <option key={m.name} value={m.name}>{m.name}</option>
        ))}
      </select>
      <button className="p-2">⚙️</button>
    </header>
  );
}

export default Header;
