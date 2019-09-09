import React from 'react';
import {makeStyles} from '@material-ui/core';
import {faFacebookF, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';
import SocialNetworksItem from '../SocialNetworksItem/SocialNetworksItem';

const useStyles = makeStyles({
        list: {
            display: 'flex',
            justifyContent: 'center',
            padding: '0 20px',
        },
    }
);

const socialNetworksListData = [
    {
        "href": "#!",
        "icon": faFacebookF
    },
    {
        "href": "#!",
        "icon": faTwitter
    },
    {
        "href": "#!",
        "icon": faInstagram
    },
];

export default function SocialNetworksList() {
    const classes = useStyles();
    let key=0;
    return (
        <div className={classes.list}>
            {socialNetworksListData.map((elem) => {
                return <SocialNetworksItem  key={key++} icon={elem.icon}/>
            })}
        </div>
    );
}

