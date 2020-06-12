import React from 'react'
import {connect} from "../common/failux/implementation/failux";
import {changeInterval} from "../common/failux/ActionsCreator";
import Styledbox from "../common/components/StyledBox";

class IntervalComponent extends React.PureComponent {
  //Osiel: Fix 8. Adding handleChangeIntervalPressed to provide validation to the next value, I consider 1 as the minimum interval possible.
  handleChangeIntervalPressed = (value) =>{
    if((this.props.currentInterval + value) < 1 ){
      return;
    }
    this.props.changeInterval(value)
  }
  render() {
    return (
      <Styledbox text={this.props.currentInterval + ' sec'} title={'Interval'} backgroundColorClass={'purple'} actionComponent={
        <span>
          <button className="btn" onClick={() => this.handleChangeIntervalPressed(-1)}>-</button>
          <button className="btn" onClick={() => this.handleChangeIntervalPressed(1)}>+</button>
        </span>
      }/>
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

export default Interval