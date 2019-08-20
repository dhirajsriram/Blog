import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    },
    heading:{
        padding: 10,
        fontWeight: "bold",
    },
  })
);

export default function Cargo(props: any) {
  const classes = useStyles();
  const shipment = props.shipment;
  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant="subtitle1" component="p">
        Cargo 
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {Object.keys(shipment.cargo[0]).map((property, index) => {
              return <TableCell key={index}>{property.toUpperCase()}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {shipment.cargo.map((value: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {value.type}
                </TableCell>
                <TableCell>{value.description}</TableCell>
                <TableCell>{value.volume}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Typography className={classes.heading} variant="subtitle1" component="p" align="right">
        Total : {shipment.total}
      </Typography>
    </div>
  );
}
