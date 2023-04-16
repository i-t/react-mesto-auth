function Card({ card, onCardClick }) {

  function handleClick() {
    console.log(onCardClick)
    console.log(card)
    onCardClick(card);
  } 

  return (
    <article className="post">
      <button type="button" className="post__del-btn"></button>
      <span className="post__photo-container" onClick={handleClick}>
        <img className="post__photo" src={card.link} alt={card.name} />
      </span>
      <h2 className="post__title">{card.name}</h2>
      <button type="button" className="post__like-btn">{card.likes.length}</button>
    </article>
  )
}

export default Card;