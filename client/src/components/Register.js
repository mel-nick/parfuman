import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {registerUser} from '../actions/authentication';
import withStyles from "@material-ui/core/styles/withStyles";
import RegisterClose from "./RegisterClose";
// import './Register.scss';

// const styles = (theme) => ({
//     register: {
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
//     registerTitle: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         height: '4em',
//         borderTopRightRadius: '5px',
//         borderTopLeftRadius: '5px',
//         backgroundColor: '#f5f5f5',
//         fontSize: '20px',
//         fontWeight: 'bold',
//         color: '#ff8f00',
//         boxShadow: '0 0 5px rgba(0,0,0,0.5)',
//     },
//     registerError: {
//         fontSize: '10px',
//         color: 'red',
//     },
//     registerForm: {
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
//     registerInput: {
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
//     registerButton: {
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
//         register: {
//             width: '96%'
//         },
//     }
// });
const styles = (theme) => ({
    registerWrap: {
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 0',
        fontFamily: "'Montserrat', sans-serif"
    },
    register: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        borderRadius: '4px',
        boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.2)',
    },
    registerBox: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        boxSizing: 'border-box',
        alignItems: 'center',
        padding: '20px 0',
        borderRadius: '4px 4px 0 0 ',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.main,
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'
    },
    registerTitle: {
        width: '90%',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: '500',
    },
    registerClose: {
        justifyContent: 'center',
        width: '10%',
    },
    registerError: {},
    registerForm: {
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
        padding: '10px 0',
        borderRadius: '4px'
    },
    registerInput: {
        width: '100%',
        padding: '10px 20px',
        border: '1px solid' + theme.palette.primary.contrastText,
        outline: '0',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.05)',
        fontSize: '.8rem',
        fontWeight: '300',

    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: '20px'
    },
    registerButton: {
        padding: '10px',
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
    toLoginAccount: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid' + theme.palette.secondary.main,
        fontSize: '1rem',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light,
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
        register: {
            width: '45%'
        },
    },
    '@media(max-width: 991px)': {
        register: {
            width: '65%'
        },
        linkContainer: {
            flexDirection: 'row-reverse',

        },
        registerButton: {
            marginRight: '0',
            marginLeft: '10px'
        },
    },
    '@media(max-width: 767px)': {
        registerWrap: {
            padding: '30px 0'
        },
        register: {
            width: '80%'
        },
        registerTitle: {
            padding: '15px 0',
            fontSize: '1.3rem'
        },
        toLoginAccount: {
            textAlign: 'left'
        }
    },
    '@media(max-width: 480px)': {
        register: {
            width: '100%'
        },
    }
});

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        errors: {},
    };

    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
        };
        this.props.registerUser(user, this.props.history);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        const {errors} = this.state;
        return (
            <div className={this.props.classes.registerWrap}>
                <div className={this.props.classes.register}>
                    <div className={this.props.classes.registerBox}>
                        <h2 className={this.props.classes.registerTitle}>Регистрация</h2>
                        <Link to="/" className={this.props.classes.registerClose}> <RegisterClose/></Link>
                    </div>
                    <form onSubmit={this.handleSubmit} className={this.props.classes.registerForm}>
                        <div className={this.props.classes.inputsWrap}>
                            <div className={this.props.classes.inputContainer}>
                                <input
                                    type="text"
                                    placeholder="введите Ваше имя"
                                    name="name"
                                    onChange={this.handleInputChange}
                                    value={this.state.name}
                                    className={this.props.classes.registerInput}
                                />
                                {errors.name && (
                                    <div className={this.props.classes.registerError}>
                                        {'* '}
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className={this.props.classes.inputContainer}>
                                <input
                                    type="email"
                                    placeholder="введите Ваш email"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                    className={this.props.classes.registerInput}
                                />
                                {errors.email && (<div>{'* '}{errors.email}</div>)}
                            </div>
                            <div className={this.props.classes.inputContainer}>
                                <input
                                    type="password"
                                    placeholder="Ваш пароль"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                    className={this.props.classes.registerInput}
                                />
                                {errors.password && (<div>{'* '}{errors.password}</div>)}
                            </div>
                            <div className={this.props.classes.inputContainer}>
                                <input
                                    type="password"
                                    placeholder="повторите Ваш пароль"
                                    name="password_confirm"
                                    onChange={this.handleInputChange}
                                    value={this.state.password_confirm}
                                    className={this.props.classes.registerInput}
                                />
                                {errors.password_confirm && (<div>{'* '}{errors.password_confirm}</div>)}
                            </div>
                        </div>
                        <div className={this.props.classes.linkContainer}>
                            <button type="submit" className={this.props.classes.registerButton}>
                                Зарегистрироваться
                            </button>
                            <Link to='/account' className={this.props.classes.toLoginAccount}>
                                Уже есть аккаунт
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});


const RegistersWithStyles = (withStyles(styles)(Register));
export default connect(mapStateToProps, {registerUser})(withRouter(RegistersWithStyles));
