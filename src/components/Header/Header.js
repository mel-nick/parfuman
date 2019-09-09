import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AccountBox from '@material-ui/icons/AccountBox';
import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import MenuList from '../MenuList/MenuList'
import Badges from "../Badges/Badges";
import AccountIcon from "../AccountIcon/AccountIcon";
import store from "../../store";
import Register from "../Register";
import withStyles from "@material-ui/core/styles/withStyles";
import ContactInfo from '../ContactInfo/ContactInfo'
import {connect} from 'react-redux';
import {fetchProducts} from '../../actions/products';
import {fetchCategories} from '../../actions/categories';
import {getProducts} from '../../selectors/Products';
import {flexbox} from "@material-ui/system";


const styles = (theme) => ({
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '30px 20px 5px 20px',
        boxSizing: 'border-box',
        width: '100%',
        height: '140px',
        backgroundColor: theme.palette.primary.main,
        fontFamily: 'Roboto, sans-serif',
        transition: 'all 0.3s ease'
    },
    containerBox: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative',
    },
    optionIconWrap: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '140px',
        height: '30px',
        position: 'relative',
        zIndex: '3'
    },
       '@media (max-width: 767px)': {
        header: {
            height: '100px',
            padding: '5px 20px',
            overflow: 'visible',
        },
        optionIconWrap: {
            right: '60px',
        }
    }
});


class Header extends Component {
    componentWillMount() {
        this.props.fetchProducts();
        this.props.fetchCategories();
    }


    render() {
        
        return (
            <header className={this.props.classes.header} id='header'>
                <Box className={this.props.classes.containerBox} display="flex" alignItems="center">

                    
                    <SearchInput/>
                    <Logo img={`url("client/src/components/Logo/main-logo.png");`}/>
                    <div className={this.props.classes.optionIconWrap}>
                        <AccountIcon/>
                        <Badges/>
                        <ContactInfo/>
                    </div>
                </Box>
                <MenuList/>
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories())
});

const mapStateToProps = (state, ownProps) => ({
    products: getProducts(state, ownProps)
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));


