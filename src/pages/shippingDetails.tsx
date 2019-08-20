import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import Loader from "../common/loader/loader"
import Info from "../common/shippment/info";
import Cargo from "../common/shippment/cargo";
import { makeStyles } from "@material-ui/core";
import Shipping from "../common/shippment/shipping";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));


const ShippingDetails = (props:any) => {
  const classes = useStyles();
  const [shipment,setShipment]=React.useState(props.row)
  let rowData = props.row.id
  useEffect(()=>{
    if(!rowData){
      fetch('/shipments').then((response) => {
        return response.json();
      }).then((json) => {
        let products = json;
        if(window){
        let shipmentElement = products.find((shipment:any )=> shipment.id === window.location.pathname.replace("/shipment",""))
        setShipment(shipmentElement)
      }
      }).catch((err) => {
        console.log('Fetch problem: ' + err.message);
      });
    }
  },[rowData])
  
  return (
    <div>
      <React.Fragment>
        {shipment && shipment.id ? (
          <Paper className={classes.root}>
          <Info shipment={shipment}></Info>
          <Cargo shipment={shipment}></Cargo>
          <Shipping shipment={shipment}></Shipping>
          </Paper>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    </div>
  );
};

export default ShippingDetails;
