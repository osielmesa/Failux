import React from 'react'
import ReactDOM from "react-dom";
import './styles.css'
import {Provider} from "./common/failux/implementation/failux";
import createStore from "./common/failux/Store";
import reducer from "./common/failux/Reducer";
import Timer from "./modules/Timer";

// init
/*Osiel: Fix 4. The initial state parameter where not provided*/
const initialState={
  currentInterval:1
}

ReactDOM.render(
  <Provider store={createStore(reducer, initialState)}>
    <Timer />
  </Provider>,
  document.getElementById("app")
);