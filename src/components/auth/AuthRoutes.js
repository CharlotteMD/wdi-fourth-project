import React from 'react';
import { Switch, Route } from 'react-router-dom';


import UserLogin from './users/UserLogin';
import HotelLogin from  './hotels/HotelLogin';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/users/login" component={UserLogin} />
      <Route exact path="/hotels/login" component={HotelLogin} />
    </Switch>
  );
};

export default AuthRoutes;
