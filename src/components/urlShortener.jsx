import { useState } from 'react';
import { useNavigate } from "react-router-dom"

const BEURL = import.meta.env.VITE_BEURL;

function UrlShortener() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const navigate = useNavigate();

    const handleShortenUrl = async () => {
        try {
            const response = await fetch(`${BEURL}/api/shorten`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ longUrl }),
            });
            const data = await response.json();
            setShortUrl(data.shortUrl); // Display the short URL
        } catch (error) {
            console.error('Error creating short URL:', error);
        }
    };

    return (
        <div >
            <h2 style={{ textAlign: 'center' }}>URL Shortener</h2>
            <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Enter a long URL"
            />
            <button onClick={handleShortenUrl}>Shorten URL</button>
            {shortUrl && (
                <div>
                    <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>
                </div>
            )}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            </div>
        </div>
    );
}

export default UrlShortener;

