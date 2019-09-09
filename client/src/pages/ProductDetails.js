import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions/loadProductData'
import Preloader from '../components/ProductDetails/Preloader'
import '../styles/ProductDetails/main.scss'
import ProductDetailsMain from '../components/ProductDetails/ProductDetailsMain'
import { changeQuantity } from '../actions/quantity'
import {changeDisplayResult,changeInputValue} from '../actions/searchInput'
import { withRouter } from 'react-router-dom'

class ProductDetails extends Component {
   

    componentDidMount() {
        const { getData, changeDisplayResult,changeInputValue } = this.props
        getData(this.props.match.params.id)
        changeDisplayResult(false)
        changeInputValue('')
    }

    componentDidUpdate(prevProps) {
        const {changeDisplayResult,changeInputValue} = this.props
        if (prevProps.match.params.id !== this.props.match.params.id) {
            const { getData } = this.props
            getData(this.props.match.params.id)
        }
        changeDisplayResult(false)
        changeInputValue('')
    }


    componentWillUnmount() {
        const { changeQuantity, cart } = this.props
        changeQuantity(1)
        if (cart.length !== 0)
            localStorage.setItem('parfumanCart', JSON.stringify(cart));
        else {
            if (localStorage.getItem('parfumanCart')) {
                localStorage.removeItem("parfumanCart");
            }
        }
    }

    render() {
        const { isLoading } = this.props
        if (isLoading) {
            return <Preloader />
        }
        return (
            <>
                <ProductDetailsMain />
            </>

        )
    }
}

const mapStoreToProps = (store) => {
    return {
        isLoading: store.loading,
        cart: store.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (id) => dispatch(getData(id)),
        changeQuantity: (quantity) => dispatch(changeQuantity(quantity)),
        changeDisplayResult: (flag) => dispatch(changeDisplayResult(flag)),
        changeInputValue: (value) => dispatch(changeInputValue(value)),
    }
}


export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(ProductDetails));