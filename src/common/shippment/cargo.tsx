import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cargoContainer: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto",
      borderRadius:5
    },
    table: {
      minWidth: 340
    },
    tableCell: {
      paddingRight: 4,
      paddingLeft: 5
    },
    noBorder: {
      paddingRight: 4,
      paddingLeft: 5,
      border: 0,
      fontSize: 20,
      fontWeight: "bold"
    },
    heading: {
      padding: "10px 10px",
      fontWeight: "bold",
      background: "#d3d3d361",
      borderRadius: 5
    },
    totalBorder: {
      borderTop: "2px solid black",
      borderBottom: "0px"
    },
    total: {
      padding: 10
    }
  })
);

export default function Cargo(props: any) {
  const classes = useStyles();
  const shipment = props.shipment;
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  });
  return (
    <div className={classes.cargoContainer}>
      <Typography className={classes.heading} variant="subtitle1" component="p">
        Cargo
      </Typography>
      <Grid container>
        <Grid item xs={6} md={12}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {Object.keys(shipment.cargo[0]).map((property, index) => {
                  return (
                    <TableCell align={property === "type" ? "left" : "right"} className={classes.tableCell} key={index}>
                      {property.toUpperCase()}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {shipment.cargo.map((value: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                      {value.type}
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      {value.description}
                    </TableCell>
                    <TableCell align="right" className={classes.tableCell}>
                      {value.volume}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className={classes.totalBorder}>
                <TableCell colSpan={2} className={classes.noBorder}>
                  Total
                </TableCell>
                <TableCell align="right" className={classes.noBorder}>
                  {formatter.format(shipment.total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
  );
}
