import FavoriteCard from './FavoriteCard'

export default function FavoriteRow({ props, handleClick }) {
  return (
    <div className="favorite-row">
      {props.map(card => (
        <FavoriteCard
          key={card.name}
          {...card}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}