import { Modal } from '@material-ui/core';
import React, { useState, useEffect } from 'react'


import "./Banner.scss"

function Banner({bannerTitle,bannerDescription,bannerVideo,bannerImage}) {
  const [open,setOpen]= useState(false);




  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
        ${bannerImage}
        )`,
        backgroundPosition: "center center"
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
         {bannerTitle}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button" onClick={() => setOpen(true)}>Play</button>
      
        </div>
        <h1 className="banner_description">{bannerDescription}</h1>
      </div>

      <div className="banner--fadeBottom" />
      <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
<iframe width="700" height="500" src={bannerVideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</Modal>
    </header>

  )
}

export default Banner
