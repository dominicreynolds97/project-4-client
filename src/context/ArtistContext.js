import { createContext, useState, useEffect } from 'react'
import { getAllArtists } from '../lib/api'

export const ArtistContext = createContext()

export const ArtistProvider = (props) => {
  const [artists, setArtists] = useState(null)
  const [isCreatingArtist, setIsCreatingArtist] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllArtists()
      setArtists(data)
    }
    getData()
  }, [isCreatingArtist])

  return (
    <ArtistContext.Provider value={{ artists, isCreatingArtist, setIsCreatingArtist }}>
      {props.children}
    </ArtistContext.Provider>
  )
}