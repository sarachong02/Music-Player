// FeedCard.js
import React from 'react';
import "./FeedCard.css";
import WidgetEntry from '../Widgets/WidgetEntry';

const FeedCard = ({ title, items, type }) => { 
  return (
    <div className='feedcard-body'>
      <div className='title-container'>
        <p className='widget-title'>{title}</p>
      </div>
      <div 
        className={`entries-container ${type === 'recommendations' ? 'recommendations-container' : ''}`}
      >
        {items.map((item, index) => {
          const commonProps = {
            key: index,
            className: 'feed-specific',
            title: item?.name,
          };

          if (type === 'newReleases') {
            return (
              <WidgetEntry
                {...commonProps}
                subtitle={item?.artists?.[0]?.name}
                image={item?.images?.[2]?.url}
              />
            );
          } else if (type === 'featuredPlaylists') {
            return (
              <WidgetEntry
                {...commonProps}
                subtitle={`${item?.tracks?.total} Songs`}
                image={item?.images?.[0]?.url}
              />
            );
          } else if (type === 'recommendations') {
            return (
              <WidgetEntry
                {...commonProps}
                subtitle={`${item?.artists?.[0]?.name}`}
                image={item?.album?.images?.[0]?.url}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FeedCard;
