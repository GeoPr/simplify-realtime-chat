import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes/routes';
import { useContextValue } from '../../state/state';

export const AppRouter: FC = () => {
  const { currentUser } = useContextValue();

  if (currentUser) {
    return (
      <Switch>
        {privateRoutes.map(({ path, component }) => (
          <Route path={path} component={component} key={path} exact />
        ))}
        <Redirect to="/chat" />
      </Switch>
    );
  }

  return (
    <Switch>
      {publicRoutes.map(({ path, component }) => (
        <Route path={path} component={component} key={path} exact />
      ))}
			<Redirect to="/login" />
    </Switch>
  );
};
