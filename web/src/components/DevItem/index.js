import React from 'react';
import { MdClose } from 'react-icons/md';

import './styles.css';

function DevItem({ onClickDeleteIcon, dev }) {
  async function handleClickDeleteIcon() {
    await onClickDeleteIcon(dev._id);
  }

  return (
    <li className='dev-item'>
      <div className='delete-icon'>
        <MdClose onClick={handleClickDeleteIcon} size={24} />
      </div>
      <header>
        <img src={dev.avatarUrl} alt={dev.name} />
        <div className='user-info'>
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.githubUsername}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

export default DevItem;
