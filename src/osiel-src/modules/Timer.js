import React from 'react'
import {connect} from "../common/failux/implementation/failux";
import Interval from "./Interval";
import Styledbox from "../common/components/StyledBox";

class TimerComponent extends React.PureComponent {
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
        <Styledbox text={this.state.currentTime + ' sec'} title={'Timer'} backgroundColorClass={'red'} actionComponent={
          <div>
            <button onClick={this.handleStart} className="btn">Start</button>
            <button onClick={this.handleStop} className="btn">Stop</button>
          </div>
        }/>
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

export default Timer