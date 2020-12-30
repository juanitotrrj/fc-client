import React, { Component } from "react";
import {
    Route,
    BrowserRouter
} from "react-router-dom";
import ForecastList from "../Forecasts/List";
import ForecastView from "../Forecasts/View";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={ForecastList} />
                    <Route path="/forecasts/:id" component={ForecastView} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
