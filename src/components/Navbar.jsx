import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <h2 style={{ margin: 0 }}>Billing</h2>
      </div>
      <div>
        <Link to="/">Pricing</Link>
        <Link to="/history">History</Link>
      </div>
    </nav>
  );
}