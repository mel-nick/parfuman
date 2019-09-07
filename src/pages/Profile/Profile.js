import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import OrdersPage from './OrdersPage/OrdersPage'
import ProfilePage from './ProfilePage/ProfilePage'
import { withStyles } from '@material-ui/styles'
import { fetchUsersOrders, fetchUserAddresses } from '../../actions/authentication'
import { Tab, Tabs } from '@material-ui/core'

const styles = theme => ({
  profile: {
    padding: '60px 20px',
    maxWidth: 1200,
    margin: '0 auto',
  }
})

const AntTab = withStyles(() => ({
  root: {
    textTransform: 'none',
    color: '#999',
    width: '50%',
    transition: '.4s',
    fontSize: 16,
    '&:hover': {
      color: '#444',
      opacity: 1
    },
    '&$selected': {
      color: '#444',
    },
    '&:focus': {
      color: '#444',
    }
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const AntTabs = withStyles({
  root: {
    width: '100%',
    maxWidth: 320,
    margin: '0 auto',
    borderBottom: '1px solid #e5e5e5'
  },
  indicator: {
    backgroundColor: '#444',
  },
})(Tabs);

class Profile extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchOrders(this.props.user_id)
    this.props.fetchAddresses(this.props.user_id)

    if(!this.props.isAuthenticated){
      this.props.history.push('/register')
    }
  }

  componentDidUpdate(){
    if(!this.props.isAuthenticated){
      this.props.history.push('/register')
    }
  }

  render(){
    const { match: { url }, history, classes } = this.props

    return (
      <div className={classes.profile}>
        <AntTabs value={history.location.pathname} onChange={(evt, value) => history.push(value)}>
          <AntTab value={url} label='Мой профиль' />
          <AntTab value={`${url}/orders`} label='Мои заказы' />
        </AntTabs>
        <Route exact path={url} component={ProfilePage} />
        <Route exact path={`${url}/orders`} component={OrdersPage} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_id: state.auth.user.id,
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (user_id) => dispatch(fetchUsersOrders(user_id)),
  fetchAddresses: (user_id) => dispatch(fetchUserAddresses(user_id)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Profile)
