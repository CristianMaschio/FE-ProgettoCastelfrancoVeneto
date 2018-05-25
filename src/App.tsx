import * as React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./scenes/Home/Home";
import Test from "./scenes/Test/Text";

class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Test" exact component={Test} />
      </Switch>
    );
  }
}

export default withRouter(App);
