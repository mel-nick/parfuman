import React, { Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '4px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    color: 'black',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: 'rgba(121, 245, 50, 0.3)',
      borderColor: 'rgba(121, 245, 50, 0.6)',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'rgba(121, 245, 50, 0.8)',
      borderColor: 'green',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(121, 245, 50, 0.4)',
    },
  },
})(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedButtons() {
  const classes = useStyles();
  return (
    <Fragment>
      <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
        Оформить заказ
      </BootstrapButton>
    </Fragment>
  );
}