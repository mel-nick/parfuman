import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
        logoWrap: {
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
        },
        logoTitle: {
            fontSize: '2.8rem',
            fontWeight: 'bold',
            letterSpacing: '0.2rem',
            textShadow: '1px 1px 2px rgba(231,166,26,1)',
            color: theme.palette.secondary.main
        },
        '@media (max-width: 767px)': {
            logoWrap: {
                position: 'absolute',
                top: '-31px',
            },
            logoTitle: {
                marginTop: '5px',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.1rem',
                fontSize: '1.1rem',
            }
        }
    })
);

export default function Logo(props) {
    const classes = useStyles();
    return (
        <Link to='/' className={classes.logoWrap}
              style={props.footer ? {position: 'relative', top: '0'} : null}
        >
            
            <span className={classes.logoTitle}
                  style={props.footer ? {fontSize: '1.1rem'} : null}>
                ParfuMan
            </span>
        </Link>
    );
}