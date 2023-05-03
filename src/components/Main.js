import React from "react";
// import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  // const [ cards, setCards ] = useState([]);
  // let currentUserId = currentUser._id;

//   useEffect(() => {
//     .then((items) => {
//       console.log(currentUser);
//       setCards(items);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }, [])

  return (
    <main className="main">
    <section className="profile">
      <button className="profile__avatar-edit-btn" onClick={props.onEditAvatar}>
        <img className="profile__avatar" src={currentUser.avatar} alt="Фотография профиля" />
      </button>
      <h1 className="profile__username">{currentUser.name}</h1>
      <p className="profile__subtext">{currentUser.about}</p>
      <button type="button" className="profile__edit-btn"onClick={props.onEditProfile}></button>
      <button type="button" className="profile__add-btn" onClick={props.onAddPlace}></button>
    </section>
    <section className="posts" aria-label="Галерея">
      {props.cards.map(card => {
        return (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        )
        })}
    </section>
  </main>
  )
}

export default Main;