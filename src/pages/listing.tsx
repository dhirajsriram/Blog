import React, { useEffect } from 'react';
import MaterialTable from 'material-table';

interface description{
}

export default function MaterialTableDemo(props:description) {
  const [state, setState] = React.useState({
    data: [
      { destination: "Saarbrücker Str. 38, 10405 Berlin",
      id: "S1000",
      mode: "sea",
      name: "T-shirts(Summer2018) from Shanghai to Hamburg",
      origin: "Shanghai Port",
      status: "ACTIVE",
      total: "1000",
      type: "FCL",
      userId: "U1000"},
    ],
  });

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

  return (
    <div style={{ maxWidth: "100%" }}>
    <MaterialTable
      columns={[
        { title: "id", field: "id" },
        { title: "name", field: "name" },
        { title: "userId", field: "userId" },
        { title: "origin", field: "origin" },
        { title: "destination", field: "destination" },
        { title: "mode", field: "mode" },
        { title: "total", field: "total" },
        { title: "status", field: "status" },
      ]}
      data={state.data}
      title="Shipments"
      options={{
        actionsColumnIndex: -1,
        pageSize:20
      }}
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
  </div>
  );
}