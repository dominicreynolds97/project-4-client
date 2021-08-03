import { useState } from 'react'
import useForm from '../../hooks/useForm'
import { createArtist } from '../../lib/api'
import ArtistForm from './ArtistForm'
 
export default function CreateArtistForm({ setIsCreatingArtist }) {
  const { formdata, setFormErrors, formErrors, handleChange } = useForm({
    name: '',
    description: '',
    yearFormed: 2021,
    logo: '',
    coverImage: '',
    location: '',
    genres: [],
    // musicians: [''],
  })

  const [mounting, setMounting] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formdata)
    try {
      await createArtist(formdata)
      if (setIsCreatingArtist) setIsCreatingArtist(false)
    } catch (err) {
      console.log(err.response.data)
      setFormErrors(err)
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

  console.log(formErrors)

  return (
    <div 
      className="artist-form"
    >
      <ArtistForm
        formdata={formdata}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
      />
    </div>
  )
}