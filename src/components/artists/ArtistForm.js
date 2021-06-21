import ImageUpload from '../../ImageUpload'
import { GenreMultiSelect } from '../common/MultiSelects'

export default function ArtistForm({ formdata, handleChange, handleSubmit }) {

  const handleImageUpload = file => {
    handleChange({ target: { name: 'logo', value: file } })
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <label>Name</label>
      <input
        name="name"
        value={formdata.name}
        placeholder="Artist Name"
        onChange={handleChange}
      />
      <label>Description</label>
      <textarea
        name="description"
        value={formdata.description}
        placeholder="...description"
        onChange={handleChange}
      />
      <label>Year Formed</label>
      <input
        name="yearFormed"
        type="number"
        min={1900}
        value={formdata.yearFormed}
        placeholder="Year Formed"
        onChange={handleChange}
      />
      <label>Logo</label>
      <ImageUpload
        onUpload={handleImageUpload}
      />
      <label>Cover Image</label>
      <input
        name="coverImage"
        value={formdata.coverImage}
        placeholder="Cover Image URL"
        onChange={handleChange}
      />
      <label>Location</label>
      <input
        name="location"
        value={formdata.location}
        placeholder="Location"
        onChange={handleChange}
      />
      <GenreMultiSelect
        handleChange={handleChange}
        formdata={formdata}
      />
      <button onClick={handleSubmit}>Add Artist</button>
    </form>
  )
}