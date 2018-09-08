import {connect} from 'react-redux'
import Infographics from "../presentationals/Infographics";

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
)(Infographics);