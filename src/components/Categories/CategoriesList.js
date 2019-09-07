import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";

const styles = (theme) => ({
  listItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
    listStyle: 'none',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    margin: '10px 0',
    borderBottom: '0 solid transparent',
    textAlign: 'right',
    letterSpacing: '0.02rem',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
    transition: 'all 0.2s ease',
    '&:after': {
      content: "''",
      width: '100%',
      height: '2px',
      marginTop: '2px',
      backgroundColor: 'transparent',
      transition: 'all 0.2s ease'
    },
    '&:hover:after': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  '@media (max-width: 991px)': {
    link: {
      fontSize: '14px',
    }
  },
});

class CategoriesList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      hasErrored: false,
      products: [],
    };
  }

  componentDidMount() {
    axios.get('/categories')
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((error) => {
        this.setState({ hasErrored: true });
        console.log(error);
      })
      .finally(this.setState({ isLoading: false }));
  }

showCategory() {
      console.log(_.uniqBy(this.state.products, 'category'));
    return (
        _.uniqBy(this.state.products, 'category').map((item) => (
          <li key={item.code} className={`${this.props.classes.listItem} ${'menu-list--item'}`}>
            <Link to={'#!'} className={`${this.props.classes.link} ${'menu-list--item--link'}`}>
              {item.category}
            </Link>
          </li>
          )
      )
    )
}

  render() {
    return (
        this.showCategory()
    );
  }
}
export default withStyles(styles)(CategoriesList);
// export default CategoriesList;
