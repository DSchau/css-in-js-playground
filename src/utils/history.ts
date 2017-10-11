import queryString from 'query-string';

export const replaceHistory = (params, useExisting = true) => {
  const existing = useExisting ? queryString.parse(location.search) : {};
  const path = [
    location.origin,
    location.pathname,
    '?',
    queryString.stringify({
      ...existing,
      ...params
    })
  ].join('');
  history.replaceState({ path }, '', path);
};
