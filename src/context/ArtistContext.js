import { createContext, useState, useEffect} from 'react'
import { getAllArtists } from '../lib/api'

export const ArtistContext = createContext()

export const ArtistProvider = (props) => {
  const [artists, setArtists] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllArtists()
      setArtists(data)
    }
    getData()
  }, [])

  return (
    <ArtistContext.Provider value={{ artists }}>
      {props.children}
    </ArtistContext.Provider>
  )
}