import React from 'react';

import './header.scss'
const Header = ({themeClick}) => {

    return (
        <div >
            <button className="btn theme-btn" onClick={() => themeClick()}>Change theme</button>
        </div>
    );
};

export default Header;