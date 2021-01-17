import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './assets/styles/basics/styles.scss';
import { AppHeader } from './cmps/AppHeader';
import { Hero } from './cmps/Hero';
import { routes } from './routes';

export function App() {
  return (
    <>
      <div className="App">
        <header className="">
          <AppHeader />
        </header>
        <main>
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </main>
      </div>
    </>
  );
}

