import { createTrack, getAllReleases } from '../../lib/api'
import useForm from '../../hooks/useForm'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function CreateTrackForm({ artistId, releaseId, trackIndex, setTrackIndex, genres, releaseName }) {
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    name: '',
    length: '',
    trackIndex: trackIndex,
    artist: artistId,
    release: [releaseId],
    genres: genres,
  })
  const [length, setLength] = useState('00:00')
  const [addedTracks, setAddedTracks] = useState([])
  const history = useHistory()
  

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllReleases()
        handleChange({ target: { 
          name: 'release', 
          value: [data.find(release => {
            return release.name === releaseName && release.artist === artistId
          }).id], 
        } })
      } catch (err) {
        console.log(err.response.data)
      }
    }
    getData()
  }, [])

  const resetFormData = () => {
    handleChange({ target: { name: 'name', value: '' } })
    handleChange({ target: { name: 'length', value: '' } })
    handleChange({ target: { name: 'trackIndex', value: trackIndex } })
  }

  const handleTrackSubmit = async (e) => {
    e.preventDefault()
    try {
      setTrackIndex(trackIndex + 1)
      await createTrack(formdata)
      setAddedTracks([...addedTracks, formdata])
      resetFormData()
    } catch (err) {
      setFormErrors(err.response.data)
      console.log(formErrors)
    }
  }
  console.log(formdata)

  const handleLengthChange = (e) => {
    setLength(e.target.value)
    const minsSecs = e.target.value.split(':')
    handleChange({ target: { name: 'length', value: (Number(minsSecs[0]) * 60) + Number(minsSecs[1]) } })
  }

  const handleComplete = () => {
    history.push(`/releases/${formdata.release[0]}`)
  }

  return (
    <>
      <ol>
        {addedTracks.map(track => (
          <li key={track.name}>{track.name}</li>
        ))}
      </ol>
      <form onSubmit={handleTrackSubmit}>
        <label>Track {trackIndex + 1} Name</label>
        <input
          name="name"
          className={formErrors.name && 'form-error'}
          value={formdata.name}
          onChange={handleChange}
          placeholder="Track Name"
        />
        <label>Track Length (minutes:seconds)</label>
        <input
          name="length"
          type="time"
          min="0:00"
          max="59:59"
          className={formErrors.length && 'form-error'}
          value={length}
          onChange={handleLengthChange}
        />
        <button type="sumbit">Add Track</button>
      </form>
      <button className="button" onClick={handleComplete}>Finish</button>
    </>
  )
}