import React from 'react';
import { connect } from 'react-redux';
import {incrementCartItem, decrementCartItem, changeInputQnt} from '../../actions/changeCartItemQnt';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReportProblem } from '@material-ui/icons'

function QntSelector(props) {
    
    let toastId = 'warn';

    let notify = () => toast(
        <div className = "toast-wrapper toast-wrapper_red">
            <ReportProblem/>
          <div className = "toast-text">
            Максимальное количество в наличии : {availability}
          </div>
        </div>,
        {
          autoClose: 3000,
          hideProgressBar: true,
          position: toast.POSITION.TOP_CENTER,
          toastId: toastId
        });
      toast.configure()
    
    const { qnt, code, availability, dispatch } = props;

    return (
        <>
            <div className="qnt-selector">
                <input type="text"
                       onChange={(event) => (isNaN(event.target.value) || event.target.value == 0) ? dispatch(changeInputQnt(code, 1)) : +event.target.value > availability ? notify() : dispatch(changeInputQnt(code, event.target.value))}
                       value={qnt}
                       className="qnt-selector-input"/>
                <div className="qnt-change-container">
                    <div className="qnt-change-container__increment" onClick={() => qnt == availability ? notify() :  dispatch(incrementCartItem(code))}>+</div>
                    <div className="qnt-change-container__decrement" onClick={() => dispatch(decrementCartItem(code))}>-</div>
                </div>
            </div>
        </>
    )
    
}

export default connect()(QntSelector);