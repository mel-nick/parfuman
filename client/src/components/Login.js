import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loginUser} from '../actions/authentication';
import withStyles from "@material-ui/core/styles/withStyles";
import RegisterClose from "./RegisterClose";

// const styles = (theme) => ({
//     login: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         width: '48%',
//         margin: '20px auto',
//         borderRadius: '5px',
//         border: '1px solid #f5f5f5',
//         fontSize: '1rem',
//         boxShadow: '0 0 10px rgba(0,0,0,0.5)',
//     },
//     loginTitle: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderTopLeftRadius: '5px',
//         borderTopRightRadius: '5px',
//         backgroundColor: '#f5f5f5',
//         width: '100%',
//         height: '4em',
//         fontSize: '20px',
//         fontWeight: 'bold',
//         color: '#ff8f00',
//         boxShadow: '0 0 5px rgba(0,0,0,0.5)',
//     },
//     loginError: {
//         fontSize: '10px',
//         color: 'red',
//     },
//     loginForm: {
//         display: 'flex',
//         flexDirection: 'column',
//         width: '51%',
//         margin: '2% auto',
//     },
//     inputsWrap: {
//         display: 'flex',
//         flexDirection: 'column',
//         width: '100%',
//         marginBottom: '2vw'
//     },
//     inputContainer: {
//         display: 'flex',
//         marginTop: '2vw'
//     },
//     loginInput: {
//         width: '100%',
//         height: '35px',
//         borderRadius: '5px',
//         outline: 'none',
//         paddingLeft: '10px',
//         border: '1px solid #f5f5f5',
//         boxShadow: '0 0 5px rgba(0,0,0,0.5)',
//     },
//     buttonContainer: {
//         width: '100%',
//         position: 'relative',
//     },
//     loginButton: {
//         width: '100%',
//         height: '3.5em',
//         borderRadius: '5px',
//         boxShadow: '0 0 5px rgba(0,0,0,0.5)',
//         outline: 'none',
//         border: 'none',
//         backgroundColor: '#f5f5f5',
//         color: '#ff8f00',
//         fontWeight: 'bold',
//         cursor: 'pointer',
//     },
//     '@media(max-width: 767px)': {
//         login: {
//             width: '96%'
//         },
//     }
// });
const styles = (theme) => ({
    loginWrap: {
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 0',
        fontFamily: "'Montserrat', sans-serif"

    },
    login: {
        display: 'flex',
        flexDirection: 'column',
        width: '35%',
        borderRadius: '5px',
        boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.2)',
    },
    loginBox: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        boxSizing: 'border-box',
        alignItems: 'center',
        padding: '20px 0',
        borderRadius: '5px 5px 0 0 ',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.main,
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'
    },
    loginTitle: {
        textAlign: 'center',
        width: '90%',
        boxSizing: 'border-box',
        fontSize: '1.5rem',
        fontWeight: '500',
        color: theme.palette.secondary.main,

    },
    loginError: {},
    loginForm: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: '100%',
        padding: '25px 45px',
        color: theme.palette.secondary.main,
        fontSize: '.6rem'
    },
    inputsWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '100%',
        padding: '15px 0',
        borderRadius: '4px'
    },
    loginInput: {
        width: '100%',
        padding: '10px 20px',
        border: '1px solid' + theme.palette.primary.contrastText,
        outline: '0',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.05)',
        fontSize: '.8rem'

    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: '20px'
    },
    loginButton: {
        minWidth: '140px',
        padding: '10px 15px',
        marginRight: '10px',
        borderRadius: '4px',
        border: '1px solid' + theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'transform .2s linear',
        '&:hover': {
            transform: 'translateY(-5px)',
        },
        '&:focus': {
            outline: 'none',
        },
    },
    toRegisterAccount: {
        padding: '10px 15px',
        borderRadius: '4px',
        border: '1px solid' + theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'transform .2s linear',
        '&:hover': {
            transform: 'translateY(-5px)',
            color: theme.palette.primary.light,
        },
        '&:focus': {
            outline: 'none',
        },
    },
    '@media(max-width: 1199px)': {
        login: {
            width: '45%'
        },
    },
    '@media(max-width: 991px)': {
        login: {
            width: '65%'
        },
        linkContainer: {
            flexDirection: 'row-reverse',

        },
        loginButton: {
            marginRight: '0',
            marginLeft: '10px'
        },
    },
    '@media(max-width: 767px)': {
        login: {
            width: '80%'
        },

        loginTitle: {
          padding: '15px 0',
          fontSize: '1.3rem'
        },

        toRegisterAccount: {
           textAlign: 'left'
        }
    },
    '@media(max-width: 480px)': {
        login: {
            width: '100%'
        },
    }
});

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }

    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div className={this.props.classes.loginWrap}>
                <div className={this.props.classes.login}>
                    <div className={this.props.classes.loginBox}>
                        <h2 className={this.props.classes.loginTitle}>Авторизация</h2>
                        <Link to="/"><RegisterClose/></Link>
                    </div>
                    <form onSubmit={this.handleSubmit} className={this.props.classes.loginForm}>
                        <div className={this.props.classes.inputsWrap}>
                            <div className={this.props.classes.inputContainer}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                    className={this.props.classes.loginInput}
                                />
                                {errors.email && (<div>{'* '}{errors.email}</div>)}
                            </div>
                            <div className={this.props.classes.inputContainer}>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                    className={this.props.classes.loginInput}

                                />
                                {errors.password && (<div>{'* '}{errors.password}</div>)}
                            </div>
                        </div>
                        <div className={this.props.classes.linkContainer}>
                            <button type="submit" className={this.props.classes.loginButton}>
                                Вход
                            </button>
                            <Link to='/register' className={this.props.classes.toRegisterAccount}>
                                Регистрация
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

const LoginWithStyles = (withStyles(styles)(Login));
export default connect(mapStateToProps, {loginUser})(LoginWithStyles)