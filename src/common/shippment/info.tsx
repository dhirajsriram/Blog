import React from 'react';
import { Grid, Typography, Icon, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    name: {
      fontWeight: "bold"
    },
    userIcon:{
      float:"right",
      fontSize:"2rem"
    },
    media: {
      width: "100%",
      "@media (max-width: 768px)": {
        margin: "20px 0px"
      }
    },
    user:{
      textAlign:"right",
      marginTop:12,
    }
  }));

export default function Info(props:any) {
  let shipment = props.shipment
  const classes = useStyles();
  return (
            <Grid container justify="space-between">
              <Grid item md={10} xs={12}>
                <Typography
                  className={classes.name}
                  variant="h5"
                  component="h5"
                >
                  {shipment.name}
                </Typography>
                <Typography variant="subtitle1" component="p">
                  ID : {shipment.id}
                </Typography>
              </Grid>
              <Grid item md={2} xs={12}>
                <Icon className={classes.userIcon}>account_circle</Icon>
                <br/>
              <Typography
                  className={classes.user}
                  variant="subtitle1"
                  component="p"
                >
                  {shipment.userId}
                </Typography>
              </Grid>
            </Grid>
  );
}