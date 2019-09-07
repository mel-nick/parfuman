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
      backgroundColor: 'rgba(252, 165, 0, 0.2)',
      borderColor: 'rgba(252, 5, 5, 0.3)',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'rgba(252, 165, 0, 0.6)',
      borderColor: 'orange',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(252,165,0,.5)',
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
        Закрыть
      </BootstrapButton>
    </Fragment>
  );
}