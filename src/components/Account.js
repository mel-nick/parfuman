import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import {logoutUser} from '../actions/authentication';
import Login from "./Login";

const styles = (theme) => ({
    account: {
        padding: '5px 20px 0 20px',
    },
    personalAccountWrap: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    personalAccountTitle: {
        width: '100%',
        // padding: '10px',
        textAlign: 'center',
        fontSize: '1.3rem',
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.main
    },
    personalAccountInfoWrap: {
        display: 'flex'
    },
    avatar: {
        borderRadius: '2px',
        boxShadow: '0 0 2px 0' + theme.palette.secondary.light,
        // border: '1px solid' + theme.palette.secondary.light
    },
    linksWrap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginLeft: '10px'
    },
    userName: {
        // padding: '5px 0',
        // textAlign: 'center',
        color: theme.palette.primary.dark,
        fontSize: '1.1rem',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    },
    linksInsideWrap: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
    link: {
        // marginTop: '20px',
        padding: '10px 0',
        position: 'relative',
        fontSize: '16px',
        color: theme.palette.primary.dark,
        '&:before': {
            content: '" "',
            display: 'flex',
            width: '100px',
            height: '1px',
            position: 'absolute',
            top: '-1px',
            backgroundColor: theme.palette.secondary.light
        },
        '&:after': {
            content: '" "',
            display: 'flex',
            width: '100px',
            height: '1px',
            position: 'absolute',
            bottom: '0',
            backgroundColor: theme.palette.secondary.light
        },
        '&:hover': {
            transform: 'translate(7%)',
            transition: 'all 0.3s ease'
        },
        '&:active': {
            color: theme.palette.secondary.dark
        },
        '&:hover + a:before': {
            backgroundColor: 'transparent'
        },
        '&:hover:before': {
            width: '120px',
            zIndex: '2',
            backgroundColor: theme.palette.secondary.main,
            transform: 'translate(-7%)',
            transition: 'all 0.5s ease',
        },
        '&:hover:after': {
            width: '120px',
            // height: '4px',
            zIndex: '10',
            backgroundColor: theme.palette.secondary.main,
            transform: 'translate(-7%)',
            transition: 'all 0.5s ease',
        },
    }
});

class Account extends Component {
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        console.log(this.props);
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <div className={this.props.classes.personalAccountWrap}>
                <h3 className={this.props.classes.personalAccountTitle}>

                </h3>
                <div className={this.props.classes.personalAccountInfoWrap}>
                    <div className={this.props.classes.avatarWrap}>
                        <img src={user.avatar} alt={user.name} title={user.name} className={this.props.classes.avatar}/>
                    </div>
                    <div className={this.props.classes.linksWrap}>
                        <h4 className={this.props.classes.userName}>{user.name}</h4>
                        <div className={this.props.classes.linksInsideWrap}>
                            <Link to="/profile"
                                  className={`${this.props.classes.link} ${this.props.classes.linkToProfile}`}>
                                Мой профиль
                            </Link>
                            <Link to="/profile/orders"
                                  className={`${this.props.classes.link} ${this.props.classes.linkToProfileOrder}`}>
                                Мои заказы
                            </Link>
                            <a href="true" onClick={this.onLogout.bind(this)}
                               className={`${this.props.classes.link} ${this.props.classes.linkToExit}`}>
                                Выйти
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
        // const guestLinks = (
        //   <ul>
        //     <li>
        //       Личный кабинет
        //     </li>
        //     <li>
        //       <Link to="/register">Регистрация</Link>
        //     </li>
        //     <li>
        //       <Link to="/login">Вход</Link>
        //     </li>
        //   </ul>
        // );
        const guestLinks = (
            <div className={this.props.classes.signInUp}>
                {/*<Register/>*/}
                <Login/>
            </div>
        );
        return (
            <div className={this.props.classes.account}>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        );
    }
}

Account.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

const StyledAccount = withStyles(styles)(Account);
export default connect(mapStateToProps, {logoutUser})(withRouter(StyledAccount));