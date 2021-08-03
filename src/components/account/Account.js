import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import FavoriteRow from './FavoriteRow'
import { UserContext } from '../../context/UserContext'
//import { connectToSpotify } from '../../lib/spotifyApi'

export default function Account() {
  const { user } = useContext(UserContext)
  const history = useHistory()

  const handleClick = (table, id) => {
    history.push(`/${table}/${id}`)
  }

  const comingSoon = () => {
    window.alert('Coming Soon')
  }

  return (
    <div className="account">
      {user &&
        <div>
          <h1>Account</h1>
          <h3>{user.username}</h3>
          <button onClick={comingSoon}>Connect to Spotify</button>
          <h3>Favorite Artists</h3>
          <FavoriteRow
            props={user.favoriteArtists}
            handleClick={handleClick}
            table="artists"
          />
          <h3>Favorite Releases</h3>
          <FavoriteRow
            props={user.favoriteReleases}
            handleClick={handleClick}
            table="releases"
          />
        </div>
      }
    </div>
  )
}