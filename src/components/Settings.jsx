import React, { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="page-card">
      <div className="page-card-header">
        <div>
          <p className="section-eyebrow">Configuration</p>
          <h2>Paramètres</h2>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-item">
          <div>
            <h3>Notifications</h3>
            <p>Recevoir les alertes importantes du serveur.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div>
            <h3>Mode sombre</h3>
            <p>Activer l’interface sombre du tableau de bord.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
