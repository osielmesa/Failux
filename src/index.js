//Fix 17: inside osiel-src folder You can find an structured project, more readable, scalable and reusable.
//If you want to run it, uncomment the following line and comment the rest of this document.
//New separated structure is provided for failux implementation.
//I also include in this project prop-types, providing propTypes and defaultProps to the reusable component StyledBox.
//import './osiel-src/index'


import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import './styles.css'

const createStore = (reducer, initialState) => {
  let currentState = initialState;
  const listeners = [];

  const getState = () => currentState;
  const dispatch = action => {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => listeners.push(listener);

  return { getState, dispatch, subscribe };
};

const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  class WrappedComponent extends React.Component {
    render() {
      return (
        <Component
          {...this.props}
          {...mapStateToProps(this.context.store.getState(), this.props)}
          {...mapDispatchToProps(this.context.store.dispatch, this.props)}
        />
      );
    }

    //Osiel: Fix 5. I consider better to make this in componentDidMount to make it only once when component is mounted and not every time component is updated.
    componentDidMount() {
      this.unsubscribe = this.context.store.subscribe(this.handleChange.bind(this)); //Osiel: Fix 6. Saving unsubscribe function to use later in componentWillUnmount
                                                                                     //Using bind to be sure that it will not lose the context in no-arrow functions.
    }

    //Osiel: Fix 7. Unsubscribe before component is unmounted.
    componentWillUnmount() {
      this.unsubscribe()
    }

    handleChange = () => {
      this.forceUpdate();
    };
  }

  WrappedComponent.contextTypes = {
    store: PropTypes.object
  };

  return WrappedComponent;
};

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
};

// APP

// actions
const CHANGE_INTERVAL = "CHANGE_INTERVAL";

// action creators
const changeInterval = value => ({
  type: CHANGE_INTERVAL,
  payload: value
});

// reducers
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

// components

class IntervalComponent extends React.Component {
  //Osiel: Fix 8. Adding handleChangeIntervalPressed to provide validation to the next value, I consider 1 as the minimum interval possible.
  handleChangeIntervalPressed = (value) =>{
    if((this.props.currentInterval + value) < 1 ){
      return;
    }
    this.props.changeInterval(value)
  }
  render() {
    return (
      <div className="col-md-3 col-sm-6">
        <div className="counter purple">
          <span className="counter-value">{this.props.currentInterval} sec</span>
          <h3>Interval</h3>
          <span>
          <button className="btn" onClick={() => this.handleChangeIntervalPressed(-1)}>-</button>
          <button className="btn" onClick={() => this.handleChangeIntervalPressed(1)}>+</button>
        </span>
        </div>
      </div>
    );
  }
}

//Osiel: Fix 1: The parameters where inverted
const Interval = connect(
  state => ({
    currentInterval: state.currentInterval
  }),
  dispatch => ({
    changeInterval: value => dispatch(changeInterval(value))
  })
)(IntervalComponent);

class TimerComponent extends React.Component {
  state = {
    currentTime: 0
  };

  //Osiel: Fix 16. Adding componentDidUpdate lifecycle method to detect changes in  this.props.currentInterval while the clock is running
  //It will be consider that if the currentInterval is changed while the watch is running, the watch must start with currentTime in 0 again.
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.setIntervalInstance && prevProps.currentInterval !== this.props.currentInterval){
      this.handleStop()
      this.handleStart()
    }
  }

  render() {
    return (
      <div>
        <Interval />

        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="counter">
                <span className="counter-value">{this.state.currentTime} sec</span>
                <h3>Timer</h3>
                <div>
                  <button onClick={this.handleStart} className="btn">Start</button>
                  <button onClick={this.handleStop} className="btn">Stop</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //Osiel: Fix 11. Making handleStart and arrow function to preserve the this context, another option is call bind function with this context as param.
  handleStart = () => {
    //Osiel: Fix 12. Changing setTimeout to setInterval. setTimeout is executed only one time but setInterval is executed every specified interval.
    //Osiel: Fix 14. Saving setinterval instance to stop (clear) later when handleStop function is called.
    this.setIntervalInstance = setInterval(() =>
        this.setState({
          currentTime: this.state.currentTime + this.props.currentInterval
        }),
      this.props.currentInterval*1000 //Osiel: Fix 10. timeout param receive milliseconds, and this.props.currentInterval is expressed in seconds.
    );
  }

  //Osiel: Fix 13. Making handleStop and arrow function to preserve the this context, another option is call bind function with this context as param.
  handleStop = () => {
    //Osiel: Fix 15. Stoping setInterval instance if exist.
    if(this.setIntervalInstance){
      clearInterval(this.setIntervalInstance)
      this.setIntervalInstance = null;
    }
    this.setState({ currentTime: 0 });
  }
}

//Osiel: Fix 9. Passing state.currentInterval as value of currentInterval property
const Timer = connect(state => ({currentInterval: state.currentInterval}), () => {})(TimerComponent);

// init
/*Osiel: Fix 4. The initial state parameter where not provided*/
ReactDOM.render(
  <Provider store={createStore(reducer,initialState)}>
    <Timer />
  </Provider>,
  document.getElementById("app")
);
