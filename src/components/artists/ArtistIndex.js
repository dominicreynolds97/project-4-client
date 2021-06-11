import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllArtists } from '../../lib/api'

export default function ArtistIndex() {
  const [artists, setArtists] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllArtists()
      console.log(data)
      setArtists(data)
    }
    getData()
  }, [])

  const handleClick = (id) => {
    history.push(`/artists/${id}`)
  }

  return (
    <>
      <h1>Artists</h1>
      <div className="artist-index">
        {artists && 
          artists.map(artist => (
            <div onClick={() => handleClick(artist.id)} key={artist.name} className="artist-card">
              <h3>{artist.name}</h3>
              <p>{artist.description}</p>
              <img src={artist.logo} alt={artist.name}/>
            </div>
          ))
        }
      </div>
    </>
  )
}