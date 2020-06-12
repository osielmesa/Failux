import React from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
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

export class Provider extends React.Component {
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