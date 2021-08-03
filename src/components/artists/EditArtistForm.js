import { useState } from 'react'
import useForm from '../../hooks/useForm'
import { updateSingleArtist } from '../../lib/api'
import ArtistForm from './ArtistForm'

export default function EditArtistForm({ artist, setEditing }) {
  const { formdata, handleChange, formErrors, setFormErrors } = useForm({
    name: artist.name,
    description: artist.description,
    yearFormed: artist.yearFormed,
    logo: artist.logo,
    coverImage: artist.coverImage,
    location: artist.location,
    genres: artist.genres.map(genre => genre.id),
  })
  const [mounting, setMounting] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateSingleArtist(artist.id, formdata)
      setEditing(false)
    } catch (err) {
      setFormErrors(err.response.data)
      console.log(err.response.data || err)
    }
  }

  // A neccecary workaround due to to the formErrors starting as the formData
  if (mounting) {
    const keys = Object.keys(formErrors)
    const nullFormErrors = {}
    keys.forEach(key => nullFormErrors[key] = null)
    console.log(nullFormErrors)
    setFormErrors(nullFormErrors)
    setMounting(false)
  }

  return (
    <div className="artist-form">
      <ArtistForm
        formdata={formdata}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
      />
    </div>
  )
}