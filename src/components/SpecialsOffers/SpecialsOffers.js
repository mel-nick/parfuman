import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import specialOffersImg from '../../images/special-offers-1.jpg';

const styles = (theme) => ({
    specialOffer: {
        width: '100%',
        height: '500px',
        position: 'relative',
        backgroundImage: 'url(' + specialOffersImg + ');',
        backgroundPositionY: '5.5%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        [`&:hover .fivePercent--active`]: {
            transition: 'all 700ms cubic-bezier(0.000, 1.650, 0.735, 0.085)',
            padding: '10px 10px',
            marginLeft: '20px',
            fontSize: '4.25rem',
            fontWeight: 'bold',
            color: theme.palette.secondary.contrastText
        }
    },
    specialOfferContainer: {
        display: 'flex',
        padding: '0 100px',
        position: 'relative',
        top: '220px',
        alignItems: 'center',
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        padding: '50px 0',
        position: 'absolute',
        color: theme.palette.secondary.main
    },
    title: {
        fontSize: '2.6rem',
        // marginBottom: '25px'
        transform: 'translateY(-25px)'
    },
    descriptionText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        fontSize: '1.75rem'
    },
    fivePercentText: {
        fontSize: '3.25rem',
        fontWeight: 'normal',
        transition: 'all 500ms cubic-bezier(0.000, 1.650, 0.735, 0.085)',
    },
    onlyToday: {
        marginTop: '25px'
    },
    specialOffersLink: {
        display: 'flex',
        padding: '15px 20px',
        position: 'absolute',
        top: '-30px',
        left: '370px',
        borderRadius: '4px',
        backgroundColor: theme.palette.secondary.contrastText
    },
    specialOffersLinkButton: {
        display: 'flex',
        justifyContent: 'center',
        letterSpacing: '0.01rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: theme.palette.primary.main

    },
    '@media (max-width: 1199px)': {
        specialOffer: {
            height: '450px'
        }
    },
    '@media (max-width: 767px)': {
        specialOffer: {
            backgroundPositionX: '35%',
            [`&:hover .fivePercent--active`]: {
                marginLeft: '0',
                padding: '0 0',
                fontSize: '3rem',
            }
        },
        specialOfferContainer: {
            // maxHeight: '245px',
            top: '200px',
            padding: '50px',
        },
        title: {
            fontSize: '2.2rem',
        },
        descriptionText: {
            fontSize: '1.2rem',
        },
        fivePercentText: {
            fontSize: '3rem',
            color: theme.palette.secondary.contrastText,
            fontWeight: 'bold'
        },
        specialOffersLink: {
            padding: '15px 20px',
            top: '22px',
            left: '230px',
        },
        specialOffersLinkButton: {
            fontSize: '1rem'
        }
    },
    '@media (max-width: 560px)': {
        title: {
            fontSize: '2.1rem',
        },
        specialOffersLink: {
            top: '49px',
            left: '180px',
        }
    },
    '@media (max-width: 420px)': {
        specialOffersLink: {
            top: '41px'
        }
    }
});

class SpecialsOffers extends Component {
    hoverStyle = () => {
        let elem = document.querySelector('#specialOffersBlock');
        let textElem = document.querySelector('#fivePercent');
        elem.addEventListener('mouseenter', () => {
            textElem.classList.add('fivePercent--active');
        });
        elem.addEventListener('mouseleave', () => {
            textElem.classList.remove('fivePercent--active');
        });
    };

    render() {
        return (
            <section className={this.props.classes.specialOffer} id='specialOffersBlock' onMouseEnter={this.hoverStyle}>
                <div className={this.props.classes.specialOfferContainer}>
                    <div className={this.props.classes.description}>
                        <h3 className={this.props.classes.title}>
                            Специальное предложение
                        </h3>
                        <p className={this.props.classes.descriptionText}>
                            <span className={this.props.classes.fivePercentText} id='fivePercent'>-5%</span>
                            <span className={this.props.classes.onlyToday}>Только сегодня, на любую покупку</span>
                        </p>
                    </div>
                    <Link to="/categories" className={this.props.classes.specialOffersLink}>
                            <span className={this.props.classes.specialOffersLinkButton}>
                                Купить
                            </span>
                    </Link>
                </div>
            </section>
        );
    }
}

export default withStyles(styles)(SpecialsOffers);