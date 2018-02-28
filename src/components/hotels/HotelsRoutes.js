import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HotelsShow from  './HotelsShow';
// import HotelsNew from './HotelsNew';
// import HotelsEdit from './HotelsEdit';

const HotelsRoutes = () => {
  return (
    <Switch>
      {/* <Route exact path="/auctions" component={HotelsIndex} /> */}
      {/* <Route exact path="/auctions/new" component={HotelsNew} /> */}
      {/* <Route path="/auctions/:id/edit" component={HotelsEdit} /> */}
      <Route path="/hotels/:id" component={HotelsShow} />
    </Switch>
  );
};

export default HotelsRoutes;
