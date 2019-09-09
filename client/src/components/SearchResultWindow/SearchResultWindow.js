import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import './SearchWindow.scss'

function SearchResultWindow(props) {
    const { products, inputVal } = props
    let productsArr = []
    for (let key in products) {
        productsArr.push(products[key])
    }
    let match = false
     return (
        productsArr.map((elem,i)=> {
            if (elem.title.toUpperCase().includes(inputVal.toUpperCase()) || elem.category.toUpperCase().indexOf(inputVal.toUpperCase()) === 0) {
            match = true
                return <Link key={elem._id} onMouseDown={event => event.preventDefault()}  to={`/product/${elem._id}`}>
                        <div className="search-window">
                            <div className="search-window__img" style = {{backgroundImage: `url(${require(`../../images/img-products/${elem.img[0]}`)})`}}></div>
                            <div className="search-window__info-container">
                            <div className="search-window__title">{elem.title}</div>
                            <div className="search-window__category">{elem.category}</div>
                            </div>
                            <div className="search-window__price">&#8372;{elem.price}</div>
                        </div>
                    </Link>
            } else if(i === productsArr.length - 1 && match === false) return <div className= "search-window__title search-window__title_not-found">Нет результатов</div>
        })
    )  
}

const mapStoreToProps = (store) => {
    return {
        products: store.product,
        inputVal: store.searchInput.value,
    }
}


export default withRouter(connect(mapStoreToProps)(SearchResultWindow));


