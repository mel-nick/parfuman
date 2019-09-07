import React from 'react';
import {makeStyles} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
        linkIcon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20px',
            height: '20px',
            margin: '0 15px'
        },
        socialNeetworksItemIcon: {
            fontSize: '20px',
            color: theme.palette.secondary.main
        },
        '@media (max-width: 767px)': {
            linkIcon: {
                margin: '0 5px'
            }
        }
    })
);

export default function SocialNetworksItem(props) {
    const classes = useStyles();
    return (
            <a href="#!"  className={classes.linkIcon}>
            <FontAwesomeIcon  icon={props.icon} className={classes.socialNeetworksItemIcon}/>
        </a>
    );

}