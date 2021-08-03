export default function GigCard({ handleCardClick, id, name, headliner, supportArtists, venue, price, dateTime }) {
  return (
    <div onClick={() => handleCardClick(id)} key={id} className="gig-card">
      <img className="logo" src={headliner.logo} />
      <div className="left-half">
        <h3>{name}</h3>
        <ul className="acts">
          <h4>{headliner.name}</h4>
          {supportArtists.map(artist => (
            <li key={artist.name}>{artist.name}</li>
          ))}
        </ul>
      </div>
      <div className="right-half">
        <h3>{venue.name}</h3>
        <h5>{price == 0 ? 'Free Entry' : `£${price}`}</h5>
        <h4>{new Date(dateTime).toLocaleString(('en-US'))}</h4>
      </div>
    </div>
  )
}