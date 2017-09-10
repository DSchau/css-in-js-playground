import * as React from 'react';
import * as OfflinePlugin from 'offline-plugin/runtime';
declare let process: any;

interface Props {}

interface State {
  updated: boolean;
}

export function handleOffline({ onUpdated = () => {} }) {
  if (process.env.NODE_ENV === 'production') {
    OfflinePlugin.install({
      onUpdateReady() {
        OfflinePlugin.applyUpdate();
      },

      onUpdated: onUpdated
    });
  }
}

export function withOffline(Component) {
  return class OfflineContainer extends React.Component<Props, State> {
    state = {
      updated: false
    };

    componentWillMount() {
      handleOffline({
        onUpdated: this.handleOnUpdate
      });
    }

    handleOnUpdate = () => {
      this.setState({
        updated: true
      });
    };

    render() {
      return <Component updated={this.state.updated} />;
    }
  };
}
