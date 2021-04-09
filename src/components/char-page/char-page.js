import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { withRamService } from '../hoc-helpers';

import './char-page.scss';
const CharPage = ({ramService}) => {

    const { id } = useParams();

    const[char, setChar] = useState();

    useEffect(() => {
        ramService.getChar(id)
            .then((data) => {
                setChar(data);
                console.log(data);
            });
    }, []);

    if(char) {
        return(
            <div className="character-page">
                <div className="character-info">
                    <div className="character-image">
                        <img src={char.image} alt={char.name} />
                    </div>
                    <div className="character-details">
                        <div className="section">
                            <span className="character-name">
                                {char.name}
                            </span>
                            <span className="character-status">
                                <span className={`status-icon ${char.status.toLowerCase()}`}></span>
                                {char.status + ' '}
                                - 
                                {' ' + char.species}
                            </span>
                        </div>
                        <div className="section">
                        <span className="episodes-lable">
                                    Episodes:
                                </span>
                            <div className="charracter-episodes">
                                
                                <ul>
                                    {
                                        char.episode.map((episode) => {
                                            return <li key={episode}><a href={episode}>{episode}</a></li>;
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
    else {
        return(
            <div>
                loading...
            </div>
        )
    }
    
};

export default withRamService()(CharPage);