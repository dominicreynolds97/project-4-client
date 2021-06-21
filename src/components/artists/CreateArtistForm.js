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

  return (
    <ArtistForm
      formdata={formdata}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      className="artist-form"
    />
  )
}