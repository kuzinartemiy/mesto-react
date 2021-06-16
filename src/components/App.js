import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';


function App() {
  
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  }

  const closeAllPopups = () => {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
  }

  return(
    <div className="page">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <PopupWithForm 
        title='Редактировать профиль' 
        name='profile-edit' 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input required name="inputName" type="text" placeholder="Имя" className="popup__input popup__input_field_name" minLength="2" maxLength="40"/>
        <span className="popup__input-error"/>
        <input required name="inputJob" type="text" placeholder="Вид деятельности" className="popup__input popup__input_field_job" minLength="2" maxLength="200"/>
        <span className="popup__input-error"/>
      </PopupWithForm>
      <PopupWithForm 
        title='Новое место' 
        name='add-card' 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input required name="newCardName" type="text" placeholder="Название" className="popup__input popup__input_field_card-name" minLength="2" maxLength="30"/>
        <span className="popup__input-error"/>
        <input required name="newCardLink" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_field_card-link"/>
        <span className="popup__input-error"/>
      </PopupWithForm>
      <PopupWithForm 
        title='Обновить аватар' 
        name='edit-avatar' 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input required name="newCardLink" type="url" placeholder="Ссылка на новый аватар" className="popup__input popup__input_field_avatar-link"/>
        <span className="popup__input-error"/>
      </PopupWithForm>
      {/* <PopupWithForm title='Вы уверены?' name='delete-card' isOpen={isEditAvatarPopupOpen} /> */}
      <Footer />

      {/* template */}
      <template className="place__template">
        <li className="place">
          <button aria-label="Удалить" type="button" className="place__delete"></button>
          <img src="#" alt="Фотография" className="place__image"/>
          <div className="place__info">
            <h2 className="place__title"></h2>
            <div className="place__likes">
              <button aria-label="Нравится" type="button" className="place__like"></button>
              <span className="place__like-count"></span>
            </div>
          </div>
        </li>
      </template>
    </div>
  )
}

export default App;