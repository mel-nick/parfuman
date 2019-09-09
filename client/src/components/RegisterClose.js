import React, { Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: 0,
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        color: '#ff8f00',
        fontWeight: 'bold',
        border: 'none',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&:active': {
            backgroundColor: 'transparent',
        },
        '&:focus': {
            backgroundColor: 'transparent',
            outline: 'none'
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
            <BootstrapButton variant="contained" color="primary" disableRipple >
                &#10006;
            </BootstrapButton>
        </Fragment>
    );
}