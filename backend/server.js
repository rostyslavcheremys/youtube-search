import express from "express";
import fetch from "node-fetch";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
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

        for (const item of data.items) {
            const videoId = item.id.videoId;
            const { title, description, channelTitle, publishedAt, thumbnails } = item.snippet;

            await db.run(
                `INSERT OR IGNORE INTO videos 
                (videoId, title, description, channelTitle, publishedAt, thumbnailUrl) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    videoId,
                    title,
                    description,
                    channelTitle,
                    publishedAt,
                    thumbnails.default.url,
                ]
            );
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
