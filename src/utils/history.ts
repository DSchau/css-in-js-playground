import queryString from 'query-string';

export const replaceHistory = (params, useExisting = true) => {
  const existing = useExisting ? queryString.parse(window.location.search) : {};
  const path = [
    window.location.origin,
    window.location.pathname,
    '?',
    queryString.stringify({
      ...existing,
      ...params
    })
  ].join('');
  window.history.replaceState({ path }, '', path);
};
