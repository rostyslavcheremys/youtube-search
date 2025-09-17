import { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "./FavoriteButton.css";

export const FavoriteButton = ({ isSaved, onSave }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="favorite-button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onSave}
        >
            {isSaved || hover ? (
                <FavoriteIcon className={`favorite-icon ${isSaved ? "saved" : ""}`} />
            ) : (
                <FavoriteBorderIcon className="favorite-icon" />
            )}
        </div>
    );
};
