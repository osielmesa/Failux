# Failux

Failux is a simplified and broken implementation of Redux.
In the sandbox you'll find a small application written in Failux
and React.

This is not working: stopwatch where you can change the update
interval.

When you click on "start", the stopwatch should start and after
a specified update interval increases its value by the value of
the interval.

When you click on "stop", the stopwatch must stop and reset its
value. 

Fork sandbox and fix issues as well as potentially
problematic code. Make code modern and more readable. 
Comment your solution.

https://codesandbox.io/s/angry-cdn-iphrw

####DONE: 
Fork of sandbox in: https://codesandbox.io/s/failux-osiel-lima-task-9rt2v

###### FIX 1
- [x] The parameters in the connect function for Interval component where inverted (not in the right order).

###### FIX 2
- [x] I prefer to add initial state in reducer, for the first load and in case state is not provided. Always is better provide an intial state to reducers, so the app has something to start with in that reducer.

###### FIX 3
- [x] It's better to state like object and not a simple value because scalability,in the future could be bigger state to support more functionalities. When you make state an object and not simple value you are making room for more properties and its easier for the person responsible to growth the app.

###### FIX 4
- [x] The initial state parameter where not provided to createStore.

###### FIX 5
- [x] I consider better to make the subscription to the changes in store inside componentDidMount to make it only once when component is mounted and not every time component is updated.

###### FIX 6
- [x] Saving unsubscribe function instance to use later in componentWillUnmount.

###### FIX 7
- [x] Unsubscribe instance called before component is unmounted to stop listen changes in that component store.

###### FIX 8
- [x] Adding handleChangeIntervalPressed to provide validation to the calculated value, I consider 1 as the minimum interval possible.

###### FIX 9
- [x] Passing state.currentInterval as value of currentInterval property. Just passing to Timer only the currentInterval and not the entire state.

###### FIX 10
- [x] timeout param receive milliseconds in setInterval function, and this.props.currentInterval is expressed in seconds, so this.props.currentInterval*1000 is the right value.

###### FIX 11
- [x] Making handleStart and arrow function to preserve the context, another option is call bind function with this context as param.

###### FIX 12
- [x] Changing setTimeout to setInterval. setTimeout is executed only one time but setInterval is executed every specified interval.

###### FIX 13
- [x] Making handleStop and arrow function to preserve the context, another option is call bind function with this context as param.

###### FIX 14
- [x] Saving setInterval instance to stop (clear) later when handleStop function will be called on stop button press.

###### FIX 15
- [x] Just stoping setInterval instance if exist inside the handleStop function.

###### FIX 16
- [x] Adding componentDidUpdate lifecycle method to detect changes in  this.props.currentInterval while the clock is running. It will be consider that if the currentInterval is changed while the watch is running, the watch must start with currentTime in 0 again and the new time interval.

###### FIX 17
- [x] I propose a new project structure inside osiel-src folder.

###### FIX 18
- [x] I changed Component for PureComponent in IntervalComponent and TimerComponent. PureComponent contains an implementation of componentShouldUpdate that makes it more optimized.

 