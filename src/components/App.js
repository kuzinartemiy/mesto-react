import React, { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

import api from '../utils/api.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopup] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData);
      setCards(cards);
    })
    .catch(error => {
      console.log(`Ошибка при получении данных: ${error}`);
    })
  }, []);

  const handleCardClick = (targetCard) => {
    setImagePopup(true);
    setSelectedCard(targetCard);
  };

  const handleDeleteCardClick = (targetCard) => {
    setDeleteCardPopup(true);
    setSelectedCard(targetCard);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setDeleteCardPopup(false);
    setImagePopup(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = ({name, about}) => {
    setIsLoading(true);

    api.setUserInfo({name, about})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(error => {
        console.log(`Ошибка при обновлении данных пользователя: ${error}`);
      });
  };

  const handleUpdateAvatar = ({avatar}) => {
    setIsLoading(true);

    api.setUserAvatar({avatar})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(error => {
        console.log(`Ошибка при обновлении аватара: ${error}`);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(error => {
        console.log(`Ошибка при установке/удалении лайка: ${error}`);
      });
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(i => i._id !== card._id));
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(error => {
        console.log(`Ошибка при удалении карточки: ${error}`);
      });
  };

  const handleAddPlaceSubmit = ({name, link}) => {
    setIsLoading(true);

    api.addCard({name, link})
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(error => {
        console.log(`Ошибка при добавлении новой карточки: ${error}`);
      });
  };
  
  return(
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onImage={handleCardClick}
          onCardDelete={handleDeleteCardClick}
          cards={cards}
          onCardLike={handleCardLike}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
         isOpen={isEditAvatarPopupOpen}
         onClose={closeAllPopups}
         onUpdateAvatar={handleUpdateAvatar}
         isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={selectedCard}
          isLoading={isLoading}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
