import React, { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 w-80 max-w-full h-full overflow-y-auto p-6 rounded-l-xl shadow-lg"
        onClick={stop}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="text-sm px-2 py-1 bg-gray-700 rounded"
          >
            Close
          </button>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-medium">Theme</label>
            <select className="bg-gray-800 w-full mt-1 p-1 rounded">
              <option>system</option>
              <option>light</option>
              <option>dark</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Animation</label>
            <select className="bg-gray-800 w-full mt-1 p-1 rounded">
              <option>smooth</option>
              <option>stepped</option>
              <option>linear</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="temp" className="" />
            <label htmlFor="temp" className="select-none">Temperature</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="throttle" className="" />
            <label htmlFor="throttle" className="select-none">Throttling</label>
          </div>
          <div>
            <label className="block font-medium">Max Temp</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                defaultValue={100}
                className="bg-gray-800 w-full p-1 rounded"
              />
              <span>°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
