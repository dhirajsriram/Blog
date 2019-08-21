import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import Loader from "../common/loader/loader";
import { makeStyles } from "@material-ui/core";

const Shipping = React.lazy(() => import("../common/shippment/shipping"));
const Cargo = React.lazy(() => import("../common/shippment/cargo"));
const Info = React.lazy(() => import("../common/shippment/info"));


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const ShippingDetails = (props: any) => {
  const classes = useStyles();
  const [shipment, setShipment] = React.useState(props.row);
  let rowData = props.row.id;
  useEffect(() => {
    if (!rowData) {
      fetch(process.env.REACT_APP_API_URL + "/shipments")
        .then(response => {
          return response.json();
        })
        .then(json => {
          let products = json;
          if (window) {
            let shipmentElement = products.find(
              (shipment: any) => shipment.id === window.location.pathname.replace("/shipment/", "")
            );
            setShipment(shipmentElement);
          }
        })
        .catch(err => {
          console.log("Fetch problem: " + err.message);
        });
    }
  }, [rowData]);

  return (
    <React.Fragment>
      {shipment && shipment.id ? (
        <div className="shipping-details">
          <Paper className={classes.root}>
            <Info shipment={shipment} />
            <Cargo shipment={shipment} />
            <Shipping shipment={shipment} />
          </Paper>
        </div>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default ShippingDetails;
