import React from 'react';

const findColor = (status:string) =>{
    switch(status){
    case "ACTIVE":
        return "status active"
    case "NEW":
        return "status new"
    case "COMPLETED":
        return "status completed"
    }
}

export default function Status(props:any) {

  return (
    <div className={findColor(props.status)}>{props.status}</div>
  );
}