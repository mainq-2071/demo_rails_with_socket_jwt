import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from '../screens/HomePage';
import SigninPage from '../screens/SigninPage';
import SignupPage from '../screens/SignupPage';
import LoadingPage from '../screens/LoadingPage';
import NotFoundPage from '../screens/NotFoundPage';

const AppRouter = () => {
  const pageLoading = useSelector((state) => state.commonReducer.pageLoading);
  if (pageLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signin" exact component={SigninPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;
