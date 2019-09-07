import React, {Component} from 'react';
import AccountBox from '@material-ui/icons/AccountBox';
import {withStyles} from '@material-ui/styles';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhoneSquare} from '@fortawesome/free-solid-svg-icons'

const styles = (theme) => ({
    contactInfoBlock: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: '3'
    },
    contactIconButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        color: theme.palette.primary.dark
    },
    contactIcon: {
        fontSize: '20px'
    },
    contactInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '180px',
        'max-height': '0px',
        position: 'absolute',
        top: '45px',
        right: '5px',
        zIndex: '3',
        overflow: 'hidden',
        borderRadius: '5px',
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        fontSize: '12px',
        color: theme.palette.primary.dark,
        transition: 'all 0.3s ease',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.4)'

    },
    phone: {
        display: 'flex',
        position: 'relative',
        whiteSpace: 'nowrap',
        color: theme.palette.primary.dark,
    },
    address: {

    },
    '@media (max-width: 767px)': {
        contactInfoBlock: {
            right: '40px',
        }
    }
});

class ContactInfo extends Component {
        toggleMenu = () => {
            const contacts = document.querySelector('#contactInfo');
            getComputedStyle(contacts).getPropertyValue('max-height') === '0px'
                ? contacts.style.cssText = 'max-height: 200px; padding: 15px; border: 1px solid; opacity: 1'
                : contacts.style.cssText = 'max-height: 0; padding: 0; opacity: 0.1';
        };
    render() {
        document.addEventListener('click', (event) => {
            const contacts = document.querySelector('#contactInfo');
            const target = event.target;
            if((target.parentElement.getAttribute('id') !== 'contactIcon') && (target.tagName !== 'svg' && target.getAttribute('id') !== 'contactIcon')) {
                contacts.style.cssText = 'max-height: 0; padding: 0; opacity: 0.1';
            }
        });
        return (
            <article className={this.props.classes.contactInfoBlock}>
                <span className={this.props.classes.contactIconButton} onClick={this.toggleMenu} title="Контакты">
                    <FontAwesomeIcon icon={faPhoneSquare} size="1x" className={this.props.classes.contactIcon} id='contactIcon'/>
                </span>
                <div className={this.props.classes.contactInfo} id='contactInfo'>
                    <a href="tel:380800908070" className={this.props.classes.phone}>0-800-90-80-70</a>
                    <address className={this.props.classes.address}>
                        г.Киев, ул.Центральная 1, оф.111
                        <br/>
                        parfuman@parfuman.com
                    </address>
                </div>
            </article>
        );
    }
}

export default withStyles(styles)(ContactInfo);