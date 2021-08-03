import { useState, useEffect, useContext } from 'react'
import { getAllGigs } from '../../lib/api'
import { useHistory } from 'react-router-dom'
import GigCard from './GigCard'
import { FilterSelect } from '../common/FilterSelects'
//import GigShow from './GigShow'
import { UserContext } from '../../context/UserContext'


export default function GigIndex() {
  const [allGigs, setAllGigs] = useState(null)
  const [filteredGigs, setFilteredGigs] = useState(null)
  const { user } = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllGigs()
      data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
      setAllGigs(data)
      setFilteredGigs(data)
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

  const filterGigs = (e) => {
    switch (e.target.value) {
      case 'All':
        setFilteredGigs(allGigs)
        break
      case 'Favorite artists':
        setFilteredGigs(allGigs.filter(gig => {
          console.log(typeof gig.price)
          return user.favoriteArtists.some((favoriteArtist) => {
            if (favoriteArtist.id === gig.headliner.id) return true
            return gig.supportArtists.some(supportArtist => supportArtist.id === favoriteArtist.id)
          })
        }))
        break
      case 'Favorite venues':
        setFilteredGigs(allGigs.filter(gig => {
          return user.favoriteVenues.includes(gig.venue.id)
        }))
        break
      case 'Next 7 days':
        setFilteredGigs(allGigs.filter(gig => {
          const dates = {
            gigDate: new Date(gig.dateTime),
            now: new Date(),
            aWeekAway: new Date(),
          }
          dates.aWeekAway.setDate(dates.aWeekAway.getDate() + 7)
          return dates.gigDate >= dates.now && dates.gigDate <= dates.aWeekAway
        }))
        break
      case 'Free Entry':
        setFilteredGigs(allGigs.filter(gig => gig.price == 0))
        break
      case 'Price low to high':
        setFilteredGigs([...allGigs].sort((a, b) => Number(a.price) - Number(b.price)))
        break
      case 'Price high to low':
        setFilteredGigs([...allGigs].sort((a, b) => Number(b.price) - Number(a.price)))
        break
    }
  }

  return (
    <div className="gigs">
      {user && <button onClick={handleCreateClick}>Add a Gig</button>}
      <FilterSelect
        label="Filter"
        options={['Favorite artists', 'Favorite venues', 'Next 7 days', 'Free Entry', 'Price low to high', 'Price high to low']}
        handleChange={filterGigs}
      />
      {filteredGigs &&
        filteredGigs.map(gig => (
          <GigCard
            key={gig.name}
            handleCardClick={handleCardClick}
            {...gig}
          />
        ))
      }
    </div>
  )
}