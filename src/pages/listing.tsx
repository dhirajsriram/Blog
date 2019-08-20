import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Loader from "../common/loader/loader";
import Status from "../common/status/status";
import { withRouter } from "react-router";
import { Icon, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  modeIcon: {
    textAlign: "center"
  }
}));

const Listing = (props: any) => {
  const [state, setState] = useState();
  const classes = useStyles();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    fetch("/shipments")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let products = json;
        setState({ data: products });
      })
      .catch((err) => {
        console.log("Fetch problem: " + err.message);
      });
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRowClick = (e: any, rowData: any) => {
    props.setRowData(rowData);
    props.history.push("/shipment/" + rowData.id);
  };

  const handleRowChange = (newData: any, oldData: any = null , type:string) => {
          fetch("/shipments/"+oldData.id, {
            method: type === "update" ? "PATCH" : "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: type === "update" ?JSON.stringify(newData) : null
          })
          .then( (response) => { 
          });
  };

  return (
    <div className="listing-page">
      {state ? (
        <MaterialTable
          columns={[
            {
              title: "STATUS",
              field: "status",
              editable: "onAdd",
              render: rowData => {
                return <Status status={rowData && rowData.status} />;
              }
            },
            { title: "ID", field: "id", editable: "onAdd", hidden: width < 480 ? true : false },
            { title: "NAME", field: "name" },
            { title: "USER-ID", field: "userId", editable: "onAdd", hidden: width < 480 ? true : false },
            { title: "ORIGIN", field: "origin", editable: "onAdd", hidden: width < 480 ? true : false },
            { title: "DESTINATION", field: "destination", editable: "onAdd", hidden: width < 480 ? true : false },
            {
              title: "MODE",
              field: "mode",
              editable: "onAdd",
              render: rowData => {
                return (
                  <Icon className={classes.modeIcon}>{rowData.mode === "sea" ? "directions_boat" : "flight"}</Icon>
                );
              },
              hidden: width < 480 ? true : false
            },
            { title: "TOTAL", field: "total", editable: "onAdd", hidden: width < 480 ? true : false }
          ]}
          data={state.data}
          title="Shipments"
          options={{
            actionsColumnIndex: -1,
            pageSize: 20
          }}
          onRowClick={(e, rowData) => handleRowClick(e, rowData)}
          editable={{
            onRowUpdate: (newData, oldData: any) =>
              new Promise(resolve => {
                setTimeout(() => {
                  handleRowChange(newData, oldData,"update");
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  handleRowChange(null,oldData,"delete");
                  setState({ ...state, data });
                }, 600);
              })
          }}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default withRouter(Listing);
