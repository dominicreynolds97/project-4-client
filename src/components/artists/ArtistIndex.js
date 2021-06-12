import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllArtists } from '../../lib/api'
import DisplayCard from './DisplayCard'

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

  const handleClick = (table, id) => {
    console.log(id)
    history.push(`/${table}/${id}`)
  }

  return (
    <>
      <h1>Artists</h1>
      <div className="artist-index">
        {artists && 
          artists.map(artist => (
            <DisplayCard
              key={artist.name}
              handleClick={handleClick}
              table="artists"
              {...artist}
            />
          ))
        }
      </div>
    </>
  )
}