import FavoriteIcon from '@mui/icons-material/Favorite';

import "./Header.css";
import { Search } from "../Search/Search.jsx";

export const Header = ({ query, setQuery, onSaved, onSearch }) => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header__logo">
                    <img className="youtube__logo" src="../../../public/youtube_logo.png" alt=""/>
                </div>

                <div className="header__label-wrapper">
                    <h1 className="header__label">YouTube</h1>
                </div>
            </div>

            <Search query={query} setQuery={setQuery} onSearch={onSearch}/>

            <div className="header__favorite-icon">
                <FavoriteIcon className="favorite-icon" onClick={onSaved}/>
            </div>
        </header>
    );
}