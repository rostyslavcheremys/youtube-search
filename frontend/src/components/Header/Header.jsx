import FavoriteIcon from '@mui/icons-material/Favorite';

import "./Header.css";
export const Header = () => {
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

            <div className="header__favorite-icon">
                <FavoriteIcon className="favorite-icon" />
            </div>
        </header>
    );
}