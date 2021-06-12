import { useState, useEffect } from 'react'
import { getSingleUser } from '../../lib/api'
import { getPayload } from '../../lib/auth'
import { useHistory } from 'react-router-dom'

export default function Account() {
  const [user, setUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleUser(getPayload().sub)
      setUser(data)
    }
    getData()
  }, [])

  const handleClick = (location, id) => {
    history.push(`/${location}/${id}`)
  }

  return (
    <div className="account">
      {user &&
        <div>
          <h1>Account</h1>
          <h3>{user.username}</h3>
          <h3>Favorite Artists</h3>
          <div className="favorite-row">
            {user.favoriteArtists.map(artist => (
              <div className="favorite-card" key={artist.name} onClick={() => handleClick('artists', artist.id)}>
                <h4>{artist.name}</h4>
                <img className="logo" src={artist.logo}/>
              </div>
            ))}
          </div>
          <h3>Favorite Releases</h3>
          <div className="favorite-row">
            {user.favoriteReleases.map(release => (
              <div className="favorite-card" key={release.name} onClick={() => handleClick('releases', release.id)}>
                <h4>{release.name}</h4>
                <img className="logo" src={release.logo} alt={release.name}/>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}