import React, { Component, useState, useEffect } from 'react'
import './ProfileAddress.sass'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { createTextMask } from 'redux-form-input-masks'
import { Button, Typography } from '@material-ui/core'
import { validate } from '../../../validation/checkout'
import { changeAddresses } from './../../../actions/authentication'
import CustomTextField from '../../Checkout/CustomTextField/CustomTextField'

const phoneMask = createTextMask({ pattern: '9 (99) 999 99 99' })

class ProfileShippingAddress extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
    }
  }

  render() {
    const { handleSubmit, changeAddresses, invalid, submitting, pristine, user_id } = this.props
    const { firstname, lastname, ...rest } = this.props.addresses
    const { open } = this.state
    const isValues = this.props.addresses['firstname'].length

    const FormsPreview = ({ content }) => (
      <div className={'profileShippingAddress-preview'}>
        {Object.entries(content).map(([key, value]) => <Typography variant='body1' key={key} children={value} />)}
      </div>
    )

    const preview = isValues && <FormsPreview content={{ fullname: `${firstname} ${lastname}`, ...rest }} />

    const submit = async (data) => {
      await changeAddresses({addresses: data}, user_id)
      this.setState({ open: false })
    }

    return (
      <div className={`profileShippingAddress ${isValues ? '' : (!open &&'toAdd')} ${open ? 'expand' : ''}`}>
        <Typography variant='h6' paragraph={open} children={'Адрес Доставки'} />
        {open ? <div>
          <form onSubmit={handleSubmit(submit)} className='profileShippingForm'>
            <div className='profileShippingForm-fields'>
              <Field name='firstname' label='Имя' component={CustomTextField} />
              <Field name='lastname' label='Фамилия' component={CustomTextField}  />
              <Field name='address' label='Адрес' component={CustomTextField} />
              <Field name='city' label='Город' component={CustomTextField} />
              <Field name='email' label='E-mail адрес' type='email' component={CustomTextField} />
              <Field name='phone' label='Моб. телефон' type='tel' component={CustomTextField} {...phoneMask}/>
            </div>
            <div className='profileShippingForm-buttons'>
              <Button variant='contained' onClick={() => this.setState({ open: false })} children='Отменить' />
              <Button type='submit'variant='contained' color='secondary' disabled={invalid || submitting || pristine}>
                Сохранить
              </Button>
            </div>
          </form>
        </div> : preview}
        {!open &&
          <Button
            variant='contained'
            className='expandForm'
            onClick={() => this.setState({ open: true })}
            children={isValues ? 'Изменить' : 'Добавить'} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialValues: state.auth.addresses,
  addresses: state.auth.addresses,
  user_id: state.auth.user.id
})
const mapDispatchToProps = dispatch => ({
  changeAddresses: (data, user_id) => dispatch(changeAddresses(data, user_id))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'profile-addresses',
    validate,
    enableReinitialize: true
  })
)(ProfileShippingAddress)