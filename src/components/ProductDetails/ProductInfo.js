import React, { Component } from 'react';
import { connect } from 'react-redux'
import ToCartBlock from './toCartBlock'

class ProductInfo extends Component {

    render() {
        const { data } = this.props
        return (
            <>
                <p className="info-block__title">{data.title}</p>
                {data._id === '5d322b5b5cdb8129545bae44' ?
                    <div className="info-block__price-container">
                        <p className="info-block__price info-block__price_crossed"> &#8372;{Math.floor(data.price / 70 * 100)}</p>
                        <p className="info-block__price info-block__price_sale"> &#8372;{data.price}</p>
                        <div className="info-block__sale-percent">-30%</div>
                    </div>
                    :
                    <p className="info-block__price"> &#8372;{data.price}</p>}
                <ToCartBlock />
                <p className="info-block__description">{data.description}</p>
                <p className="info-block__brand"> - Бренд : {data.brand}</p>
                <p className="info-block__code"> - Артикул : {data.code}</p>
            </>
        )
    }
}

const mapStoreToProps = ({ data }) => {
    return {
        data
    }
}
export default connect(mapStoreToProps)(ProductInfo)