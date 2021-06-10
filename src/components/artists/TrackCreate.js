import useForm from '../../hooks/useForm'
import { createTrack } from '../../lib/api'

export default function TrackCreate() {
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    name: '',
    length: 0,
    urls: [''],
    artist: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await createTrack(formdata)
      console.log(data.name)
    } catch (err) {
      setFormErrors({ ...formErrors, ...err.response.data })
    }
  }

  const handleChangeUrl = (event, i) => {
    const newArray = [...formdata.urls]
    newArray[i] = event.target.value
    handleChange({ target: { name: 'urls', value: newArray } })
  }

  console.log(formdata)

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        name="name"
        onChange={handleChange}
        value={formdata.name}
      />
      <input
        placeholder="Length in Seconds"
        type="number"
        name="length"
        onChange={handleChange}
        value={formdata.length}
      />
      {formdata.urls.map((url, i) => (
        <input
          key={`key${i}`}
          placeholder="URLS"
          name="urls"
          onChange={(event) => handleChangeUrl(event, i)}
          value={url}
        />
      ))}
      <input
        placeholder="Artist"
        name="artist"
        onChange={handleChange}
        value={formdata.artist}
      />
      <button type="submit">Submit</button>
    </form>
  )
}