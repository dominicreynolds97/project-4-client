import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link to='/' className="navbar-item">Home</Link>
        <Link to="/artists" className="navbar-item">Artists</Link>
        <Link to="/live-music" className="navbar-item dropdown">Live Music</Link>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="navbar-item">Log In</Link>
        <Link to="/register" className="navbar-item">Register</Link>
        <Link to="/account" className="navbar-item">Account</Link>
      </div>
    </nav>
  )
}