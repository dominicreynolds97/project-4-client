import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleArtist, favorite } from '../../lib/api'
import { checkFavorite } from '../../hooks/checkFavorite'
import DisplayCard from './DisplayCard'

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

  const handleClick = (table, id) => {
    history.push(`/${table}/${id}`)
  }

  return (
    <div>
      {artist &&
        <div className="artist-show">

          <div className="cover-image">
            <img className="logo" src={artist.logo}/>
            <div className="info">
              <h1>{artist.name}</h1>
              <h3>{artist.location}</h3>
              <h4 className="genres">{artist.genres.map(genre => <span key={genre.name}>{genre.name}</span>)}</h4>
              <p>{artist.description}</p>
            </div>
          </div>
          <div className="middle-card">
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
              <DisplayCard
                key={release.name}
                handleClick={handleClick}
                {...release}
                table="releases"
              />
            ))}
          </div>
        </div>
      }
    </div>
  )
}