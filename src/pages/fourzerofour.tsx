    
import React from "react";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";

export default function FourZeroFour(props:any) {
  return (
    <div>
      <Typography variant="h6" gutterBottom align="center">
        <WarningIcon className="warning-icon" />
        <br />
        The page you are looking for cannot be found
      </Typography>
    </div>
  );
}