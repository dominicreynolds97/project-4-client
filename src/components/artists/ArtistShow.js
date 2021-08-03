import { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleArtist, favorite } from '../../lib/api'
import { checkFavorite } from '../../hooks/checkFavorite'
import { UserContext } from '../../context/UserContext'
import FavoriteRow from '../account/FavoriteRow'
import EditArtistForm from './EditArtistForm'

export default function ArtistShow() {
  const { user } = useContext(UserContext)
  const [artist, setArtist] = useState(null)
  const [editing, setEditing] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [releases, setReleases] = useState({
    albums: [],
    eps: [],
    singles: [], 
  })
  const { id } = useParams()
  const history = useHistory()
  console.log(id)

  useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleArtist(id)
      setArtist(data)
      setFavorited(checkFavorite(data))
      setReleases({
        albums: data.releases.filter(release => release.type === 'Album'),
        eps: data.releases.filter(release => release.type === 'EP'),
        singles: data.releases.filter(release => release.type === 'Single'),
      })
    }
    getData()
  }, [id])

  console.log(releases)

  const handleFavorite = async () => {
    await favorite('artists', id)
    setFavorited(!favorited)
  }

  const handleClick = (table, id) => {
    history.push(`/${table}/${id}`)
  }

  const handleGenreClick = (genreId) => {
    console.log(genreId)
  }

  const handleEdit = () => {
    setEditing(!editing)
  }

  const createRelease = () => {
    history.push(`/artists/${artist.id}/create-release`)
  }

  return (
    <>
      {(artist && !editing) ?
        <div className="artist-show">

          <div className="cover">
            <img className="logo" src={artist.logo}/>
            <div className="info">
              <h1>{artist.name}</h1>
              <h3>{artist.location}</h3>
              <h4 className="genres">{artist.genres.map(genre => <span className="pointer" onClick={() => handleGenreClick(genre.id)} key={genre.name}>{genre.name}</span>)}</h4>
              <p>{artist.description}</p>
            </div>
          </div>
          <div className="middle-card">
            <ul>
              {artist.musicians.map(member => <li key={member.name}>{member.name}</li>)}
            </ul>
            <div className="favorite">
              <label>Favorites: {artist.favoritedBy.length}</label>
              <button 
                onClick={handleFavorite} 
                className={`${favorited ? '' : 'not-'}favorited`}
              >
                Favorite{favorited && 'd'}
              </button>
              {user && user.id === artist.owner &&
                <>
                  <button
                    onClick={handleEdit}
                  >Edit</button>
                  <button
                    onClick={createRelease}
                  >Add a Release</button>
                </>
              }
            </div>
          </div>
          <div className="releases">
            {releases.albums.length > 0 && 
              <>
                <label>Albums</label>
                <FavoriteRow
                  props={releases.albums}
                  handleClick={handleClick}
                  table="releases"
                />
              </>
            }
            {releases.eps.length > 0 && 
              <>
                <label>EPs</label>
                <FavoriteRow
                  props={releases.eps}
                  handleClick={handleClick}
                  table="releases"
                />
              </>
            }
            {releases.singles.length > 0 &&
              <>
                <label>Singles</label>
                <FavoriteRow
                  props={releases.singles}
                  handleClick={handleClick}
                  table="releases"
                />
              </>
            }
          </div>
        </div>
        :
        <>
          {editing &&
            <EditArtistForm
              artist={artist}
              setEditing={setEditing}
            />
          }
        </>
      }
    </>
  )
}