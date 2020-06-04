import React from "react";
import "./menu-item.styles.scss";

const MenuItem = ({ section }) => {
  const { title, size, imageUrl } = section;

  return (
    <div className={`${size} menu-item`}>
      <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }}/>
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
