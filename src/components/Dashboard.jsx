import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"


const BEURL = import.meta.env.VITE_BEURL;

const Dashboard = () => {
    const [stats, setStats] = useState({ urlsToday: 0, urlsThisMonth: 0 });
    const [allUrls, setAllUrls] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${BEURL}/api/urls/stats`);
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        const fetchAllUrls = async () => {
            try {
                const res = await fetch(`${BEURL}/api/urls/all`);
                const data = await res.json();
                setAllUrls(data);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }
        };

        fetchStats();
        fetchAllUrls();
    }, []);

    return (
        <div className="compdiv">
            <h2>Dashboard</h2>
            <p>Total URLs created today: {stats.urlsToday}</p>
            <p>Total URLs created this month: {stats.urlsThisMonth}</p>
            <div style={{ marginTop: '20px' , textAlign: 'center'}}>
              <button onClick={() => navigate('/url-shortener')}>Url Shortener</button>
            </div>
            <h3>All URLs</h3>
            <table style={{width: "100%", justifyContent: "center" }}>
                <thead>
                    <tr>
                        <th>Short URL</th>
                        <th>Long URL</th>
                        <th>Clicks</th>
                        <th>Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {allUrls.map((url) => (
                        <tr key={url._id}>
                            <td><a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
                            <td>{url.longUrl}</td>
                            <td>{url.clicks}</td>
                            <td>{new Date(url.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
