import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import Loader from "./common/loader/loader";

const Menu = React.lazy(() => import("./common/menu/menu"));
const ShippingDetails = React.lazy(() => import("./pages/shippingDetails"));
const Listing = React.lazy(() => import("./pages/listing"));
const FourZeroFour = React.lazy(() => import("./pages/fourzerofour"));
const theme = createMuiTheme({
  palette: {}
});


const initialState = { row: {} };
type State = Readonly<typeof initialState>;
class App extends Component<object, State> {
  readonly state: State = initialState;
  _setRowData = (rowdata: any) => {
    this.setState({ row: rowdata });
  };
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<Loader />}>
          <Menu />
          <div className="main-container">
            <Switch>
              <Route
                exact
                path="/"
                render={(props: any) => (
                    <Listing {...props} setRowData={this._setRowData} />
                )}
              />
              <Route
                exact
                path="/shipment/:id"
                render={(props: any) => (
                  <Container maxWidth="xl">
                    <ShippingDetails row={this.state.row} {...props} />
                  </Container>
                )}
              />
              <Route
                render={(props: any) => (
                  <Container maxWidth="xl">
                    <FourZeroFour {...props} />
                  </Container>
                )}
              />
            </Switch>
          </div>
        </React.Suspense>
      </ThemeProvider>
    );
  }
}

export default App;
