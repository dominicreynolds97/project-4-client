import { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleRelease, favorite, deleteRelease } from '../../lib/api'
import { checkFavorite } from '../../hooks/checkFavorite'
import { UserContext } from '../../context/UserContext'


export default function ReleaseShow() {
  const [release, setRelease] = useState(null)
  const [favorited, setFavorited] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleRelease(id)
      data.tracks.sort((track1, track2) => Number(track1.trackIndex) - Number(track2.trackIndex))
      setRelease(data)
      setFavorited(checkFavorite(data))
      console.log(data)
    }
    getData()
  }, [id])

  const calculateLength = (lengthInSeconds) => {
    let seconds = lengthInSeconds % 60
    const minutes = (lengthInSeconds - seconds) / 60
    if (seconds < 10) seconds = '0' + seconds
    const length = `${minutes}:${seconds}`
    return length
  }

  const handleFavorite = async () => {
    await favorite('releases', id)
    setFavorited(!favorited)
  }

  const handleArtistClick = (artistId) => {
    history.push(`/artists/${artistId}/`)
  }

  const handleDelete = async () => {
    try {
      await deleteRelease(release.id)
      history.push(`/artists/${release.artist.id}`)
    } catch (err) {
      window.alert('Something Went Wrong')
      console.log(err.response.data)
    }
  }

  return (
    <div className="release">
      {release &&
        <div>
          <img className="artwork" src={release.artwork} />
          <h1>{release.name} - {release.type}</h1>
          <h3 className="pointer" onClick={() => handleArtistClick(release.artist.id)}>{release.artist.name}</h3>
          <ol className="track-list">
            {release.tracks.map(track => (
              <li key={track.name}>{track.name} - {calculateLength(track.length)}</li>
            ))}
          </ol>
          <div className="favorite">
            <button 
              onClick={handleFavorite} 
              className={`${favorited ? '' : 'not-'}favorited`}
            >
              Favorite{favorited && 'd'}
            </button>
            {user.id === release.owner &&
              <button
                onClick={handleDelete}
              >Delete</button>
            }
          </div>
        </div>
      }
    </div>
  )
}