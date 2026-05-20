import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespace_name = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace_name
    ? `https://${codespace_name}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Activities fetched data:', data);
        const activities = data.results ? data.results : data;
        setActivities(activities);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities fetch error:', err);
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
          <h2 className="mb-0">🏃 Activities</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id || index}>
                  <td>{index + 1}</td>
                  <td>{activity.user}</td>
                  <td>{activity.activity_type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {activities.length === 0 && (
            <p className="text-center text-muted">No activities found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
