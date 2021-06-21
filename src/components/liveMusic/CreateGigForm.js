import { useState, useContext, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import { createGig, getAllVenues } from '../../lib/api'
import { nanoid } from 'nanoid'

import { ArtistContext } from '../../context/ArtistContext'
import CreateArtistForm from '../artists/CreateArtistForm'

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
  const { artists } = useContext(ArtistContext)
  const [ids, setIds] = useState([nanoid()])
  const [venues, setVenues] = useState(null)
  const [isCreatingArtist, setIsCreatingArtist] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllVenues()
      setVenues(data)
    }
    getData()
  }, [])

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

  return (
    <div className="create-form">
      <form onSubmit={handleSubmit}>
        <label>Gig Name</label>
        <input
          name="name"
          placeholder="Gig Name"
          value={formdata.name}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name="description"
          placeholder="...description"
          className="description"
          value={formdata.description}
          onChange={handleChange}
        />
        <label>Date</label>
        <input
          type="date"
          value={dateTime.date}
          onChange={(e) => setDateTime({ ...dateTime, date: e.target.value })}
        />
        <label>Time</label>
        <input
          type="time"
          value={dateTime.time}
          onChange={(e) => {
            setDateTime({ ...dateTime, time: e.target.value })

          }}
        />
        <label>Price</label>
        <input
          name="price"
          placeholder="£ Price"
          value={formdata.price}
          onChange={handleChange}
        />
        {artists &&
          <>
            <label>Headliner</label>
            <select onChange={handleChange} name="headliner">
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
            {isCreatingArtist ? <CreateArtistForm
              className="overlay"
              setIsCreatingArtist={setIsCreatingArtist}
            />
              :
              <button type="button" onClick={addNewArtist}>Add a New Artist</button>
            }
          </>
        }
        <label>Venue</label>
        <select onChange={handleChange} name="venue">
          <option default>--select venue--</option>
          {venues && venues.map(venue => (
            <option 
              key={venue.name}
              value={venue.id}
            >{venue.name}</option>
          ))}
        </select>
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