import {connect} from 'react-redux'
import React from 'react';
import Map from '../presentationals/map';



const mapStateToProps = state => state;

// const mapDispatchToProps = dispatch => ({
//   handleClick: (isChecked) => {
//     dispatch(setCheckboxChecked(isChecked));
//     dispatch(setLoginButton(isChecked));
//   }
// });

export default connect(
  mapStateToProps,
  null,
)(Map);