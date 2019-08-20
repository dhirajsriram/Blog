import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: "bold"
  },
  userIcon: {
    float: "right",
    fontSize: "2rem"
  },
  media: {
    width: "100%",
    "@media (max-width: 768px)": {
      margin: "20px 0px"
    }
  },
  user: {
    textAlign: "right",
    marginTop: 12
  }
}));

export default function Shipping(props: any) {
  let shipment = props.shipment;
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.name} variant="h6" component="h6">
        Shipping
      </Typography>
      <Grid container justify="space-between">
        <Grid item md={6} xs={6}>
          <Typography className={classes.name} variant="subtitle1" component="p">
            Origin
          </Typography>
          <Typography className={classes.name} variant="subtitle1" component="p">
            {shipment.origin}
          </Typography>
        </Grid>
        <Grid item md={6} xs={6}>
          <Typography className={classes.name} variant="subtitle1" component="p">
            Destination
          </Typography>
          <Typography className={classes.name} variant="subtitle1" component="p">
            {shipment.destination}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
