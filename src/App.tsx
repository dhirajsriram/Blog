import React, { Component } from "react";
import "./App.css";
import { Route, Switch, RouteComponentProps, withRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Loader from "./common/loader/loader";
import routes from "./routes"

const Menu = React.lazy(() => import("./common/menu/menu"));

const theme = createMuiTheme({
  palette: {}
});
type PathParamsType = {
  param1: string,
}

type PropsType = RouteComponentProps<PathParamsType> & {
  someString: string,
}

const initialState = { categoryArr: [], search: "" , newblog:[]};
type State = Readonly<typeof initialState>;
class App extends Component<PropsType> {
  readonly state: State = initialState;
  _setCategories = (categoryArr: any) => {
    this.setState({ categoryArr: categoryArr });
  };

  _setSearchTerm = (search: string) => {
    this.props.history.push("/?search=" + search)
    this.setState({ search });
  }
  _addBlog = (blog:any) =>{
    this.setState({ newblog : [...this.state.newblog,blog] })
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<Loader />}>
          <Menu categoryArr={this.state.categoryArr} setSearch={this._setSearchTerm} />
          <div className="main-container">
            <Switch>
              {routes.map((route:any) => (
                <Route
                  key={route.path}
                  path={route.path}
                  render={(props: any) => (
                    <route.component newblog={this.state.newblog} addBlog={this._addBlog} search={this.state.search} setCategories={this._setCategories} {...props} />
                  )}
                />
              ))}
            </Switch>
          </div>
        </React.Suspense>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
