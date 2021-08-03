import useForm from '../../hooks/useForm'
import { createVenue } from '../../lib/api'

export default function CreateVenueForm({ setIsCreatingVenue }) {
  const { formdata, handleChange, formErrors, setFormErrors } = useForm({
    name: '',
    description: '',
    location: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createVenue(formdata)
      setIsCreatingVenue(false)
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  return (
    <div className="venue-form">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className={formErrors.name && 'form-error'}
          placeholder="Venue Name"
          value={formdata.value}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className={formErrors.description && 'form-error'}
          placeholder="...description"
          value={formdata.description}
          onChange={handleChange}
        />
        <textarea
          name="location"
          className={formErrors.location && 'form-error'}
          placeholder="location"
          value={formdata.location}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add Venue</button>
      </form>
    </div>
  )
}