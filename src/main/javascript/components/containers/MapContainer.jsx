import {connect} from 'react-redux'
import Map from "../presentationals/Map";

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