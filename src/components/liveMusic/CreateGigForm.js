import { useState, useContext, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import { createGig, getAllVenues } from '../../lib/api'
import { nanoid } from 'nanoid'

import { ArtistContext } from '../../context/ArtistContext'
import CreateArtistForm from '../artists/CreateArtistForm'
import CreateVenueForm from './CreateVenueForm'

export default function CreateGigForm() {
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    name: '',
    description: '',
    dateTime: '',
    price: 0,
    venue: {},
    headliner: {},
    supportArtists: [{}],
  })
  const [dateTime, setDateTime] = useState({
    date: '',
    time: '',
  })
  const { artists, isCreatingArtist, setIsCreatingArtist } = useContext(ArtistContext)
  const [ids, setIds] = useState([nanoid()])
  const [venues, setVenues] = useState(null)
  const [isCreatingVenue, setIsCreatingVenue] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllVenues()
      setVenues(data)
    }
    getData()
  }, [isCreatingVenue])

  const handleAddSupportArtistInput = () => {
    //if (formdata.supportArtists[formdata.supportArtists.length - 1]) {
    handleChange({ target: { name: 'supportArtists', value: [...formdata.supportArtists, {}] } })
    setIds([...ids, nanoid()])
    //}
  }

  const handleSupportChange = (e, i) => {
    console.log(e.target.value)
    handleChange({ target: { name: 'supportArtists', value: [...formdata.supportArtists.slice(0, i), e.target.value, ...formdata.supportArtists.slice(i + 1)] } })
  }


  console.log(formdata)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      formdata.dateTime = `${dateTime.date}T${dateTime.time}Z`
      await createGig(formdata)
      history.pushState('/live-music/gigs/')
    } catch (err) {
      if (err.response) {
        console.log(err.response)
        setFormErrors(err.response.data)
      } else console.log(err)
    }
  }

  const addNewArtist = () => {
    setIsCreatingArtist(true)
  }

  const addNewVenue = () => {
    setIsCreatingVenue(true)
  }

  return (
    <div className="create-form">
      <form onSubmit={handleSubmit}>
        <label>Gig Name</label>
        <input
          name="name"
          className={formErrors.name && 'form-error'}
          placeholder="Gig Name"
          value={formdata.name}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          className={`description${formErrors.name && ' form-error'}`}
          placeholder="...description"
          value={formdata.description}
          onChange={handleChange}
        />
        <label>Date</label>
        <input
          type="date"
          className={formErrors.dateTime.date && 'form-error'}
          value={dateTime.date}
          onChange={(e) => setDateTime({ ...dateTime, date: e.target.value })}
        />
        <label>Time</label>
        <input
          type="time"
          className={formErrors.dateTime.time && 'form-error'}
          value={dateTime.time}
          onChange={(e) => {
            setDateTime({ ...dateTime, time: e.target.value })
          }}
        />
        <label>Price</label>
        <input
          name="price"
          className={formErrors.price && 'form-error'}
          placeholder="£ Price"
          value={formdata.price}
          onChange={handleChange}
        />
        {artists &&
          <>
            <label>Headliner</label>
            <select 
              onChange={handleChange} 
              name="headliner"
            >
              {artists.map(artist => (
                <option 
                  key={artist.name}
                  value={artist.id}
                >{artist.name}</option>
              ))}
            </select>
            <label>Support Acts</label>
            {formdata.supportArtists.map((supportArtist, i) => (
              <select
                key={ids[i]}
                onChange={(e) => handleSupportChange(e, i)}
                name="supportArtists"
              >
                {artists.map(artist => (
                  <option 
                    key={artist.name}
                    value={artist.id}
                  >{artist.name}</option>
                ))}
              </select>
            ))}
            <button type="button" onClick={handleAddSupportArtistInput}>Add Support Act</button>
            {isCreatingArtist ? 
              <>
                <hr/>
                <h4>New Artis t</h4>
                <CreateArtistForm
                  className="overlay"
                  setIsCreatingArtist={setIsCreatingArtist}
                />
                <hr/>
              </>
              :
              <button type="button" onClick={addNewArtist}>Add a New Artist</button>
            }
          </>
        }
        <label>Venue</label>
        <select onChange={handleChange} name="venue">
          <option value="none" selected disabled hidden>--select venue--</option>
          {venues && venues.map(venue => (
            <option 
              key={venue.name}
              value={venue.id}
            >{venue.name}</option>
          ))}
        </select>
        {isCreatingVenue ? 
          <>
            <hr/>
            <h4>New Venue</h4>
            <CreateVenueForm
              setIsCreatingVenue={setIsCreatingVenue}
            />
            <hr/>
          </>
          :
          <button onClick={addNewVenue}>Add a New Venue</button>
        }
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

// function ArtistSelect(artists) {
//   return (
//     <select>
//       {artists.map(artist => (
//         <option 
//           key={artist.name}
//           value={artist.id}
//         >{artist.name}</option>
//       ))}
//     </select>
//   )
// }