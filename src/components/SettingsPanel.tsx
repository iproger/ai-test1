import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="bg-gray-900 w-64 p-4 space-y-2">
        <h2 className="text-lg font-bold">Settings</h2>
        <button onClick={onClose} className="text-right text-sm">Close</button>
        <div className="space-y-1">
          <label className="block text-sm">Theme
            <select className="bg-gray-800 w-full mt-1">
              <option>system</option>
              <option>light</option>
              <option>dark</option>
            </select>
          </label>
          <label className="block text-sm">Animation
            <select className="bg-gray-800 w-full mt-1">
              <option>smooth</option>
              <option>stepped</option>
              <option>linear</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
