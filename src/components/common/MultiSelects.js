import CreatableSelect from 'react-select/creatable'
import { useEffect, useState } from 'react'
import { createGenre, getAllGenres } from '../../lib/api'

export function GenreMultiSelect({ handleChange, formdata, formErrors, setFormErrors }) {
  const [genres, setGenres] = useState(null)
  const [addingGenre, setAddingGenre] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllGenres()
      setGenres(data)
      if (addingGenre) setAddingGenre(false)
    }
    getData()
  }, [addingGenre])

  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    handleChange({ target: { name, value: selectedItems } })
  }

  const addNewGenre = async (genre) => {
    try {
      await createGenre({ name: genre })
      setAddingGenre(true)
    } catch (err) {
      setFormErrors(err)
    }
  }
  console.log(formdata.genres)

  return (
    <>
      {genres && 
        <>
          <label>Genres</label>
          <CreatableSelect
            isMulti
            className={`multi-select ${formErrors.genres ? 'form-error' : ''}`}
            name="genres"
            onChange={selected => 
              handleMultiSelectChange(selected, 'genres')
            }
            value={formdata.genres.map(genre => ({ label: genres.find(g => g.id === genre).name, value: genre }))}
            options={genres.map(genre => ({ label: genre.name, value: genre.id }))}
            onCreateOption={addNewGenre}
          />
        </>
      }
    </>
  )
}
