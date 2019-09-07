import React, { useState } from 'react'
import './ProfilePassword.sass'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import CustomTextField from './../../Checkout/CustomTextField/CustomTextField'
import { changeUserPassword } from './../../../actions/authentication'
import { notify } from './../../Toaster/Toaster'
import { profile as validate } from '../../../validation/profile'

const SubmitButton = withStyles(() => ({
  root: {
    color: '#fff'
  }
}))(Button)

const ToggleButtons = withStyles(() => ({
  root: {
    background: '#fff',
    color: '#444',
    marginRight: 10
  }
}))(Button)

function ProfilePassword(props) {

  const [open, setOpen] = useState(false)
  const { changePassword, handleSubmit, invalid, submitting, pristine } = props

  const submit = async (data) => {
    await changePassword(data, props.user_id)
    if(props.isPasswordChanged){
      notify('success', 'Пароль успешно изменен')
    }else{
      notify('error', 'Предыдущий пароль не совподает')
    }
  }

  return (
    <div className={!open ? 'profilePassword-inline' : ''}>
      <Typography variant='h6' children={'Изменить Пароль'} className='profilePassword-title'/>
      {open ?
      <form onSubmit={handleSubmit(submit)} className={'profilePassword'}>
        <Field name='prevpassword' label='Предыдущий Пароль' component={CustomTextField} />
        <Field name='newpassword' label='Новый Пароль' component={CustomTextField} />
        <div className='profilePassword-formButtons'>
          <ToggleButtons variant='contained' children='Отмена' onClick={() => setOpen(false)} />
          <SubmitButton
            type='submit'
            variant='contained'
            color='secondary'
            disabled={invalid || submitting || pristine}
            children='Изменить Пароль' />
        </div>
      </form> :
      <ToggleButtons variant='contained' className='trigger' children='Изменить Пароль' onClick={() => setOpen(!open)} />}
    </div>
  )
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id,
  isPasswordChanged: state.auth.isPasswordChanged
})
const mapDispathcToProps = dispatch => ({
  changePassword: (data, user_id) => dispatch(changeUserPassword(data, user_id)),
})

export default compose(
  connect(mapStateToProps, mapDispathcToProps),
  reduxForm({
    form: 'profile-password',
    validate
  })
)(ProfilePassword)