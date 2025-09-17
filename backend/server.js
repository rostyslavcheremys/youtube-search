import express from "express";
import fetch from "node-fetch";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = 3000;

const db = await open({
    filename: "./db/saved.db",
    driver: sqlite3.Database,
});

app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Missing query param q" });

    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(
        query
    )}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items) {
            return res.status(500).json({ error: "No items returned", details: data });
        }

        res.json(data.items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch from YouTube API" });
    }
});

app.get("/saved", async (req, res) => {
    const videos = await db.all("SELECT * FROM videos");
    res.json(videos);
});

app.post("/save", async (req, res) => {
    const { videoId, title, channelTitle, publishedAt, thumbnailUrl } = req.body;

    if (!videoId) return res.status(400).json({ error: "Missing videoId" });

    try {
        await db.run(
            `INSERT OR IGNORE INTO videos 
            (videoId, title, channelTitle, publishedAt, thumbnailUrl) 
            VALUES (?, ?, ?, ?, ?)`,
            [videoId, title, channelTitle, publishedAt, thumbnailUrl]
        );
        res.status(201).json({ message: "Video saved" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save video" });
    }
});

app.delete("/delete/:videoId", async (req, res) => {
    const { videoId } = req.params;
    try {
        await db.run("DELETE FROM videos WHERE videoId = ?", [videoId]);
        res.json({ message: "Video deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete video" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
