import { VideoItem } from "../VideoItem/VideoItem.jsx";
import { Loading } from "../Loading/Loading.jsx";

import "./VideoList.css";

export const VideoList = ({ videoList, savedVideos, handleSaveVideo, loading }) => {
    if (loading) return <Loading />;

    return (
        <div className="video-list">
            {
                videoList.map((video) => {
                    const videoId = video.id?.videoId || video.videoId;
                    const isSaved = savedVideos.some(
                        (v) => (v.id?.videoId || v.videoId) === videoId
                    );

                    return (
                        <VideoItem
                            key={videoId}
                            video={video}
                            isSaved={isSaved}
                            onSave={handleSaveVideo}
                        />

                    );
                })
            }
        </div>
    );
};
