import React, { useState, useEffect } from 'react'
import { getAllGigs } from '../../lib/api'
import { useHistory } from 'react-router-dom'

export default function GigIndex() {
  const [gigs, setGigs] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllGigs()
      setGigs(data)
      console.log(data)
    }
    getData()
  }, [])

  const handleCardClick = (gigId) => {
    history.push(`/live-music/gigs/${gigId}/`)
  }

  const handleCreateClick = () => {
    history.push('/live-music/gigs/create/')
  }

  return (
    <div className="gigs">
      <button onClick={handleCreateClick}>Add a Gig</button>
      {gigs &&
        gigs.map(gig => (
          <div onClick={() => handleCardClick(gig.id)} key={gig.name} className="gig-card">
            <img className="logo" src={gig.headliner.logo}/>
            <div className="left-half">
              <h3>{gig.name}</h3>
              <ul className="acts">
                <h4>{gig.headliner.name}</h4>
                {gig.supportArtists.map(artist => (
                  <li key={artist.name}>{artist.name}</li>
                ))}
              </ul>
            </div>
            <div className="right-half">
              <h3>{gig.venue.name}</h3>
              <h5>£{gig.price}</h5>
              <h4>{new Date(gig.dateTime).toLocaleString(('en-US'))}</h4>
            </div>
          </div>
        ))
      }
    </div>
  )
}