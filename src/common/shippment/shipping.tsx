import React from "react";
import { Grid, Typography, makeStyles, Icon } from "@material-ui/core";
import Status from "../status/status";

const useStyles = makeStyles(theme => ({
  heading: {
    padding: "10px 10px",
    fontWeight: "bold",
    background: "#d3d3d361",
    borderRadius: 5
  },
  shippingContainer: {
    marginTop: 40
  },
  shipping: {
    marginTop: 40
  },
  mode:{
    fontSize:40,
    color:"gray"
  },
  image: {
    width: 100,
    "@media (max-width: 768px)": {
      width: 50
    }
  },
  location: {
    fontSize: 15,
    marginBottom: 20
  }
}));

export default function Shipping(props: any) {
  let shipment = props.shipment;
  const classes = useStyles();
  return (
    <div className={classes.shippingContainer}>
      <Typography className={classes.heading} variant="subtitle1" component="p">
        Shipping
      </Typography>
      <Grid container justify="space-between" className={classes.shipping}>
        <Grid item md={4} xs={4}>
          <Typography align="center" variant="subtitle1" component="p">
            <img src={require("../../assets/box.png")} alt="box" className={classes.image} />
          </Typography>
          <Typography className={classes.location} align="center" variant="subtitle1" component="p">
            {shipment.origin}
          </Typography>
        </Grid>
        <Grid item md={4} xs={4}>
          <Typography align="center" variant="subtitle1" component="div">
            <Icon className={classes.mode}>{shipment.mode === "sea" ? "directions_boat" : "flight"}</Icon>
            <hr />
            {shipment.mode.toUpperCase()}
           
          </Typography>
          
        </Grid>
        <Grid item md={4} xs={4}>
          <Typography align="center" variant="subtitle1" component="p">
            <img src={require("../../assets/location.png")} alt="box" className={classes.image} />
          </Typography>
          <Typography className={classes.location} align="center" variant="subtitle1" component="p">
            {shipment.destination}
          </Typography>
        </Grid>
      </Grid>
      <Status status={shipment.status} />
    </div>
  );
}
