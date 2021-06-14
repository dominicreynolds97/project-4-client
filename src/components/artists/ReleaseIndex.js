import { useEffect, useState } from 'react'
import DisplayCard from './DisplayCard'
import { getAllReleases } from '../../lib/api'
import { FilterSelect } from '../common/FilterSelects'
import { useHistory } from 'react-router-dom'

export default function Releaseindex() {
  const history = useHistory()
  const [releases, setReleases] = useState(null)
  const [filteredReleases, setFilteredReleases] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllReleases()
      setReleases(data)
      setFilteredReleases(data)
    }
    getData()
  }, [])

  const handleClick = (table, id) => {
    history.push(`/${table}/${id}`)
  }

  const handleTypeChange = (e) => {
    if (e.target.value === 'All') {
      setFilteredReleases(releases)
    } else {
      setFilteredReleases(releases.filter(release => release.type === e.target.value))
    }
  }

  return (
    <>
      <h1>Releases</h1>
      <FilterSelect
        label="Release Type"
        defaultOption="All"
        options={['Album', 'EP', 'Single']}
        handleChange={handleTypeChange}
      />
      <div className="artist-index">
        {filteredReleases && 
          filteredReleases.map(release => (
            <DisplayCard
              key={release.name}
              handleClick={handleClick}
              table="releases"
              {...release}
            />
          ))
        }
      </div>
    </>
  )
}
