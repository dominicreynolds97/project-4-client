import { useEffect, useState } from 'react'
import { getAllTracks } from '../../lib/api'

export default function TrackIndex() {
  const [tracks, setTracks] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllTracks()
      console.log(data)
      setTracks(data)
    }
    getData()
  }, [])
  return (
    <>
      {tracks ?
        tracks.map(track => (
          <div key={track.name}>
            <h3>{track.name}</h3>
            <h4>{track.artist}</h4>
            <a href={track.urls[0]} target="_blank" rel="noreferrer">Link</a>
          </div>
        ))
        :
        <h1>Loading</h1>
      }
    </>
  )
}