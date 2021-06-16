import React, { useEffect, useState } from 'react';
import {api} from '../utils/Api.js';

function Main(props) {
  
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
  }, []);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})`}}>
          <div className="profile__avatar-edit" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__job">{userDescription}</p>
          <button onClick={props.onEditProfile} aria-label="Редактировать" type="button" className="profile__edit-button"/>
        </div>
        <button onClick={props.onAddPlace} aria-label="Добавить" type="button" className="profile__add-button"/>
      </section> 
      <section className="places">
        <ul className="places__list"></ul>
      </section>
    </main>
  )
}

export default Main;