import * as React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./scenes/Home/Home";
import Lab from "./scenes/Lab/Lab";

class App extends React.Component {
  public render() {
    return (
      
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/lab" exact component={Lab} />
      </Switch>
    );
  }
}

export default withRouter(App);
