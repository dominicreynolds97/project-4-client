export default function FavoriteCard({ name, logo, artwork, id, handleClick, table }) {
  return (
    <div className="display-card" key={name} onClick={() => handleClick(table, id)}>
      <img className="logo" src={logo || artwork} alt={name}/>
      <h4>{name}</h4>
    </div>
  )
}