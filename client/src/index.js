import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {grey, blue, orange} from '@material-ui/core/colors/';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {deepOrange} from "@material-ui/core/colors";
import {Provider} from 'react-redux';
import store from './store';
// import {orange} from "@material-ui/core/colors";



const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[100],
            light: grey[50],
            dark: grey[900],
            contrastText: grey[300],
        },
        // secondary: {
        //     main: blue[500],
        //     light: blue[200],
        // }
        secondary: {
            main: orange[500],
            light: orange[200],
            dark: orange[900],
            contrastText: deepOrange[500]
        }
    },
});
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
