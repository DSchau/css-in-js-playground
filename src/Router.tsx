import * as React from 'react';
import createHistory from 'history/createBrowserHistory';

import CodeProvider from './components/CodeProvider/';
import Footer from './components/Footer/';
import Header from './components/Header/';

export interface History {
  push(route: string, options?: any)
}

interface Props {
  children?: any;
  onHistory(History);
}

interface State {
  history: History;
}

class Router extends React.Component<Props, State> {
  state = {
    history: []
  };
  unlisten: Function;

  componentDidMount() {
    const history = createHistory();
    this.setState({
      history
    }, () => {
      this.props.onHistory(history);
    });
    this.unlisten = history.listen((location, action) => {
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return this.props.children;
  }
}

export default Router;
