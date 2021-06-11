import { Link, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken, getPayload } from '../../lib/auth'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())
  const history = useHistory()
  const location = useLocation()
  // const { id } = getPayload()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  useEffect(() => {
    setIsLoggedIn(isAuthenticated)
  }, [location.pathname])

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link to='/' className="navbar-item">Home</Link>
        <Link to="/artists" className="navbar-item">Artists</Link>
        <Link to="/live-music" className="navbar-item dropdown">Live Music</Link>
      </div>
      <div className="navbar-end">
        {isLoggedIn ?
          <>
            <div className="navbar-item" onClick={handleLogout}>Log Out</div>
            <Link to="/account" className="navbar-item">Account</Link>
          </>
          :
          <>
            <Link to="/login" className="navbar-item">Log In</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </>
        }
        
      </div>
    </nav>
  )
}