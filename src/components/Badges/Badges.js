import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import {withTheme, withStyles} from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const styles = (theme) => ({
   
    badgeWrapBlock: {
        outline: 'none !important',
        color: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: 'transparent',
        }
    },
    badge: {
        top: '50%',
        right: '-1px',
        border: theme.palette.primary.dark,
    },
    badgeIcon: {
        width: '24px',
        height: '24px'
    },
    '@media (max-width: 767px)': {
       
    }
});

class CustomizedBadges extends Component {
    render() {
        const cartArj = this.props.cartItems
        let qntInCart = 0;
        if (cartArj)
        cartArj.map(item => {            
            qntInCart = qntInCart + item.quantity;
        });
        return (
            <Link to={'/cart'} className={this.props.classes.badgeLinkWrap} title="Корзина">
            <IconButton aria-label="Cart" className={this.props.classes.badgeWrapBlock}>
                <Badge badgeContent={qntInCart} className={this.props.classes.badge}>
                    <ShoppingCartIcon className={this.props.classes.badgeIcon}/>
                </Badge>
            </IconButton>
            </Link>
        )
    }
}
const mapStoreToProps = (store) => {
    return {
        cartItems: store.cart        
       }
}
export default connect(mapStoreToProps)(withStyles(styles)(CustomizedBadges));
