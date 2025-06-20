import { useAppStore } from '../state/store';

export function SettingsPanel() {
  const settings = useAppStore((s) => s.settings);
  const setTheme = useAppStore((s) => s.setTheme);
  return (
    <div className="p-4 space-y-2">
      <div>
        <label>Theme:</label>
        <select
          className="text-black p-1 rounded"
          value={settings.theme}
          onChange={(e) => setTheme(e.target.value as any)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
}
