import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

import Sidelist from "./sidelist";
import { Hidden, Theme, createStyles, useTheme } from "@material-ui/core";
import SideList from "./sidelist";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250
    },
    menuItems: {
      textTransform: "capitalize",
      paddingLeft: 24
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    }
  })
);

export default function SideDrawer(props: any) {
  const classes = useStyles();
  const { container } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const _toggleDrawer = () => (event: any) => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <IconButton
        onClick={_toggleDrawer()}
        edge="start"
        color="inherit"
        aria-label="Open drawer"
        className={classes.menuButton}>
        <MenuIcon />
      </IconButton>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={_toggleDrawer()}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}>
          <Sidelist />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open>
          <SideList categoryArr={props.categoryArr}/>
        </Drawer>
      </Hidden>
    </div>
  );
}
