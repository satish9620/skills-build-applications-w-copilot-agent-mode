import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespace_name = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace_name
    ? `https://${codespace_name}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Users fetched data:', data);
        const users = data.results ? data.results : data;
        setUsers(users);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users fetch error:', err);
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
          <h2 className="mb-0">👤 Users</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="text-center text-muted">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
