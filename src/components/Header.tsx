import React from 'react';

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900">
      <select className="bg-gray-700 p-2 rounded">
        <option>Sample CPU</option>
      </select>
      <button className="p-2">⚙️</button>
    </header>
  );
}

export default Header;
