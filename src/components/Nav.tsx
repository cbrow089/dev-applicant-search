import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul style={{ display: 'flex', padding: 0, margin: 0 }}>
        <li className="nav-item">
          <NavLink 
            to="/"
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/SavedCandidates"
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            Potential Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;