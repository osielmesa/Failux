import {CHANGE_INTERVAL} from "./ActionTypes";

//Osiel: Fix 2. I prefer to add initial state in reducer, for the first load and in case state is not provided.

const initialState={
  currentInterval:1
}
const reducer = (state=initialState, action) => {
  switch (action.type) {
    case CHANGE_INTERVAL:
      return {...state, currentInterval:state.currentInterval + action.payload};//Osiel: Fix 3. It's better to treat state this way because scalability,
                                                                                // in the future could be bigger state to support more functionalities.
    default:
      return state;
  }
};

export default reducer