import React from "react";
import "./directory.styles.scss";
//components
import MenuItem from "../menu-item/menu-item.component";


//redux and actions
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from "../../redux/directory/directory.selector";


const mapState = createStructuredSelector({
  sections: selectDirectorySections //automatically passing in state and the selector extracts the sections from the directory reducer.
})

const Directory = ({ sections }) => {

  return (
    <div className='directory-menu'>
      {sections.map(({id, ...otherSectionProps}) => (
        <MenuItem key={id} {...otherSectionProps}/>
      ))}
    </div>
  )
}
export default connect(mapState)(Directory);
