import { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";
function Main(props) {

  const [ userName, setUserName ] = useState('Poka Eshe');
  const [ userDescription, setUserDescription ] = useState('Student');
  const [ userAvatar, setUserAvatar ] = useState('https://cdn.shazoo.ru/c240x240/673134_y70gNcM_limp-bizkit-out-of-style-official-music-video-0.jpg');
  const [ cards, setCards ] = useState([]);

  let currentUserId;
 
  useEffect(() => {
    Promise.all([
      api.getCurrentUser(),
      api.getCards()
    ])
    .then(([user, items]) => {
      currentUserId = user._id;
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
      setCards(items);
  })
  .catch((err) => {
    console.log(err);
  })
}, [])


  return (
    <main className="main">
    <section className="profile">
      <button className="profile__avatar-edit-btn" onClick={props.onEditAvatar}>
        <img className="profile__avatar" src={userAvatar} alt="Фотография профиля" />
      </button>
      <h1 className="profile__username">{userName}</h1>
      <p className="profile__subtext">{userDescription}</p>
      <button type="button" className="profile__edit-btn"onClick={props.onEditProfile}></button>
      <button type="button" className="profile__add-btn" onClick={props.onAddPlace}></button>
    </section>
    <section className="posts" aria-label="Галерея">
      {cards.map(card => {
        return (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
          />
        )
        })}
    </section>
  </main>
  )
}

export default Main;