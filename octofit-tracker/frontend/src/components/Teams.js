import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespace_name = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace_name
    ? `https://${codespace_name}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams fetched data:', data);
        const teams = data.results ? data.results : data;
        setTeams(teams);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams fetch error:', err);
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
          <h2 className="mb-0">👥 Teams</h2>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <p className="text-center text-muted">No teams found.</p>
          ) : (
            <div className="row">
              {teams.map((team, index) => (
                <div key={team.id || index} className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="mb-0">{team.name}</h5>
                    </div>
                    <div className="card-body">
                      <h6>Members:</h6>
                      <ul className="list-group list-group-flush">
                        {Array.isArray(team.members) ? team.members.map((member, i) => (
                          <li key={i} className="list-group-item">
                            👤 {member}
                          </li>
                        )) : (
                          <li className="list-group-item">{team.members}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
