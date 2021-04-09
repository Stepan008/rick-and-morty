import React from 'react';
import { Link } from 'react-router-dom';

import './char-list-item.scss';

const CharListItem = ({ character }) => {

    return (
        <article className="char-card">
            <div className="char-card-img">
                <img src={character.image} alt={character.name}/>
            </div>
            <div className="char-card-details">
                <div className="section">
                    <Link className="char-info" to={"/" + character.id}>
                        <h2>
                            {character.name}
                        </h2>
                    </Link>
                    <span className="status">
                        <span className={`status-icon ${character.status.toLowerCase()}`}></span>
                        {character.status + ' '}
                         - 
                        {' ' + character.species}
                    </span>
                </div>
                <div className="section">
                    <span className="text-gray">Gender:</span>
                    <span className="char-info gender">{character.gender}</span>
                </div>
                <div className="section">
                    <span className="text-gray">Last known location:</span>
                    <span className="char-info">{character.location.name}</span>
                </div>
            </div>
        </article>
    )
}

export default CharListItem;