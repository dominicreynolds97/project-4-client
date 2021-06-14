import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleRelease, favorite } from '../../lib/api'
import { checkFavorite } from '../../hooks/checkFavorite'


export default function ReleaseShow() {
  const [release, setRelease] = useState(null)
  const [favorited, setFavorited] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleRelease(id)
      data.tracks.sort((track1, track2) => track1.trackIndex < track2.trackIndex)
      setRelease(data)
      setFavorited(checkFavorite(data))
      console.log(data)
    }
    getData()
  }, [id])

  const calculateLength = (lengthInSeconds) => {
    const seconds = lengthInSeconds % 60
    const minutes = (lengthInSeconds - seconds) / 60
    const length = `${minutes}:${seconds}`
    return length
  }

  const handleFavorite = async () => {
    await favorite('releases', id)
    setFavorited(!favorited)
  }

  return (
    <div className="release">
      {release &&
        <div>
          <h1>{release.name} - {release.type}</h1>
          <h3>{release.artist.name}</h3>
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