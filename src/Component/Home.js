import React from "react";
import Note from "./Note";
import PropTypes from 'prop-types'
export const Home = (props) => {
  return (
    <div>
      <Note showAlert={props.showAlert} />
    </div>
  );
}
Home.propTypes = {
  showAlert: PropTypes.func.isRequired,
};
export default Home;
