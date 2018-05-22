import * as React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./scenes/Home/Home";

class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    );
  }
}

export default withRouter(App);
