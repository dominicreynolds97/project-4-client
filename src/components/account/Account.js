import { useState, useEffect } from 'react'
import { getSingleUser } from '../../lib/api'
import { getPayload } from '../../lib/auth'
import { useHistory } from 'react-router-dom'
import FavoriteRow from './FavoriteRow'

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

  const handleClick = (table, id) => {
    history.push(`/${table}/${id}`)
  }

  return (
    <div className="account">
      {user &&
        <div>
          <h1>Account</h1>
          <h3>{user.username}</h3>
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