import * as OfflinePlugin from 'offline-plugin/runtime';

export function handleOffline() {
  if (process.env.NODE_ENV === 'production') {
    OfflinePlugin.install({
      onUpdateReady() {
        OfflinePlugin.applyUpdate();
      },

      onUpdated() {
        location.reload();
      }
    });
  }
}
