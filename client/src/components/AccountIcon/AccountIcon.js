import React, {Component} from 'react';
import AccountBox from '@material-ui/icons/AccountBox';
import {withStyles} from '@material-ui/styles';
import {Link} from 'react-router-dom';
// import Icon from "@material-ui/core/Icon";
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = theme => ({
    accountIconLink: {
        // position: 'absolute',
        // right: '120px',
    },
    accountIconWrap: {
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        color: theme.palette.primary.dark
    },
    '@media (max-width: 767px)': {
        accountIconLink: {
            // right: '130px',
        }
    }
});
class AccountIcon extends Component {
    render() {
        return (
            <Link to="/account" className={this.props.classes.accountIconLink} title="Личный кабинет">
                <SvgIcon className={this.props.classes.accountIconWrap}><AccountBox className={this.props.classes.accountIcon}/></SvgIcon>
            </Link>
        );
    }
}

export default withStyles(styles)(AccountIcon);
// import React from 'react';
// import { withStyles } from '@material-ui/styles';
//
// const styles = {
//     root: {
//         backgroundColor: 'red',
//     },
// };
//
// class MyComponent extends React.Component {
//     render () {
//         return <div className={this.props.classes.root} />;
//     }
// }
//
// export default withStyles(styles)(MyComponent);
