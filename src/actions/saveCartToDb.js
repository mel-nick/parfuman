import axios from 'axios';

const saveCartToDb = (data) => {
  axios.put('/api/user_cart', data)
    .catch(error => {
      console.log(error);
    }); 
}
export default saveCartToDb;