import * as React from 'react'
// import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

interface AppContainerProps {
  routes;
  store;
}

class AppContainer extends React.Component<AppContainerProps, {}> {
  // static propTypes = {
  //   routes : PropTypes.object.isRequired,
  //   store  : PropTypes.object.isRequired
  // };

  static shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
