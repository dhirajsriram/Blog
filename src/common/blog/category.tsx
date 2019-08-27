import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      verticalAlign:'bottom'
    },
    chip: {
      marginTop: 12,
    },
  }),
);

const Category = (props:any) => {
  const classes = useStyles();

  function handleDelete() {
    props.history.push("/")
  }

  return (
    <div className={classes.root}>
    <Chip
    label={decodeURIComponent(props.category)}
    onDelete={handleDelete}
    className={classes.chip}
    color="primary"
  /></div>
  );
}

export default withRouter(Category);