import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuctionsIndex from './AuctionsIndex';
import AuctionsShow from  './AuctionsShow';
// import AuctionsNew from './AuctionsNew';
// import AuctionsEdit from './AuctionsEdit';

const AuctionsRoutes = () => {
  return (
    <Switch>
      <Route exact path="/auctions" component={AuctionsIndex} />
      {/* <Route exact path="/auctions/new" component={AuctionsNew} /> */}
      {/* <Route path="/auctions/:id/edit" component={AuctionsEdit} /> */}
      <Route path="/auctions/:id" component={AuctionsShow} />
    </Switch>
  );
};

export default AuctionsRoutes;
