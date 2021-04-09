import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../header';
import CharList from '../char-list';
import CharPage from '../char-page';
import AddOwnCharacter from '../add-own-character';
import './app.scss';



const App = () => {
    const[theme, setTheme] = useState(localStorage.getItem("theme"));

    const themeClick = () => {
        const newTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme)
    }
    return (
        <div className={`app ${theme ? theme : "dark"}`}>
            <Header themeClick={themeClick}/>
            <main role="main">
                <Switch>
                    <Route 
                        path="/"
                        component={CharList} 
                        exact />
                    <Route 
                        path="/add"
                        component={AddOwnCharacter} />
                    <Route 
                        path="/:id"
                        children={<CharPage />} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
