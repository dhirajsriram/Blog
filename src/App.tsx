import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Menu from './common/menu/menu';
import { Container } from '@material-ui/core';
const Description = React.lazy(() => import('./pages/description'));
const Listing = React.lazy(() => import('./pages/listing'));
const FourZeroFour = React.lazy(() => import('./pages/fourzerofour'));

const theme = createMuiTheme({
	palette: {}
});

type AppState = {
  data: string,
  props:any
}

class App extends Component <{}, AppState>{


	render() {
		return (
			<ThemeProvider theme={theme}>
				<Menu />
				<div className="main-container">
					<React.Suspense fallback={<div>Loading...</div>}>
						<Switch>
							<Route exact path="/" render={(props:any) => <Container maxWidth="xl"><Listing {...props} /></Container>} />
							<Route exact path="/:id" render={(props:any) => <Container maxWidth="xl"><Description {...props} /></Container>} /> 
							<Route render={(props:any) => <Container maxWidth="xl"><FourZeroFour {...props} /></Container>} />
						</Switch>
					</React.Suspense>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;