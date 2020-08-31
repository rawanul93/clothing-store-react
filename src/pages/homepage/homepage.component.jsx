import React from "react";
//import './homepage.styles.scss'
import { HomePageContainer } from './homepage.styles';

//components
import Directory from "../../components/directory/directory.component";

const Homepage = () => {
  return (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
  );
};

export default Homepage;
