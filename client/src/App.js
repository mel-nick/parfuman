import React, {Component} from 'react';
import {Router, Switch as SwitchRoute, Route} from 'react-router-dom';
import { Beforeunload } from 'react-beforeunload';
import {connect} from 'react-redux';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {getLocalCart} from './actions/getLocalCart';
import {getDbCart} from './actions/getDbCart';
import saveCartToDb from './actions/saveCartToDb';
import Box from '@material-ui/core/Box';
// import { makeStyles, Switch } from '@material-ui/core';
import {setCurrentUser, logoutUser} from './actions/authentication';
import Account from './components/Account';
// import Login from './components/Login';
// import Home from './components/Home';
import Register from './components/Register';
// import Slider from "./components/Slider/Slider";
import MainPage from "./components/MainPage/MainPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from './pages/Cart/Cart';
import ProductDetails from './pages/ProductDetails'
import ScrollUpButton from "react-scroll-up-button";
// import SignInUp from './components/SignInUp/SignInUp';
import setAuthToken from './setAuthToken';
import store from './store';
// import img from './0r7qN8U.png';
import Checkout from './pages/Checkout/Checkout';
import Profile from './pages/Profile/Profile';
import withStyles from "@material-ui/core/styles/withStyles";
import Products from './Containers/Products';
import {createBrowserHistory} from 'history'
import Toaster from './pages/Toaster/Toaster';
const newHistory = createBrowserHistory();

const styles = (theme) => ({
  page: {
    width: '100%',
    // backgroundImage: 'url(' + img + ');'
    //backgroundColor: 'red'
  },

  containerBox: {
    width: '100%',
    fontFamily: 'Roboto, sans-serif',

    // backgroundImage: 'url(' + img + ');'
  },
});

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/account';
  }
}
class App extends Component {
  componentDidMount() {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    const container = document.getElementById('insideContainerBox');
    let getScreenHeight = (header) => {
      container.style.minHeight = window.innerHeight - header.offsetHeight - footer.offsetHeight + 'px';
    };
    getScreenHeight(header);
    window.addEventListener('resize', () => {
      getScreenHeight(header);
    });

    // Get cart from Locale Storage on load:
    if (this.props.auth.isAuthenticated === false
      &&
      localStorage.getItem('parfumanCart') !== null) {           
      const localStorageCart = JSON.parse(localStorage.getItem('parfumanCart'));
      this.props.dispatch(getLocalCart(localStorageCart));
    }
    // Get cart from database on load:
    if (this.props.auth.isAuthenticated) {
      const userId = this.props.auth.user.id;
      axios.get('/cart/' + userId)
      .then(res => {
          // if (res.data) {
              this.props.dispatch(getDbCart(res.data.cartProducts));
              localStorage.setItem('parfumanCart', JSON.stringify(res.data.cartProducts));
          // }
      })
      .catch(error => {
          console.log(error);
      }); 
    }
  }
 
  render() {
    //Get cart from DB after login:      
    if (this.props.auth.isAuthenticated && !this.props.auth.isCartGeted) {
      const userId = this.props.auth.user.id
      axios.get('/cart/' + userId)
      .then(res => {
          // console.log(res.data.cartProducts);
          if (res.data) {
              this.props.dispatch(getDbCart(res.data.cartProducts));
              localStorage.setItem('parfumanCart', JSON.stringify(res.data.cartProducts));
          }
      })
      .catch(error => {
          console.log(error);
      });            
    }
      
    //Save cart to DB after logout:
    // if (!this.props.auth.isAuthenticated && this.props.auth.isCartGeted) {
    //   const data = {
    //     cartItems: this.props.cartItems,
    //     currentUserId: this.props.auth.user.id,
    //     currentUserName: this.props.auth.user.name
    //   }
    //   saveCartToDb(data);
    //   // this.props.dispatch({type: LOGOUT});
    // }

    // Message for save cart to DB on "unload" event:
    if (this.props.cartItems.length != 0 && this.props.auth.isAuthenticated) {
      window.addEventListener("beforeunload", function(e) {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', '/user_cart', true);
        xhr.send();       
        e.preventDefault();
        let confirmationMessage = 'You confirm unloud?';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage; 
        }, false);
      // navigator.sendBeacon("/user_cart", data);});
    }

    //for save cart on "unload" event:
    const  saveCart = () => {
      // To local storage:
      if (this.props.cartItems.length != 0) {
        localStorage.setItem('parfumanCart', JSON.stringify(this.props.cartItems));
      }
      else {
        if (localStorage.getItem('parfumanCart')) {
          localStorage.removeItem("parfumanCart");
        }
      }
      // To data base:
      if(this.props.cartItems.length != 0 && this.props.auth.isAuthenticated) {
        const data = {
          cartItems: this.props.cartItems,
          currentUserId: this.props.auth.user.id,
          currentUserName: this.props.auth.user.name
        }
        saveCartToDb(data);
      } 
      if (this.props.cartItems.length == 0 && this.props.auth.isAuthenticated) {
        const data = {
          cartItems: [],
          currentUserId: this.props.auth.user.id,
          currentUserName: this.props.auth.user.name
        }
        saveCartToDb(data);
      }
    };
    return (          
      <Beforeunload onBeforeunload={saveCart}>
        <Router history={newHistory}>
            <Toaster/>
            <Box className={this.props.classes.containerBox}>
                <ScrollUpButton style={{width: 35, height: 35, backgroundColor: 'rgba(255, 152, 0, .5)', borderRadius: '10%', padding: 5}} ToggledStyle={{right: 50, bottom: 60}} />
                <Header/>
                <Box className={this.props.classes.insideContainerBox} id='insideContainerBox'>
                  <Route exact path="/" component={MainPage}/>
                  <Route exact path="/cart" component={Cart}/>
                  <Route exact path="/account" component={Account}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path='/categories' component={Products}/>
                  <Route exact path='/categories/:alias' component={Products}/>
                  <Route exact path="/product/:id" component={ProductDetails}/>
                  <Route exact path="/checkout" component={Checkout}/>
                  <Route path="/profile" component={Profile}/>
                </Box>
                <Footer/>
            </Box>
        </Router>
      </Beforeunload>  
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    cartItems : store.cart,
    auth: store.auth
   }
}

export default connect(mapStoreToProps)(withStyles(styles)(App));