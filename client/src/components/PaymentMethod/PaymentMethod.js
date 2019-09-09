import React, {Component, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCcVisa, faCcMastercard,} from '@fortawesome/free-brands-svg-icons';



// const useStyles = makeStyles({
//     jo: {
//         color: 'blue'
//     }
//
// });
// const classes = @injectSheet(makeStyles({
//     jo: {
//         color: 'blue'
//     }
//
// }));
export default function PaymentMethod(props) {


        return <h1>Привет, {props.name}</h1>;

}
