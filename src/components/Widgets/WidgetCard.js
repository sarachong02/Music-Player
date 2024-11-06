import React from 'react';
import "./WidgetCard.css";
import WidgetEntry from './WidgetEntry';
import { IconContext } from 'react-icons';

const WidgetCard = ({title, items, type}) => { 

  return (
    <div className='widgetcard-body'>
        <p className='widget-title'>{title}</p>
        {
        items.map((item, index) => {
            if (type === 'similarArtists') {
                return (
                    <WidgetEntry
                        key={index}
                        title={item?.name}
                        subtitle={`${item?.followers?.total} Followers`}
                        image={item?.images?.[2]?.url}
                    />
                );
            } else if (type === 'featuredPlaylists') {
                return (
                    <WidgetEntry
                        key={index}
                        title={item?.name}
                        subtitle={`${item?.tracks?.total} Songs`}
                        image={item?.images?.[0]?.url}
                    />
                );
            } else if (type === 'topTracks') {
                return (
                    <WidgetEntry
                        key={index}
                        title={item?.name}
                        subtitle={`Popularity: ${item?.popularity}`}
                        image={item?.album?.images?.[0]?.url}
                    />
                )
            } 
            return null;
        })}
        </div>
    );
}

export default WidgetCard