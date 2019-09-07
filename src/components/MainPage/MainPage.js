import React from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from "@material-ui/core";
import Header from '../Header/Header';
import CardMenu from '../CardMenu/CardMenu';
import Footer from '../Footer/Footer';
import Stock from "../Stock/Stock";
import SpecialsOffers from '../SpecialsOffers/SpecialsOffers';
import AdvantagesList from '../AdvantagesList/AdvantagesList';
import Slider from "../Slider/Slider";
import {Link} from "react-router-dom";
import { spacing } from '@material-ui/system';


const useStyles = makeStyles({
        mainPage: {
            padding: '0 20px',
            fontFamily: 'Roboto, sans-serif'
        }
    }
);
export default function MainPage(props) {
    const classes = useStyles();
    return (
        <Container className={classes.mainPage} maxWidth="xl">
            <Slider />
            <CardMenu/>
            <AdvantagesList/>
            <SpecialsOffers/>
            <Stock/>
        </Container>
    );
}

