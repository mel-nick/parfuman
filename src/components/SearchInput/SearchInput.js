import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { maxWidth } from '@material-ui/system';
import searchIcon from './magnifying-glass.png'
import withStyles from "@material-ui/core/styles/withStyles";
import SearchResultWindow from "../SearchResultWindow/SearchResultWindow"
import {changeInputValue, changeDisplayResult} from '../../actions/searchInput'
import { connect } from 'react-redux'

const styles = (theme) => ({
    searchForm: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '250px',
        position: 'relative',
        zIndex: '3'
    },
    searchInput: {
        boxSizing: 'border-box',
        width: '100%',
        padding: '8px 37px 9px 15px',
        borderRadius: '2px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        // backgroundImage: 'url(' + searchIcon + ');',
        boxShadow: '0 0 4px 1px rgba(0,0,0,0.1)',
        '&::-webkit-search-cancel-button': {
            display: 'none'
        },

        '&::-ms-clear': {
            display: 'none'
        },
        '&:hover': {
            boxShadow: '0 0 7px 2px rgba(0,0,0,0.1), inset 0 0 1px 0px rgba(0,0,0,0.2)',
        },
        '&:focus': {
            boxShadow: 'inset 0 0 4px 1px rgba(0,0,0,0.1), inset 0 0 2px 1px rgba(255,224,130,0.8)',
            // boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.3)',
            // theme.palette.secondary.light
            // outline: '1px solid' + theme.palette.secondary.light
        }
    },
    searchSubmit: {
        position: 'absolute',
        right: '5px',
        width: '16px',
        height: '16px',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'transparent',
        backgroundImage: 'url(' + searchIcon + ');',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transition: 'all 0.1s ease',

        '&:hover': {
            opacity: '0.5'
        }
    },
    searchResult: {
        position: 'absolute',
        top: '60px',
        left: '0',
        maxHeight: '400px',
        backgroundColor: "white",
        zIndex: 3,
        border: '2px solid rgb(220, 220, 220)',
        overflow: 'scroll',
    },
    '@media (max-width: 767px)': {
        searchForm: {
            marginRight: '70px'
        }
    }
})
    ;


class SearchInput extends Component {
    render() {
        const {inputVal, displayResult,changeInputValue,changeDisplayResult} = this.props
        return (
            <>
                <form action="" method="" className={this.props.classes.searchForm}>
                    <input type="search" placeholder="Поиск" value={inputVal} onFocus = {() => changeDisplayResult(true)} onBlur = {()=>changeDisplayResult(false)} onChange={(e) => changeInputValue(e.target.value) } className={this.props.classes.searchInput} />
                    <input type="submit" value="" className={this.props.classes.searchSubmit} />
                </form>
                {inputVal.length > 1 && displayResult == true ? <div className ={this.props.classes.searchResult}><SearchResultWindow/></div> : null}
            </>
        );
    }
}

const mapStoreToProps = (store) => {
    return {
        inputVal: store.searchInput.value,
        displayResult: store.searchInput.display
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue: (value) => dispatch(changeInputValue(value)),
        changeDisplayResult: (flag) => dispatch(changeDisplayResult(flag)),
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(withStyles(styles)(SearchInput));


