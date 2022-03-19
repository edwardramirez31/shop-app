import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import MainLayout from '@components/layout/MainLayout';
import store from '@store/index';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Provider store={store}>
    <MainLayout>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </MainLayout>
  </Provider>
);

export default MyApp;
