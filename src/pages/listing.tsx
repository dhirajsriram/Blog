import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Loader from '../common/loader/loader';
import Status from '../common/status/status';
import { withRouter } from 'react-router';

const Listing = (props:any) => {
  const [state, setState] = React.useState();

  useEffect(()=>{
    fetch('/shipments').then(function(response) {
        return response.json();
      }).then(function(json) {
        let products = json;
        setState({data :products})
      }).catch(function(err) {
        console.log('Fetch problem: ' + err.message);
      });
  },[])

  const handleRowClick = (e:any,rowData:any) =>{
    props.setRowData(rowData)
    props.history.push("/" + rowData.id);
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      {state ?
    <MaterialTable
      columns={[
        { title: "id", field: "id" ,editable: 'never'},
        { title: "name", field: "name" },
        { title: "userId", field: "userId",editable: 'never' },
        { title: "origin", field: "origin",editable: 'never' },
        { title: "destination", field: "destination",editable: 'never' },
        { title: "mode", field: "mode",editable: 'never' },
        { title: "total", field: "total",editable: 'never' },
        { title: "status", field: "status",editable: 'never', render: rowData => {return(<Status status={rowData.status}/>)}},
      ]}
      data={state.data}
      title="Shipments"
      options={{
        actionsColumnIndex: -1,
        pageSize:20,
      }}
      onRowClick={(e,rowData) => handleRowClick(e,rowData)}
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
        onRowUpdate: (newData, oldData:any) =>
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
          }),
          
      }}
    />
    :<Loader/>}
  </div>
  );
}

export default withRouter(Listing);