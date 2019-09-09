import React from 'react';
import {connect} from 'react-redux';
import {getCategories} from '../selectors/Products';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
        listItem: {
            display: 'flex',
            justifyContent: 'flex-end',
            listStyle: 'none',
            fontWeight: 'bold'
        },
        link: {
            display: 'flex',
            flexDirection: 'column',
            padding: '5px',
            textDecoration: 'none',
            color: theme.palette.primary.dark,
            textAlign: 'right',
            whiteSpace: 'nowrap',
            letterSpacing: '0.02rem',
            fontSize: '16px',
            borderBottom: '0 solid transparent',
            transition: 'all 0.2s ease',
            '&:hover': {
                color: theme.palette.primary.dark
            },
            '&:after': {
                content: "''",
                width: '100%',
                height: '2px',
                marginTop: '2px',
                backgroundColor: 'transparent',
                transition: 'all 0.2s ease'
            },
            '&:hover:after': {
                backgroundColor: theme.palette.secondary.main,
            }
        },
        '@media (max-width: 991px)': {
            link: {
                fontSize: '0.8rem',
            }
        },
        '@media (max-width: 767px)': {
            listItem: {
                marginBottom: '20px',
            },
            link: {
                padding: '5px 10px 5px 10%',
                fontSize: '1rem',
            }
        }
    }
));


const Categories = (props) => {
    const classes = useStyles();
    const {Categories} = props;
    const renderCategory = (item) => {
        return (
            <li key={item._id} className={`${classes.listItem} ${'menu-list--item'}`}>
                <Link onClick={()=>{props.setFilter({filter:()=>true,brand:false})}}
                      to={`/categories/${item.alias}`}
                      className={`${classes.link} ${'menu-list--item--link'}`}>{item.category}</Link>
            </li>
        );
    };

    const renderAllCategory = () => {
        return (
            <li key={320099887} className={`${classes.listItem} ${'menu-list--item'}`}>
                <Link onClick={()=>{props.setFilter({filter:()=>true,brand:false})}} to="/categories" className={`${classes.link} ${'menu-list--item--link'}`}>Каталог</Link>
            </li>
        );
    };

    return (
        <>

            {renderAllCategory()}
            {Categories.map((category) => renderCategory(category))}

        </>
    );
};

const mapStateToProps = (state) => ({
    Categories: getCategories(state),
});
const mapDispatchToProps = (dispatch)=>({
    setFilter: filter=>dispatch({type:"SET_FILTER",payload:filter})
});

export default compose(withRouter, connect(mapStateToProps,mapDispatchToProps))(Categories);