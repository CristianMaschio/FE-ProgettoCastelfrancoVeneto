import * as React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./scenes/Home/Home";
import Lab from "./scenes/Lab/Lab";
import ItemDetails from "./scenes/ItemDetails/ItemDetails";

class App extends React.Component {
  public render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Lab" exact component={Lab} />
          <Route path="/Item/:itemId" exact component={ItemDetails} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
