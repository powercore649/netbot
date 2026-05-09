import React, { useEffect, useState } from 'react';

export default function StatusPage() {
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);

      // Discord public status API
      const response = await fetch('https://discordstatus.com/api/v2/summary.json');

      if (!response.ok) {
        throw new Error('Unable to fetch status data');
      }

      const data = await response.json();
      setStatusData(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load live status information.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-card">
        <h2>System Status</h2>
        <p>Loading live service data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card">
        <h2>System Status</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p className="topbar-eyebrow">LIVE INFRASTRUCTURE STATUS</p>
            <h2 style={{ margin: 0 }}>Discord Platform Status</h2>
          </div>

          <div style={{
            padding: '0.6rem 1rem',
            borderRadius: '999px',
            background: 'rgba(88, 101, 242, 0.15)',
            border: '1px solid rgba(88, 101, 242, 0.35)'
          }}>
            {statusData?.status?.description || 'Unknown'}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {statusData?.components?.slice(0, 6).map(component => (
          <div key={component.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>{component.name}</h3>

              <span style={{
                fontSize: '0.85rem',
                padding: '0.3rem 0.7rem',
                borderRadius: '999px',
                background: component.status === 'operational'
                  ? 'rgba(0, 200, 81, 0.15)'
                  : 'rgba(255, 68, 68, 0.15)'
              }}>
                {component.status}
              </span>
            </div>

            <p style={{ opacity: 0.8, margin: 0 }}>
              Updated: {new Date(component.updated_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card">
        <h3>Recent Incidents</h3>

        {statusData?.incidents?.length === 0 ? (
          <p>No active incidents reported.</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {statusData?.incidents?.slice(0, 5).map(incident => (
              <div
                key={incident.id}
                style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <strong>{incident.name}</strong>
                  <span>{incident.status}</span>
                </div>

                <p style={{ marginTop: '0.75rem', opacity: 0.85 }}>
                  {incident.incident_updates?.[0]?.body || 'No details available.'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
