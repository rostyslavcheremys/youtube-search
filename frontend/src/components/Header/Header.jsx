import FavoriteIcon from '@mui/icons-material/Favorite';

import { Search } from "../Search/Search.jsx";

import "./Header.css";

export const Header = ({ query, setQuery, setActiveTab, onSaved, onSearch }) => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo" onClick={setActiveTab}>
                    <img className="youtube__logo" src="/youtube_logo.png" alt=""/>
                </div>

                <div className="header__label-wrapper" onClick={setActiveTab}>
                    <h1 className="header__label">YouTube</h1>
                </div>
            </div>

            <Search query={query} setQuery={setQuery} onSearch={onSearch}/>

            <div className="header__favorite">
                <FavoriteIcon className="favorite" onClick={onSaved}/>
            </div>
        </header>
    );
}