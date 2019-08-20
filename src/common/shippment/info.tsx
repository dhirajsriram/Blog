import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: "bold"
  },
  id: {
    fontStyle: "italic",
    color: "gray"
  },
  userIcon: {
    fontSize: "2rem"
  },
  media: {
    width: "100%",
    "@media (max-width: 768px)": {
      margin: "20px 0px"
    }
  }
}));

export default function Info(props: any) {
  let shipment = props.shipment;
  const classes = useStyles();
  return (
    <Grid container justify="space-between">
      <Grid item md={10} xs={10}>
        <Typography className={classes.name} variant="h5" component="h5">
          {shipment.name} - #{shipment.id}
        </Typography>
        <Typography className={classes.id} variant="subtitle1" component="p">
        USER : {shipment.userId}
          
        </Typography>
        <Typography variant="subtitle1" component="p">
          
        </Typography>
      </Grid>
    </Grid>
  );
}
