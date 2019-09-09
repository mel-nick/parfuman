export const validate = (inputs) => {
  const errors = {};
  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

  const { firstname, lastname, city, address, email, phone } = inputs
  const { cardnumber, exp, cvv } = inputs

  if (!firstname) {
    errors.firstname = 'Введите ваше имя'
  } else if (firstname.length < 2) {
    errors.firstname = 'Запись слишком короткая'
  }

  if (!lastname) {
    errors.lastname ='Введите вашу фамилию'
  } else if (lastname.length < 2) {
    errors.lastname = 'Запись слишком короткая'
  }


  if (!city) {
    errors.city = 'Введите ваш город'
  } else if (city.length < 2) {
    errors.city = 'Укажите действительный город'
  }

  if (!address) {
    errors.address = 'Введите ваш адрес'
  } else if (address.length < 2) {
    errors.address = 'Укажите действительный адрес'
  }

  if (!email) {
    errors.email = 'Введите ваш почтовый адрес'
  } else if (!emailReg.test(email)) {
    errors.email = 'Укажите действительный почтовый адрес'
  }

  if (!phone) {
    errors.phone = 'Введите ваш мобильный телефон'
  } else if (phone.length <= 9) {
    errors.phone = 'Укажите действительный мобильный телефон'
  }


  if(!cardnumber || cardnumber.length < 16) errors.cardnumber = 'Введите номер вашей карты'
  if(!exp || exp.length < 4) errors.exp = 'Введите дату прекращение срока действия'
  if(!cvv || cvv.length < 4) errors.cvv = 'Введите секретный код'

  return errors
};