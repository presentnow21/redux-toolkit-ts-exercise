import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '.';

type Props = {
  children: ReactNode;
};

export default function ReduxContext({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
