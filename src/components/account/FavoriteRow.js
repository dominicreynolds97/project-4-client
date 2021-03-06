import DisplayCard from '../artists/DisplayCard'

export default function FavoriteRow({ props, handleClick, table }) {
  return (
    <div className="favorite-row">
      {props.reverse().map(card => (
        <DisplayCard
          key={card.name}
          {...card}
          handleClick={handleClick}
          table={table}
          cardType="fixed"
        />
      ))}
    </div>
  )
}