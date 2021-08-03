import ImageUpload from '../../ImageUpload'
import { GenreMultiSelect } from '../common/MultiSelects'

export default function ArtistForm({ formdata, handleChange, handleSubmit, formErrors }) {

  const handleImageUpload = file => {
    handleChange({ target: { name: 'logo', value: file } })
  }

  console.log(formErrors)

  return (
    <form
      onSubmit={handleSubmit}
    >
      <label>Name</label>
      <input
        name="name"
        className={formErrors.name && 'form-error'}
        value={formdata.name}
        placeholder="Artist Name"
        onChange={handleChange}
      />
      {formErrors.name && <p className="form-error-detail">{formErrors.name[0]}</p>}
      <label>Description</label>
      <textarea
        name="description"
        className={formErrors.description && 'form-error'}
        value={formdata.description}
        placeholder="...description"
        onChange={handleChange}
      />
      {formErrors.description && <p className="form-error-detail">{formErrors.description[0]}</p>}
      <label>Year Formed</label>
      <input
        name="yearFormed"
        className={formErrors.yearFormed && 'form-error'}
        type="number"
        min={1900}
        value={formdata.yearFormed}
        placeholder="Year Formed"
        onChange={handleChange}
      />
      {formErrors.yearFormed && <p className="form-error-detail">{formErrors.yearFormed[0]}</p>}
      <label>Logo</label>
      <ImageUpload
        onUpload={handleImageUpload}
      />
      <label>Cover Image</label>
      <input
        name="coverImage"
        className={formErrors.coverImage && 'form-error'}
        value={formdata.coverImage}
        placeholder="Cover Image URL"
        onChange={handleChange}
      />
      {formErrors.coverImage && <p className="form-error-detail">{formErrors.coverImage[0]}</p>}
      <label>Location</label>
      <input
        name="location"
        className={formErrors.location && 'form-error'}
        value={formdata.location}
        placeholder="Location"
        onChange={handleChange}
      />
      {formErrors.location && <p className="form-error-detail">{formErrors.location[0]}</p>}
      <GenreMultiSelect
        handleChange={handleChange}
        formErrors={formErrors}
        formdata={formdata}
      />
      <button onClick={handleSubmit}>Add Artist</button>
    </form>
  )
}