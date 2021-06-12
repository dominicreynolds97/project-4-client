export default function FavoriteCard({ name, logo, artwork, id, handleClick }) {
  return (
    <div className="favorite-card" key={name} onClick={() => handleClick('releases', id)}>
      <img className="logo" src={logo || artwork} alt={name}/>
      <h4>{name}</h4>
    </div>
  )
}