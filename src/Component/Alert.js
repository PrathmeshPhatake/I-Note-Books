import React from 'react';
import PropTypes from 'prop-types'
function Alert(props) {
  const capitalize = (word) => {
    if (word) {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return '';
  };

  return (
    props.alert && <div className={`alert alert-warning alert-dismissible fade show`} style={{position:'absolute',width:'100%',height:'6.2%',top:'1'}} role="alert">
    <strong>{props.alert.type}</strong> : {props.alert.message}
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  );
}

export default Alert;
