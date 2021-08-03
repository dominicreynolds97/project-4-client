import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleGig, deleteGig } from '../../lib/api'

export default function GigShow() {
  const [gig, setGig] = useState(null)
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleGig(id)
      setGig(data)
    }
    getData()
  }, [id])

  const handleArtistClick = (artistId) => {
    history.push(`/artists/${artistId}/`)
  }

  const handleDelete = async () => {
    await deleteGig(gig.id)
    history.push('/live-music/gigs/')
  }

  return (
    <div className="gig-show">
      {gig &&
        <>
          <h1>{gig.name}</h1>
          <h3>{gig.venue.name}</h3>
          <p>{gig.venue.location}</p>
          <h3>£{gig.price}</h3>
          <h2 className="pointer" onClick={() => handleArtistClick(gig.headliner.id)}>{gig.headliner.name}</h2>
          {gig.supportArtists.map(artist => (
            <h4 className="pointer" onClick={() => handleArtistClick(artist.id)} key={artist.name}>{artist.name}</h4>
          ))}
          <button onClick={handleDelete}>Delete</button>
        </>
      }
    </div>
  )
}