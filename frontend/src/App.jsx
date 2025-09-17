import { useState, useEffect } from "react";

import { Header } from "./components/Header/Header.jsx";

function App() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [savedVideos, setSavedVideos] = useState([]);
    const [activeTab, setActiveTab] = useState("search");

    const handleSearch = async () => {
        if (!query.trim()) {
            alert("Введіть пошуковий запит!");
            return;
        }
        try {
            const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setSearchResults(Array.isArray(data) ? data : data.items || []);
            setActiveTab("search");
        } catch (error) {
            console.error("Error fetching search:", error);
            setSearchResults([]);
        }
    };

    const handleSaved = () => setActiveTab("saved");

    const handleSaveVideo = async (video) => {
        if (!savedVideos.some(v => (v.id?.videoId || v.videoId) === (video.id?.videoId || video.videoId))) {
            setSavedVideos([...savedVideos, video]);
        }

        try {
            await fetch("http://localhost:3000/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(video),
            });
        } catch (err) {
            console.error("Не вдалося зберегти відео на сервері", err);
        }
    };

    const videosToDisplay = activeTab === "search" ? searchResults : savedVideos;

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const res = await fetch("http://localhost:3000/saved");
                const data = await res.json();
                setSavedVideos(data);
            } catch (err) {
                console.error("Не вдалося завантажити збережені відео", err);
            }
        };
        fetchSaved();
    }, []);

    return (
        <div className="app">
            <Header
                query={query}
                setQuery={setQuery}
                onSaved={handleSaved}
                onSearch={handleSearch}
            />



            <div style={{marginTop: "20px"}}>
                {videosToDisplay.length === 0 && <p>Немає відео для відображення</p>}
                {videosToDisplay.map((v, index) => {
                    const videoId = v.id?.videoId || v.videoId;
                    const snippet = v.snippet || v;

                    if (!videoId || !snippet) return null;

                    const isSaved = savedVideos.some(
                        vid => (vid.id?.videoId || vid.videoId) === videoId
                    );

                    return (
                        <div key={videoId || index} style={{marginBottom: "20px", position: "relative"}}>
                            <a
                                href={`https://youtube.com/watch?v=${videoId}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={snippet.thumbnails?.medium?.url || snippet.thumbnailUrl}
                                    alt={snippet.title}
                                />
                                <h3>{snippet.title}</h3>
                            </a>
                            <p>
                                <b>{snippet.channelTitle}</b> –{" "}
                                {snippet.publishedAt && !isNaN(Date.parse(snippet.publishedAt))
                                    ? new Date(snippet.publishedAt).toDateString()
                                    : "Дата недоступна"}
                            </p>
                            <p>{snippet.description}</p>
                            {activeTab === "search" && (
                                <button
                                    onClick={() => handleSaveVideo(v)}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        fontSize: "20px",
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        color: isSaved ? "red" : "gray"
                                    }}
                                >
                                    ♥
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
