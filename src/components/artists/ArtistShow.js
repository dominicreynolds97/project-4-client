import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleArtist, favorite } from '../../lib/api'
import { checkFavorite } from '../../hooks/checkFavorite'

export default function ArtistShow() {
  const [artist, setArtist] = useState(null)
  const [favorited, setFavorited] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  console.log(id)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleArtist(id)
      console.log(data)
      setArtist(data)
      setFavorited(checkFavorite(data))
    }
    getData()
  }, [id])

  const handleFavorite = async () => {
    await favorite('artists', id)
    setFavorited(!favorited)
  }

  const handleReleaseClick = (id) => {
    history.push(`/releases/${id}`)
    console.log(id)
  }

  return (
    <div>
      {artist &&
        <div className="artist-show">
          <div className="cover-image">
            <h1>{artist.name}</h1>
            <h3>{artist.location}</h3>
            <h4 className="genres">{artist.genres.map(genre => <span key={genre.name}>{genre.name}</span>)}</h4>
          </div>
          <div className="middle-card">
            <p>{artist.description}</p>
            <ul>
              {artist.musicians.map(member => <li key={member.name}>{member.name}</li>)}
            </ul>
            <div className="favorite">
              <button 
                onClick={handleFavorite} 
                className={`${favorited ? '' : 'not-'}favorited`}
              >
                Favorite{favorited && 'd'}
              </button>
            </div>
          </div>
          <div className="releases">
            {artist.releases.map(release => (
              <div onClick={() => handleReleaseClick(release.id)} key={release.name} className="release-card pointer">
                <h2>{release.name}</h2>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}