import createHistory from 'history/createBrowserHistory';

export const history = createHistory({
  basename: '/#',
  forceRefresh: true,
});