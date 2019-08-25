    
import React from "react";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles, Theme, createStyles, IconButton, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function FourZeroFour(props:any) {
  const useStyles = makeStyles((theme: Theme) =>
  {
      return createStyles({
        loader: {
          margin: "auto",
          display: "block",
          paddingTop: "8%"
        },
        content :{
          fontWeight:"normal"
        },
        warningIcon: {
          color:"red",
          fontSize: "15rem !important" 
        }
      });
    },
);
const classes = useStyles();
  return (
    <div className={classes.loader}>
      <Typography variant="h3" className={classes.content} gutterBottom align="center">
        <WarningIcon className={classes.warningIcon}/>
        <br />
        404
      </Typography>
      <Typography variant="subtitle1" component="p" className={classes.content} gutterBottom align="center">
        The page you are looking for does not exist <br/> Kindly navigate to a valid url using the button below
      </Typography><br/>
      <Typography align="center">
      <Link to="/" className="default-text"><IconButton><Icon>home</Icon></IconButton></Link></Typography>
    </div>
  );
}