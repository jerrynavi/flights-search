import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Home from './pages/home/Home';
import ErrorPage from './pages/error/ErrorPage';
import Footer from './components/footer/Footer';
import SearchResult from './pages/search-results/SearchResults';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={SearchResult} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        </Router>
        <Footer />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
