import * as React from 'react'

interface CounterProps {
  counter: number,
  increment: Function,
  counterDouble: Function,
  resetCounter: Function
}

export class Counter extends React.Component<CounterProps, {}> {
  render() {
    return (
      <div style={{ margin: '0 auto' }} >
        <h2>Counter: {this.props.counter}</h2>
        <button className='btn btn-default' onClick={e => this.props.increment()}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={e => this.props.counterDouble()}>
          Double (Async)
        </button>
        {' '}
        <button className='btn btn-default' onClick={e => this.props.resetCounter()}>
         Reset
        </button>
      </div>
    );
  }
}

// Counter["propTypes"] = {
//   counter     : PropTypes.number.isRequired,
//   doubleAsync : PropTypes.func.isRequired,
//   increment   : PropTypes.func.isRequired
// };

export default Counter
