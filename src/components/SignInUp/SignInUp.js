import React, {Component} from 'react';
import Register from '../Register';
import Login from '../Login';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
    signInUp: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});

class SignInUp extends Component {
    render() {
        return (
            <div className={this.props.classes.signInUp}>
                <Register/>
                <Login/>
            </div>
        );
    }
}

export default withStyles(styles)(SignInUp);