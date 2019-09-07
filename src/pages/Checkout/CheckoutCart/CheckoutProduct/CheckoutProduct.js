import React from 'react'
import './CheckoutProduct.sass'

function CheckoutProduct({ info, currency }) {
  const { img, title, brand, category, quantity, price } = info
  return (
    <div className='checkoutProduct'>
      <div className='checkoutProduct-img'>
        <img src={require(`../../../../images/img-products/${img}`)} alt='c-img'/>
      </div>
      <div className='checkoutProduct-info'>
        <div>{title}</div>
        <div>Брэнд: {brand}'s</div>
        <div>Категория: {category}</div>
        <div>Количество: {quantity} / {price} {currency}</div>
        <div>{quantity * price} {currency}</div>
      </div>
    </div>
  )
}

export default CheckoutProduct