import { FavoriteButton } from "../FavoriteButton/FavoriteButton.jsx";

import "./VideoItem.css";

export const VideoItem = ({ video, isSaved, onSave }) => {
    const videoId = video.id?.videoId || video.videoId;
    const snippet = video.snippet || video;

    if (!videoId || !snippet) return null;

    const openVideo = () => {
        window.open(`https://youtube.com/watch?v=${videoId}`, "_blank");
    };

    return (
        <div className="video-item">
            <div className="video-item__image" onClick={openVideo}>
                <img
                    className="video-item__thumbnail"
                    src={snippet.thumbnails?.medium?.url || snippet.thumbnailUrl}
                    alt={snippet.title}
                />
            </div>

            <div className="video-item__container">
                <div className="video-item__details" onClick={openVideo}>
                    <h3 className="video-item__title">{snippet.title}</h3>

                    <h4 className="video-item__channel">{snippet.channelTitle}</h4>

                    <h5 className="video-item__date">
                        {snippet.publishedAt && !isNaN(Date.parse(snippet.publishedAt))
                            ? new Date(snippet.publishedAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                            : "Date unavailable"
                        }
                    </h5>
                </div>

                <FavoriteButton
                    isSaved={isSaved}
                    onSave={() => onSave(video)}
                />
            </div>
        </div>
    );
};
