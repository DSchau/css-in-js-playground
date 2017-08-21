import * as OfflinePlugin from 'offline-plugin/runtime';

export function handleOffline() {
  OfflinePlugin.install({
    onUpdateReady() {
      OfflinePlugin.applyUpdate();
    },

    onUpdated() {
      location.reload();
    }
  })
}
