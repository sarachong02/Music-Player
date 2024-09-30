import React from 'react'
import "./SongCard.css"
import AlbumImage from "../../components/SongCard/AlbumImage";
import AlbumInfo from "../../components/SongCard/AlbumInfo";

const SongCard = ({album}) => {
  return (
    <div className='songcard-body flex'>
        <AlbumImage url={album?.images[0]?.url}/>
        <AlbumInfo album={album}/>
    </div>
  )
}

export default SongCard