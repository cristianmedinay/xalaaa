/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import "./App.scss";

export default class App extends React.Component {
  render() {
    const { children } = this.props;

    return <main className="AppContainer">{children}</main>;
  }
}
