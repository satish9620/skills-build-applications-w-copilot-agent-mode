import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#512a97' }}>
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              🏋️ OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/workouts">Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <div className="row">
                <div className="col-12 text-center">
                  <div className="card p-5">
                    <h1 className="display-4">🏋️ Welcome to OctoFit Tracker</h1>
                    <p className="lead">Fitness tracking app for Mergington High School</p>
                    <p>Track your activities, compete with teams, and stay fit!</p>
                    <div className="row mt-4">
                      <div className="col-md-4 mb-3">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">👥 Users</h5>
                            <p className="card-text">Manage user profiles and accounts</p>
                            <NavLink to="/users" className="btn btn-primary">View Users</NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">🏃 Activities</h5>
                            <p className="card-text">Log and track fitness activities</p>
                            <NavLink to="/activities" className="btn btn-primary">View Activities</NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">🏆 Leaderboard</h5>
                            <p className="card-text">See who's leading the fitness challenge</p>
                            <NavLink to="/leaderboard" className="btn btn-primary">View Leaderboard</NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>

        <footer className="text-center mt-5 py-3" style={{ backgroundColor: '#512a97', color: 'white' }}>
          <p className="mb-0">OctoFit Tracker &copy; 2024 - Mergington High School</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
