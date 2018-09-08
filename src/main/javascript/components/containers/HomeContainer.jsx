import {connect} from 'react-redux'
import Home from "../presentationals/Home";

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
)(Home);