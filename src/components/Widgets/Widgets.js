// import React, {useState, useEffect} from 'react';
// import "./Widgets.css";
// import apiClient from '../../spotify';
// import WidgetCard from './WidgetCard';

// const Widgets = ({type}) => {
//     const [similar, setSimilar] = useState([]);

//     useEffect(() => {
//         if (type) {
//             apiClient.get(`/artists/${type}/related-artists`)
//             .then(res => {
//                 const a = res.data?.artists.slice(0,3);
//                 setSimilar(a);
//             })
//             .catch(err => console.error(err));
//         }
//     },[type]);

//   return (
//     <div className='widgets-body flex'>
//         {/* <WidgetCard type='Similar Artists' similar={similar} /> */}
//         <WidgetCard
//                 title={type === "similarArtists" ? "Similar Artists" : "Similar Artists"}
//                 similar={similar}
//         />
//     </div>
//   )
// }

// export default Widgets

// src/components/Widgets/Widgets.js
import React, { useState, useEffect } from 'react';
import "./Widgets.css";
import apiClient from '../../spotify';
import WidgetCard from './WidgetCard';

const Widgets = ({ artistID }) => {
    const [similarArtists, setSimilarArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);

    useEffect(() => {
        if (artistID) {
            apiClient.get(`/artists/${artistID}/related-artists`)
                .then(res => setSimilarArtists(res.data?.artists.slice(0, 3)))
                .catch(err => console.error(err));

            apiClient.get(`/artists/${artistID}/top-tracks`)
                .then(res => setTopTracks(res.data?.tracks.slice(0,3)))
                .catch(err => console.log(err))
        }
    }, [artistID]);

    return (
        <div className='widgets-body flex'>
            <WidgetCard title="Similar Artists" items={similarArtists} type="similarArtists" />
            <WidgetCard title="Top Tracks From This Artist" items={topTracks} type="topTracks" />
        </div>
    );
};

export default Widgets;
