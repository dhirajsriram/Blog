import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      margin: "auto",
      display:"block",
      width:"30%",
      marginTop:"8%"
    },
  }),
);

export default function Loader() {
  const classes = useStyles();

  return (
    <div className="loader">
      <img className={classes.loader} alt="loader" src={require("../../assets/loader.gif")} /></div>
  );
}