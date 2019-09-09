import React, {Component} from 'react';
import AccountBox from '@material-ui/icons/AccountBox';
import {withStyles} from '@material-ui/styles';
import {Link} from 'react-router-dom';
import SvgIcon from "@material-ui/core/SvgIcon";

const styles = theme => ({
    accountIconLink: {
      
    },
    accountIconWrap: {
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        color: theme.palette.primary.dark
    },
    '@media (max-width: 767px)': {
        accountIconLink: {
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

