import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from '../context/CurrentUserContext';
import { useState, useEffect } from 'react';

function App() {

  const [ isAddPlacePopupOpen, isSetAddPlacePopupOpen] = useState(false);
  const [ isEditAvatarPopupOpen, isSetEditAvatarPopupOpen ] = useState(false);
  const [ isEditProfilePopupOpen, isSetEditProfilePopupOpen ] = useState(false);
  const [ selectedCard, setSelectedCard ] = useState({})
  const [ currentUser, setCurrentUser ] = useState({})
  const [ cards, setCards ] = useState([])

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleAddPlaceClick() {
    isSetAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    isSetEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    isSetEditProfilePopupOpen(true);
  };
  
  function closeAllPopups() {
    isSetAddPlacePopupOpen(false);
    isSetEditAvatarPopupOpen(false);
    isSetEditProfilePopupOpen(false);
  
    setSelectedCard({})
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(() => {
        setCards(cards.filter((card) => id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser(data) {
    api.setUserData(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(newCard) {
    api.createCard(newCard)
    .then((res) => {
      console.log(res);
      setCards([res, ...cards]);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    Promise.all([
      api.getCurrentUser(),
      api.getCards()
    ])
      .then(([user, items]) => {
        setCurrentUser(user);
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      })
    }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main 
          cards={cards}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />
        <Footer />
       

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
        /> 

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
