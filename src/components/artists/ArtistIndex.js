import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllArtists, getAllGenres } from '../../lib/api'
import DisplayCard from './DisplayCard'
import { FilterSelect } from '../common/FilterSelects'

export default function ArtistIndex() {
  const [artists, setArtists] = useState(null)
  const [filteredArtists, setFilteredArtists] = useState(null)
  const [filterState, setFilterState] = useState({
    genre: 'All',
    location: 'All',
  })
  const [genres, setGenres] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllArtists()
      const filteredData = data.filter(artist => artist.name !== 'Anyone')
      setArtists(filteredData)
      setFilteredArtists(filteredData)
      const res = await getAllGenres()
      setGenres(res.data)
    }
    getData()
  }, [])

  const filterArtists = (filterSelected) => {
    let filtered = filterByGenre(filterSelected.genre, artists)
    filtered = filterByLocation(filterSelected.location, filtered)
    setFilteredArtists(filtered)
  } 

  const handleClick = (table, id) => {
    history.push(`/${table}/${id}`)
  }

  const handleGenreChange = (e) => {
    filterArtists({ ...filterState, genre: e.target.value })
    setFilterState({ ...filterState, genre: e.target.value })
  }

  const handleLocationChange = (e) => {
    filterArtists({ ...filterState, location: e.target.value })
    setFilterState({ ...filterState, location: e.target.value })
  }

  const filterByGenre = (genre, arr) => {
    if (genre !== 'All') {
      return arr.filter(artist => {
        return artist.genres.includes(Number(genre))
      })
    } else {
      return arr
    }
  }

  const filterByLocation = (location, arr) => {
    if (location !== 'All') {
      return arr.filter(artist => {
        return artist.location === location
      })
    } else {
      return arr
    }
  }

  return (
    <>
      <h1>Artists</h1>
      <FilterSelect
        label="Genres"
        options={genres}
        defaultOption="All"
        handleChange={handleGenreChange}
      />
      <FilterSelect
        label="Location"
        options={['Belfast', 'Derry']}
        defaultOption="All"
        handleChange={handleLocationChange}
      />
      <div className="artist-index">
        {filteredArtists && 
          filteredArtists.map(artist => (
            <DisplayCard
              key={artist.name}
              handleClick={handleClick}
              table="artists"
              cardType="adaptive"
              {...artist}
            />
          ))
        }
      </div>
    </>
  )
}