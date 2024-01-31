import React from 'react'
import "../styles/Listing.css"

const UserNfts = ({image,name,address,collection}) => {
    return (
        <div class="card">
            <div class="container">
                <div className='imagebox' style={{backgroundImage: `url("${image != undefined? image : "hahhahh"}")`}}></div>
                <div className='nftcontent'>
                    <div className='title'>{name}</div>
                    <div className='subtitle'>{collection}</div>
                    <div className='subtxt'>
                        <label>Address: {address}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserNfts