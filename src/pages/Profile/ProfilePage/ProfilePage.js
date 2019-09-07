import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ProfileAddress from '../ProfileAddress/ProfileAddress'
import ProfilePassword from '../ProfilePassword/ProfilePassword'
import { fetchUserAddresses } from '../../../actions/authentication'

const styles = theme => ({
  profilePage: {
    maxWidth: 800,
    margin: 'auto',
  },
  passwordFrom: {
    padding: 40
  },
  addressessForm: {
    padding: 40
  },
  greeting: {
    margin: '20px 0',
    color: '#444'
  },
})

function ProfilePage(props) {
  const { fullname, classes } = props

  return (
    <div className={classes.profilePage}>
      <Typography variant='h5' align='center' className={classes.greeting}>Здравствуйте, {fullname}</Typography>
      <div className={classes.addressessForm}>
        <ProfileAddress />
      </div>
      <div className={classes.passwordFrom}>
        <ProfilePassword />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  fullname: state.auth.user.name,
  user_id: state.auth.user.id,
  isPasswordChanged: state.auth.isPasswordChanged
})
const mapDispathToProps = dispacth => ({
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispathToProps),
)(ProfilePage)