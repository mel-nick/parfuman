import React, { useState } from 'react'
import './CheckoutCart.sass'
import { connect } from 'react-redux'
import { useMediaQuery } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import CheckoutProduct from './CheckoutProduct/CheckoutProduct'

function CheckoutCart(props) {

  const match = useMediaQuery('(max-width: 959.5px)')

  const [expand, setExpand] = useState(false)
  const total = props.cart.reduce((acc, curr) =>  acc + (curr.price * curr.quantity), 0)
  const mapCart = props.cart.length && props.cart.map((item, i) => <CheckoutProduct key={i} currency={'грн.'} info={item}/>)

  return (
    <div className='checkoutCartMain'>
      <div className='checkoutCartHeader' onClick={match ? () => setExpand(!expand) : null}>
        <div className='checkoutSummary'>
          Итог <span>{total} грн.</span>
        </div>
        <div className='expandCheckoutCart' children={expand ? <ExpandLess/> : <ExpandMore />} />
      </div>

      <div
        className={`checkoutCartMainContent ${expand ? 'expand' : ''}`}
        children={mapCart}  />
    </div>
  )
}

const mapStateToProps = state => ({
    cart: state.cart,
})

export default connect(mapStateToProps, null)(CheckoutCart)