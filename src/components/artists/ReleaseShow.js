import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleRelease, favorite } from '../../lib/api'
import { checkFavorite } from '../../hooks/checkFavorite'


export default function ReleaseShow() {
  const [release, setRelease] = useState(null)
  const [favorited, setFavorited] = useState(false)
  const { id } = useParams()
  const history = useHistory()

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
          </div>
        </div>
      }
    </div>
  )
}