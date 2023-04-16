import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

function App() {

  const [ isAddPlacePopupOpen, isSetAddPlacePopupOpen] = useState(false);
  const [ isEditAvatarPopupOpen, isSetEditAvatarPopupOpen ] = useState(false);
  const [ isEditProfilePopupOpen, isSetEditProfilePopupOpen ] = useState(false);
  const [ selectedCard, setSelectedCard ] = useState({})

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
    //сброс selectedCard
    setSelectedCard({})
  }

  return (
    <div className="root">
  <Header />
  <Main 
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick} 
    onEditProfile={handleEditProfileClick} 
    onCardClick={handleCardClick}
    />
  <Footer />
  <PopupWithForm 
    name='add_post'
    title='Новое место'
    buttonText='Создать'
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
  >
    <input 
      id="title" 
      name="name" 
      className="popup__input popup__input_add_title" 
      type="text"
      placeholder="Название" 
      minLength="2" 
      maxLength="30" 
      required />
    <span 
      className="title-error popup__text-error">
        Вы пропустили это поле.
    </span>
    <input 
      id="photo" 
      name="link" 
      className="popup__input popup__input_add_photo" 
      type="url" 
      placeholder="Ссылка на изображение" 
      required 
    />
    <span 
      className="photo-error popup__text-error">
        Введите ссылку на изображение.</span>
  </PopupWithForm>

  <PopupWithForm 
    title='Обновить аватар'
    name='edit_avatar'
    buttonText='Сохранить'
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    >
    <input 
      id="avatar" 
      name="avatar" 
      className="popup__input popup__input_edit_avatar" 
      type="url"
      placeholder="Ссылка на изображение" 
      required 
    />
    <span 
      className="avatar-error popup__text-error">
        Введите ссылку на изображение.
    </span>
  </PopupWithForm>

  <PopupWithForm 
    title='Редактировать профиль'
    name='edit_profile'
    buttonText='Сохранить'
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}
    >
    <input 
      id="username" 
      name="name" 
      className="popup__input popup__input_edit_username" 
      type="text" 
      placeholder="Имя"
      minLength="2" 
      maxLength="40" 
      required
    />
    <span 
      className="username-error popup__text-error">
        Вы пропустили это поле.
      </span>
    <input 
      id="subtext" 
      name="about" 
      className="popup__input popup__input_edit_subtext" 
      type="text" 
      placeholder="Описание" 
      minLength="2" 
      maxLength="200" 
      required
    />
    <span 
      className="subtext-error popup__text-error">
        Вы пропустили это поле.
    </span>
  </PopupWithForm>

  <ImagePopup 
    card={selectedCard}
    onClose={closeAllPopups}
  />
</div>
  );
}

export default App;
