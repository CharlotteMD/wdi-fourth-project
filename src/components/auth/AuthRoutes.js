import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import UserRegister from './UserRegister';
// import HotelRegister from './HotelRegister';
import UserLogin from './users/UserLogin';
import HotelLogin from  './hotels/HotelLogin';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/users/login" component={UserLogin} />
      <Route exact path="/hotels/login" component={HotelLogin} />
      {/* <Route exact path="/users/register" component={UserRegister} />
      <Route exact path="/hotels/register" component={HotelRegister} /> */}
    </Switch>
  );
};

export default AuthRoutes;
