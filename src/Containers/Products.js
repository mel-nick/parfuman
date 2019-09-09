import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as R from 'ramda';
import withStyles from "@material-ui/core/styles/withStyles";
import {CheckCircle} from '@material-ui/icons'
import {fetchProducts} from '../actions/products';
import {fetchCategories} from '../actions/categories';
import {getProducts} from '../selectors/Products';
import {addCartItem} from '../actions/addCartItem';
import arrowDown from './arrow-down.png';
import arrowUp from './arrow-up.png';
import checkMark from './check-mark.png';
import preloaderImg from './preloader.svg'

const styles = (theme) => ({
    productsContainer: {
        display: 'flex',
        width: '100%',
        color: theme.palette.primary.dark
    },
    filtersContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '250px'
    },
    priceSortWrap: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
        overflow: 'hidden',
        borderRadius: '2px',
        backgroundColor: theme.palette.primary.main,
        transition: 'all 0.3s ease'
    },
    priceSortTitle: {
        maxWidth: '100%',
        padding: '10px',
        margin: '7px 0 10px 0',
        backgroundPosition: '85% center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        fontWeight: '500',
        cursor: 'pointer'
    },
    priceSortList: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        padding: '0 10px 10px 10px',
    },
    priceSortButton: {
        display: 'flex',
        cursor: 'pointer',
        padding: '5px 5px 5px 0'
    },
    formBrandsListContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
        overflow: 'hidden',
        borderRadius: '2px',
        backgroundColor: theme.palette.primary.main,
        transition: 'all 0.3s ease'
    },
    'activeBlock': {
        overflow: 'visible',
        backgroundColor: 'blue'
    },

    formBrandTitle: {
        maxWidth: '100%',
        padding: '10px',
        margin: '7px 0 10px 0',
        backgroundPosition: '85% center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        fontWeight: '500',
        cursor: 'pointer'
    },
    formBrandsList: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        height: '605px',
        padding: '0 10px 10px 10px',
        overflow: 'auto',
    },
    checkboxLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0',
        position: 'relative',
        cursor: 'pointer'
    },

    checkboxInput: {
        marginLeft: '15px',
        outline: '0',
        '&:after': {
            content: '""',
            display: 'flex',
            width: '15px',
            height: '15px',
            position: 'absolute',
            right: '0',
            borderRadius: '2px',
            backgroundColor: theme.palette.primary.light,
            boxShadow: '0 0 2px rgba(0, 0, 0, 0.4)',
            cursor: 'pointer'
        },
        '&:checked:after': {
            backgroundImage: 'url(' + checkMark + ')',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    },
    productsItemsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '85%',
    },
    productItemWrap: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '23%',
        maxHeight: '335px',
        padding: '0.7% 1.5% 7% 1.5%',
        margin: '1%',
        border: '1px solid orange',
        borderRadius: '3px',
        transition: 'transform .2s linear',
        position: 'relative',
        '&:hover': {
            transform: 'translateY(-10px)',
        },
    },
    productItem: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },

    descriptionText: {},
    productCategory: {
        width: '48%',
        fontSize: '0.7rem',
        textAlign: 'left',
        color: theme.palette.primary.dark
    },
    productBrand: {
        width: '48%',
        fontSize: '0.7rem',
        textAlign: 'right',
        color: theme.palette.primary.dark
    },
    image: {
        width: '100%',
        height: '150px',
        margin: '15px 0',
        objectFit: 'contain',

    },
    productTitle: {
        width: '100%',
        textAlign: 'left',
        color: theme.palette.primary.dark
    },
    buyButton: {
        padding: '10px',
        position: 'absolute',
        bottom: '10%',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light,
        transition: 'transform .2s linear',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    buyButtonDisabled: {
        padding: '10px',
        position: 'absolute',
        bottom: '10%',
        borderRadius: '4px',
        // cursor: 'pointer',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light,
        opacity: '0.3',
        cursor: 'auto'
    },
    productPrice: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: '12%',
        right: '7%',
        fontWeight: 'bold',
        color: theme.palette.primary.dark
    },

    '@media (max-width: 1199px)': {
        productItemWrap: {
            width: '31.3%',
            paddingBottom: '100px'
        },
    },
    '@media (max-width: 767px)': {
        productItemWrap: {
            width: '48%',
            paddingBottom: '100px'
        },
    },
    '@media (max-width: 480px)': {
        productItemWrap: {
            width: '100%',
            paddingBottom: '100px'
        },
    },
});

class Products extends Component {

    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchCategories();
    }

    constructor(props) {
        super(props);
        this.state = {
            priceAsc: false,
            priceDsc: false,
            imageLoad: false
        }
    }

    handleImageLoaded() {
        this.setState({imageLoad: true});
    }

    renderProduct = (product) => {
        let notify = () => toast(
            <div className="toast-wrapper">
                <CheckCircle/>
                <div className="toast-text">
                    Товар добавлен в корзину
                </div>
            </div>,
            {
                autoClose: 2200,
                hideProgressBar: true,
                position: toast.POSITION.TOP_CENTER
            });
        toast.configure()

        let currentAvailability = product.availability;
        this.props.cart.forEach(element => {
            if (element.code === product.code) {
                currentAvailability -= element.quantity;
            }
        });
        return (
            <div key={product._id}
                 className={this.props.classes.productItemWrap}>
                <Link to={`/product/${product._id}`}>
                    <div className={this.props.classes.productItem}>
                        <p className={`${this.props.classes.productCategory} ${this.props.classes.descriptionText}`}>{product.category}</p>
                        <p className={`${this.props.classes.productBrand} ${this.props.classes.descriptionText}`}>{product.brand}</p>
                        {this.state.imageLoad ? <img className={this.props.classes.image}
                                                     src={`${require('../images/img-products/' + product.img[0])}`}
                                                     alt="product-img"
                                                     onLoad={this.handleImageLoaded.bind(this)}/>
                                                     : <img className={this.props.classes.image}
                                                            src={preloaderImg}
                                                            alt="product-img"
                                                            onLoad={this.handleImageLoaded.bind(this)}/>
                        }
                        <p className={`${this.props.classes.productTitle} ${this.props.classes.descriptionText}`}>{product.title}</p>
                    </div>
                </Link>
                <span
                    className={currentAvailability > 0 ? this.props.classes.buyButton : this.props.classes.buyButtonDisabled}
                    onClick={() => {
                        if (currentAvailability > 0) {
                            this.props.addCartItem({
                                id: product._id,
                                img: product.img[0],
                                brand: product.brand,
                                title: product.title,
                                code: product.code,
                                category: product.category,
                                price: product.price,
                                quantity: 1,
                                availability: product.availability
                            })
                            notify()
                        }
                    }}>Купить</span>
                <Link to={`/product/${product._id}`}>
                    <div>
                        <p className={`${this.props.classes.productPrice} ${this.props.classes.descriptionText}`}>&#8372;{product.price}</p>
                    </div>
                </Link>
            </div>
        );
    };

    renderBrand = (product) => {
        return (
            <label className={this.props.classes.checkboxLabel}
                   key={product._id}>{product.brand}
                <input className={this.props.classes.checkboxInput}
                       type='checkbox'
                       checked={this.props.filter.brand === product.brand}
                       value={product.brand}
                       name={product.brand}
                       onChange={this.handleBrandChange.bind(this)}/>
            </label>
        )
    }

    handleBrandChange = (e) => {
        if (e.target.checked) {
            this.props.setFilter((function (brand) {
                return {filter: (item) => item.brand === brand, brand}
            })(e.target.value))
        } else this.props.setFilter({filter: () => true, brand: false})
    }

    sortByPriceAsc() {
        this.setState({priceDesc: false, priceAsc: true})
    }

    sortByPriceDesc() {
        this.setState({priceAsc: false, priceDesc: true})
    }

    noSort() {
        this.setState({priceAsc: false, priceDesc: false})
    }

    toggleBrandsList(upHeight, downHeight, containerId, titleId) {
        console.log(titleId);
        const title = document.getElementById(titleId);
        const block = document.getElementById(containerId);
        block.classList.toggle('activeBlock');
        if (block.classList.contains('activeBlock')) {
            block.style.height = upHeight;
            title.style.backgroundImage = 'url(' + arrowUp + ')';
        } else {
            block.style.height = downHeight;
            title.style.backgroundImage = 'url(' + arrowDown + ')';
        }
    }

    render() {
        const {products, filter} = this.props;
        const uniqProducts = R.uniqBy(R.prop('brand'), products);
        const sort = R.sortBy(R.prop('brand'));
        const sortedProducts = sort(uniqProducts);

        return (
            <div className={this.props.classes.productsContainer}>
                <div className={this.props.classes.filtersContainer}>
                    <div className={this.props.classes.priceSortWrap}
                         id='form-price-container'
                         style={{height: '50px'}}>
                        <h5 className={this.props.classes.priceSortTitle}
                            id='form-price-title'
                            onClick={this.toggleBrandsList.bind(null, '150px', '50px', 'form-price-container', 'form-price-title')}
                            style={{backgroundImage: 'url(' + arrowDown + ')'}}>Цена</h5>
                        <ul className={this.props.classes.priceSortList} id='price-button-list'>
                            <li className={`${this.props.classes.priceSortUp} ${'priceSortButton'} ${this.props.classes.priceSortButton}`}
                                onClick={this.sortByPriceAsc.bind(this)}>Цены по возрастанию
                            </li>
                            <li
                                className={`${this.props.classes.priceSortDown} ${'priceSortButton'} ${this.props.classes.priceSortButton}`}
                                onClick={this.sortByPriceDesc.bind(this)}>Цены по убыванию
                            </li>
                            <li
                                className={`${this.props.classes.priceSortClear} ${'priceSortButton'} ${this.props.classes.priceSortButton}`}
                                onClick={this.noSort.bind(this)}>Сброс фильтра
                            </li>
                        </ul>
                    </div>
                    <div className={this.props.classes.formBrandsListContainer}
                         id='form-brand-container'
                         style={{height: '50px'}}>
                        <h5 className={this.props.classes.formBrandTitle}
                            id='form-brand-title'
                            onClick={this.toggleBrandsList.bind(null, '605px', '50px', 'form-brand-container', 'form-brand-title')}
                            style={{backgroundImage: 'url(' + arrowDown + ')'}}>Бренды</h5>
                        <form className={this.props.classes.formBrandsList} id='brand-form'>
                            {/*{R.sortBy(R.prop('brand'), products).map((product) => this.renderBrand(product))}*/}
                            {R.uniqBy(R.prop('brand'), sortedProducts).map((product) => this.renderBrand(product))}
                            {/*{R.pipe(console.log('lsdjf'), R.uniqBy(R.prop('brand'), products)).map((product) => this.renderBrand(product))}*/}
                        </form>
                    </div>
                </div>
                <div className={this.props.classes.productsItemsContainer}>
                    {(this.state.priceAsc ? products.slice().sort((a, b) => (a.price - b.price)) :
                        this.state.priceDesc ? products.slice().sort((a, b) => (b.price - a.price)) : products)
                        .filter(filter.filter).map((product) => this.renderProduct(product))}
                </div>
            </div>
            // </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    setFilter: filter => dispatch({type: "SET_FILTER", payload: filter}),
    addCartItem: (data) => dispatch(addCartItem(data))
});

const mapStateToProps = (state, ownProps) => ({
    products: getProducts(state, ownProps),
    filter: state.filter,
    cart: state.cart,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Products));