import { Link, useHistory, useLocation } from 'react-router-dom'
import { removeToken } from '../../lib/auth'
import { useEffect, useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function Nav() {
  const { user, checkLoggedIn } = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()


  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  useEffect(() => {
    checkLoggedIn()
  }, [location.pathname, checkLoggedIn])

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link to='/' className="navbar-item">Home</Link>
        <Link to="/artists" className="navbar-item">Artists</Link>
        <Link to="/releases" className="navbar-item">Releases</Link>
        <Link to="/live-music/gigs" className="navbar-item dropdown">Live Music</Link>
      </div>
      <div className="navbar-end">
        {user ?
          <div>
            <div className="navbar-item pointer" onClick={handleLogout}>Log Out</div>
            <Link to="/account" className="navbar-item">{user.username}</Link>
          </div>
          :
          <div>
            <Link to="/login" className="navbar-item">Log In</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </div>
        }
        
      </div>
    </nav>
  )
}