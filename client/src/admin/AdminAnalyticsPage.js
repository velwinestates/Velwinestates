import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState({ total: 0, daily: [], byPage: [] });
  const [status, setStatus] = useState('Loading website views...');
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function loadAnalytics() {
    setIsRefreshing(true);
    setStatus('Loading website views...');
    try {
      const response = await fetch(`${apiUrl('/api/analytics/page-views')}?refresh=${Date.now()}`, {
        cache: 'no-store'
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to load website views.');
      setAnalytics({ total: 0, daily: [], byPage: [], ...data });
      setStatus('');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  /* Keep the initial request and manual refresh on one code path. */
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  const refreshViews = () => loadAnalytics();

  return (
    <section style={{ fontFamily: 'var(--font-family)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ marginBottom: '0.35rem' }}>Website Views</h2>
          <p style={{ marginTop: 0, color: '#5d6b63' }}>Track public website views by day and page.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            type="button"
            onClick={refreshViews}
            disabled={isRefreshing}
            style={{ padding: '0.7rem 1rem', border: '1px solid #d6d2c7', borderRadius: 8, background: '#fff', color: '#285943', cursor: isRefreshing ? 'wait' : 'pointer', fontWeight: 600 }}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh views'}
          </button>
          <div style={{ padding: '1rem 1.5rem', background: '#f7f8f2', border: '1px solid #d6d2c7', borderRadius: 8 }}>
            <div style={{ color: '#5d6b63', fontSize: '0.85rem' }}>Total views</div>
            <strong style={{ display: 'block', marginTop: '0.2rem', color: '#285943', fontSize: '2rem' }}>{analytics.total.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {status && <p role="status">{status}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
        <section style={{ padding: '1.25rem', background: '#fff', border: '1px solid #d6d2c7', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Day-wise views</h3>
          {analytics.daily.length === 0 ? <p>No views recorded yet.</p> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={{ textAlign: 'left', padding: '0.6rem 0' }}>Date</th><th style={{ textAlign: 'right', padding: '0.6rem 0' }}>Views</th></tr></thead>
                <tbody>{analytics.daily.map(item => <tr key={item.date}><td style={{ padding: '0.6rem 0', borderTop: '1px solid #eee' }}>{formatDate(item.date)}</td><td style={{ padding: '0.6rem 0', borderTop: '1px solid #eee', textAlign: 'right', fontWeight: 700 }}>{item.views.toLocaleString()}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </section>

        <section style={{ padding: '1.25rem', background: '#fff', border: '1px solid #d6d2c7', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Views by page</h3>
          {analytics.byPage.length === 0 ? <p>No page views recorded yet.</p> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={{ textAlign: 'left', padding: '0.6rem 0' }}>Page</th><th style={{ textAlign: 'right', padding: '0.6rem 0' }}>Views</th></tr></thead>
                <tbody>{analytics.byPage.map(item => <tr key={item.path}><td style={{ padding: '0.6rem 0', borderTop: '1px solid #eee' }}>{item.path}</td><td style={{ padding: '0.6rem 0', borderTop: '1px solid #eee', textAlign: 'right', fontWeight: 700 }}>{item.views.toLocaleString()}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
