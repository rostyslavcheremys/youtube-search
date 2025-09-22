import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header.jsx";
import { VideoList } from "./components/VideoList/VideoList.jsx";
import { Footer } from "./components/Footer/Footer.jsx";

function App() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [savedVideos, setSavedVideos] = useState([]);
    const [activeTab, setActiveTab] = useState("search");
    const [loading, setLoading] = useState(false);

    const videoList = activeTab === "search" || searchResults.length > 0 ? searchResults : savedVideos;

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setActiveTab("search");
        try {
            const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setSearchResults(Array.isArray(data) ? data : data.items || []);
        } catch (err) {
            console.error("Failed to fetch videos", err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleFavorite = async (video) => {
        const videoId = video.id?.videoId || video.videoId;
        const snippet = video.snippet || video;

        if (!videoId) return;

        const videoData = {
            videoId,
            title: snippet.title,
            channelTitle: snippet.channelTitle,
            publishedAt: snippet.publishedAt,
            thumbnailUrl: snippet.thumbnails?.default?.url || snippet.thumbnailUrl || "",
        };

        const isAlreadySaved = savedVideos.some((v) => v.videoId === videoId);

        if (isAlreadySaved) {
            setSavedVideos(savedVideos.filter((v) => v.videoId !== videoId));
            try {
                await fetch(`http://localhost:3000/delete/${videoId}`, {
                    method: "DELETE",
                });
            } catch (err) {
                console.error("Failed to delete video from the server", err);
            }
        } else {
            setSavedVideos([...savedVideos, videoData]);
            try {
                await fetch("http://localhost:3000/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(videoData),
                });
            } catch (err) {
                console.error("Failed to save video on the server", err);
            }
        }
    };

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const res = await fetch("http://localhost:3000/saved");
                const data = await res.json();
                setSavedVideos(data);
            } catch (err) {
                console.error("Failed to load saved videos", err);
            }
        };
        fetchSaved();
    }, []);

    return (
        <div className="app">
            <Header
                query={query}
                setQuery={setQuery}
                setActiveTab={() => {
                    setActiveTab("search");
                    setSearchResults([]);
                    setQuery("");
                }}
                onSaved={() => {
                    setActiveTab("saved");
                    setSearchResults([]);
                    setQuery("");
                }}
                onSearch={handleSearch}
            />

            <VideoList
                videoList={videoList}
                savedVideos={savedVideos}
                handleSaveVideo={handleToggleFavorite}
                loading={loading}
            />

            {videoList.length !== 0 && <Footer />}
        </div>
    );
}

export default App;