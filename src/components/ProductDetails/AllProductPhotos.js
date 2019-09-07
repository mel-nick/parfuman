import React, { Component } from 'react';
import {connect} from 'react-redux'

class AllProductPhotos extends Component {
    render() {
        const { img } = this.props
        return (
            img.map(item => {
                return (<div key={item} style={{backgroundImage:`url(${require(`../../images/img-products/${item}`)})`}} data-url={item} alt="product-img" className={this.props.active === item ? "all-photos-block__image all-photos-block__image_active" : "all-photos-block__image"} onClick={this.props.change}></div>)
            })
        )
    }
}
const mapStoreToProps = (store) => {
    return {
        img: store.data.img
    }
}
export default connect(mapStoreToProps)(AllProductPhotos)