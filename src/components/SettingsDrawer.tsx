import React, { useState } from 'react';

function SettingsDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} className="fixed bottom-4 right-4 p-2 bg-gray-700 rounded">
        Settings
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end" onClick={() => setOpen(false)}>
          <div className="bg-gray-800 p-4 w-64" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg mb-2">Settings</h2>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsDrawer;
