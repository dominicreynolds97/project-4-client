import { useEffect, useState } from 'react'
import { getAllArtists } from '../../lib/api'

export default function ArtistIndex() {
  const [artists, setArtists] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllArtists()
      console.log(data)
      setArtists(data)
    }
    getData()
  }, [])

  return (
    <>
      <h1>Artists</h1>
      <div className="artist-index">
        {artists && 
          artists.map(artist => (
            <div key={artist.name} className="artist-card">
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