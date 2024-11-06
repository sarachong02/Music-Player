import React, { useState, useEffect } from 'react';
import "./PlaylistContainer.css";
import apiClient from '../../spotify';
import WidgetCard from '../Widgets/WidgetCard';
import FeedCard from '../FeedCard/FeedCard';

const PlaylistContainer = ({ type }) => {
    const [items, setItems] = useState([]);

    // Function to determine the number of items based on screen width
    const getItemsLimit = () => {
        const width = window.innerWidth;
        if (width > 1200) return 10; // Large screens
        if (width > 768) return 6;   // Medium screens
        return 3;                    // Small screens
    };

    useEffect(() => {
        const fetchData = async () => {
            const limit = getItemsLimit();

            try {
                if (type === "newReleases") {
                    const res = await apiClient.get(`/browse/new-releases`);
                    setItems(res.data?.albums?.items.slice(0, limit));
                } else if (type === "featuredPlaylists") {
                    const res = await apiClient.get(`/browse/featured-playlists`);
                    setItems(res.data?.playlists?.items.slice(0, limit));
                } else if (type === 'recommendations') {
                    const res = await apiClient.get(`/recommendations?seed_genres=pop&limit=${limit-2}`);
                    setItems(res.data?.tracks.slice(0, limit-1));
                }
            } catch (err) {
                console.error(err);
            }
        };
        
        fetchData();

        // Re-run the fetch when window resizes to update the item count
        const handleResize = () => fetchData();
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [type]);

    const title = type === "newReleases"
        ? "New Releases"
        : type === "featuredPlaylists"
        ? "Featured Playlists"
        : "Recommendations";

    return (
        <div className='playlist-container'>
            <FeedCard
                title={title}
                items={items}
                type={type}
            />
        </div>
    );
};

export default PlaylistContainer;
