import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Loader from "../common/loader/loader";
import Status from "../common/status/status";
import { withRouter } from "react-router";
import { Icon } from "@material-ui/core";
import classes from "*.module.css";

const Listing = (props: any) => {
  const [state, setState] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    fetch("/shipments")
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let products = json;
        setState({ data: products });
      })
      .catch(function(err) {
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
    props.history.push("/" + rowData.id);
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
                return <Icon>{rowData.mode === "sea" ? "directions_boat" : "flight"}</Icon>;
              },
              hidden: width < 480 ? true : false
            },
            { title: "TOTAL", field: "total", editable: "onAdd", hidden: width < 480 ? true : false },
           
          ]}
          data={state.data}
          title="Shipments"
          options={{
            actionsColumnIndex: -1,
            pageSize: 20,
            addRowPosition: "first"
          }}
          onRowClick={(e, rowData) => handleRowClick(e, rowData)}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.push(newData);
                  setState({ ...state, data });
                }, 600);
              }),
            onRowUpdate: (newData, oldData: any) =>
              new Promise(resolve => {
                setTimeout(() => {
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
