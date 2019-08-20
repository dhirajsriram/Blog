import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Menu from "./common/menu/menu";
import { Container } from "@material-ui/core";
import Loader from "./common/loader/loader";
const Description = React.lazy(() => import("./pages/description"));
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
        <Menu />
        <div className="main-container">
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route
                exact
                path="/"
                render={(props: any) => (
                  <Container maxWidth="xl">
                    <Listing {...props} setRowData={this._setRowData}/>
                  </Container>
                )}
              />
              <Route
                exact
                path="/:id"
                render={(props: any) => (
                  <Container maxWidth="xl">
                    <Description row={this.state.row} {...props} />
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
          </React.Suspense>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
