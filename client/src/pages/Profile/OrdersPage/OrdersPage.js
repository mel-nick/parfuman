import React from 'react'
import { connect } from 'react-redux'
import CheckoutProduct from '../../Checkout/CheckoutCart/CheckoutProduct/CheckoutProduct'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  orderBlock: {
    maxWidth: 800,
    padding: '5px 10px',
    margin: 'auto',
    marginBottom: 40
  },
  orderTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
    fontWeight: 700,
    fontSize: 20,
    '& span': {
      color: '#551a8b'
    }
  },
  title: {
    margin: '20px 0',
    color: '#444'
  },
  '@media (max-width: 959.5px)': {
    orderBlock: {
      padding: 0
    },
    orderTotal: {
      paddingLeft: 10
    }
  }
}))

function OrderPage(props) {
  const classes = useStyles()

  const { isFetching, orders } = props
  const total = (arr) => arr.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
  const fetching = isFetching && orders.length < 1 ? <div>Loading...</div> : null
  const mapOrders = orders.map((item, itemI) =>
    <Card className={classes.orderBlock} key={itemI}>
      {item.map((p, i) => <CheckoutProduct key={i} info={p} currency='грн.'/>)}
      <div className={classes.orderTotal}>
        Итог <span>{total(item)} грн.</span>
      </div>
    </Card>
  )
  const userOrders = orders.length < 1 ?
    <Typography variant='subtitle1' component='h2' align='center' children='У вас пока нет заказов'/> :
     mapOrders

  return (
    <div className='profileOrders'>
      <Typography
        variant='h5'
        component='h2'
        className={classes.title}
        align='center'
        children='Мои заказы'/>
      <div>
        {fetching}
        {userOrders}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  orders: state.auth.orders,
  user_id: state.auth.user.id,
  isFetching: state.auth.isFetching
})

export default connect(mapStateToProps, null)(OrderPage)
