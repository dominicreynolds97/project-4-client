import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleArtist, favorite } from '../../lib/api'

export default function ArtistShow() {
  const [artist, setArtist] = useState(null)
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleArtist(id)
      console.log(data)
      setArtist(data)
    }
    getData()
  }, [id])

  const handleFavorite = async () => {
    await favorite('artists', id)
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
            <button onClick={handleFavorite}>Favorite</button>
          </div>
        </div>
      }
    </div>
  )
}