import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespace_name = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace_name
    ? `https://${codespace_name}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard fetched data:', data);
        const entries = data.results ? data.results : data;
        const sorted = [...entries].sort((a, b) => b.score - a.score);
        setLeaderboard(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">🏆 Leaderboard</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>
                    {index === 0 && <span>🥇 </span>}
                    {index === 1 && <span>🥈 </span>}
                    {index === 2 && <span>🥉 </span>}
                    {index + 1}
                  </td>
                  <td>{entry.user}</td>
                  <td><span className="badge bg-success">{entry.score}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {leaderboard.length === 0 && (
            <p className="text-center text-muted">No leaderboard entries found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
