import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Loader from "./common/loader/loader";

const Menu = React.lazy(() => import("./common/menu/menu"));
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
                    <Listing {...props} />
                )}
              />
               <Route
                exact
                path="/category/:id"
                render={(props: any) => (
                    <Listing {...props} />
                )}
              />
              <Route
                exact
                path="/blog/:id"
                render={(props: any) => (
                    <Description {...props} />
                )}
              />
              <Route
                render={(props: any) => (
                    <FourZeroFour {...props} />
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
