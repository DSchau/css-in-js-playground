import * as React from 'react';
import * as OfflinePlugin from 'offline-plugin/runtime';
declare let process: any;

interface State {
  updated: boolean;
}

interface Props {
  children: (updated: boolean) => any;
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

export class OfflineContainer extends React.Component<Props, State> {
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
    return this.props.children(this.state.updated);
  }
}
