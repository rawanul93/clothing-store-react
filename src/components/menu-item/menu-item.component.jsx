import React from "react";
import { withRouter } from 'react-router-dom';
import "./menu-item.styles.scss";

const MenuItem = ({ title, size, imageUrl, linkUrl, history, match }) => {

  return (
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)} >  {/*we're doing match.url first because we wont be sure of where we will be before we push to a certain url. So we first take the current url the user is in and then add in the the linkUrl that will take us to the appropritate page */}
      <div className='background-image' style={{ backgroundImage: `url(${imageUrl})`}}/>
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
