import React, { Component } from 'react';
import Menu from './components/Menu/Menu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import routes from './routes'

class App extends Component {

    showContentMenu = (routes) => {
        var result = null
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={route.main}
                    />
                )
            })

        }

        return result
    }

    render() {
        return (
            <div>
                <Router>
                    <div className="App">
                        <Menu />
                        <div className="container">
                            <div className="row">
                                <Switch>
                                    {this.showContentMenu(routes)}
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;

