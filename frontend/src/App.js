import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Import CSS file

const App = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [clicks, setClicks] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const fetchAnalytics = async (shortCode) => {
      try {
          const response = await axios.get(`http://localhost:5000/api/url/analytics/${shortCode}`);
          setClicks(response.data.clicks);
      } catch (error) {
          console.error("Error fetching analytics:", error);
      }
  };

    const handleShorten = async () => {
        if (!originalUrl.trim()) return;
        try {
            const response = await axios.post("http://localhost:5000/api/url/shorten", { originalUrl });
            setShortUrl(`http://localhost:5000/api/url/${response.data.shortUrl}`);
            fetchAnalytics(response.data.shortUrl); 
        } catch (error) {
            console.error("Error shortening URL:", error);
        }
    };
    


    return (
        <div className={`container ${darkMode ? "dark-mode" : ""}`}>
            <h1>🔗 URL SHORTener</h1>
             {/* Dark Mode Toggle Button */}
             <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>


            <div className="input-container">
                <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Enter URL..."
                />
                <button onClick={handleShorten}>Shorten</button>
            </div>

            {shortUrl && (
                <div className="result">
                    <p>Shortened URL:</p>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                    {clicks !== null && <p>👀 Clicks: {clicks}</p>}
                </div>
            )}
        </div>
    );
};

export default App;
