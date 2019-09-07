import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  fs: {
    fontSize: 14,
    color: 'grey'
  },
  fs1: {
    fontSize: 14,
    color: 'black'
  }
}));

  function SimpleBreadcrumbs(props) {
  const classes = useStyles();
  const {data} = props
  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link to = {'/'} className={classes.fs}>
            Главная
          </Link>
          <Link to = {`/categories/${data.alias}`}className={classes.fs}>
            {data.category}
          </Link>
          <Typography className={classes.fs1}>{data.title}</Typography>
        </Breadcrumbs>
      </Paper>
      <br />
    </div>
  );
}

const mapStoreToProps = ({data}) => {
  return {
    data
  }
}

export default connect(mapStoreToProps)(SimpleBreadcrumbs)