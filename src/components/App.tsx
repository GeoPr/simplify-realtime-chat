import React, { FC } from 'react';
import { AppRouter } from './AppRouter/AppRouter';
import { Container } from './Container/Container';
import { useContextValue } from '../state/state';
import './App.scss';
import { Loader } from './Loader/Loader';

const App: FC = () => {
  const { loader } = useContextValue();

  return (
    <>
      <Container>
        <AppRouter />
      </Container>
      {loader && <Loader />}
    </>
  );
};

export default App;
