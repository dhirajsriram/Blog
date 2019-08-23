import React  from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "./drawer";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Menu = () => {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      "@media (min-width: 768px)": {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Drawer />
          <Typography variant="h5" className={classes.title}>
              <Link className="default-text" to="/">Blog</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
