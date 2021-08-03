import useForm from '../../hooks/useForm'
import { createRelease } from '../../lib/api'
import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ArtistContext } from '../../context/ArtistContext'
import { UserContext } from '../../context/UserContext'
import { GenreMultiSelect } from '../common/MultiSelects'
import ImageUpload from '../../ImageUpload'
import CreateTrackForm from './CreateTrackForm'

export default function CreateReleaseForm() {
  const [isAddingTracks, setIsAddingTracks] = useState(false)
  const { id } = useParams()
  const { artists } = useContext(ArtistContext)
  const { user } = useContext(UserContext)
  const [trackIndex, setTrackIndex] = useState(0)

  let currentArtist
  if (artists) currentArtist = artists.find(artist => artist.id == id)

  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    name: '',
    type: '',
    releaseDate: '',
    artwork: '',
    artist: Number(id),
    genres: [],
    owner: Number(user.id),
  })

  const handleReleaseSubmit = async (e) => {
    e.preventDefault()
    try {
      await createRelease(formdata)
      setIsAddingTracks(true)
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  console.log(trackIndex)

  const handleImageUpload = file => {
    handleChange({ target: { name: 'artwork', value: file } })
  }

  return (
    <div className="create-form">
      <form
        onSubmit={handleReleaseSubmit}
      >
        <h1>Add a Release for: {currentArtist && currentArtist.name}</h1>
        <label>Title</label>
        <input
          name="name"
          className={formErrors.name && 'form-error'}
          value={formdata.name}
          placeholder="Title"
          onChange={handleChange}
        />
        <label>Type</label>
        <select
          name="type"
          value={formdata.type}
          onChange={handleChange}
        >
          <option value="" selected disabled hidden>Select</option>
          <option value="Album">Album</option>
          <option>EP</option>
          <option>Single</option>
        </select>
        <label>Release Date</label>
        <input
          type="date"
          className={formErrors.releaseDate && 'form-error'}
          value={formdata.releaseDate}
          onChange={(e) => handleChange({ target: { name: 'releaseDate', value: e.target.value } })}
        />
        <GenreMultiSelect
          handleChange={handleChange}
          formErrors={formErrors}
          formdata={formdata}
        />
        <label>Artwork</label>
        <ImageUpload
          onUpload={handleImageUpload}
        />
        {!isAddingTracks &&
          <button type="submit">Next</button>
        }
      </form>
      {isAddingTracks &&
        <CreateTrackForm
          trackIndex={trackIndex}
          genres={formdata.genres}
          artistId={Number(currentArtist.id)}
          setTrackIndex={setTrackIndex}
          releaseName={formdata.name}
        />
      }
    </div>
  )
}