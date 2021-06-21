import { createContext, useState, useEffect } from 'react'
import { getAllGenres } from '../lib/api'

export const GenresContext = createContext()

export const GenresProvider = (props) => {
  const [genres, setGenres] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllGenres()
      setGenres(data)
    }
    getData()
  }, [])

  return (
    <GenresContext.Provider value={{ genres }}>
      {props.children}
    </GenresContext.Provider>
  )
}