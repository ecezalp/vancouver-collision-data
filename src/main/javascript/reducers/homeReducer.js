const initialState = {
  home: true,
};

const home = (state = initialState, action) => {
    switch (action.type) {
      case "TEST":
        return ({...state, home: false});
      default:
        return state;
    }
  }
;

export default home;