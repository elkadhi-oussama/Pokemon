import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../JS/actions/userAction";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";




const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "black",
  },
  Link: {
    textDecoration: "none",
  },
  btn:{
      height:"36px",
      width:"72px",
      fontSize:"10 pt",
      fontFamily:"tahoma",
      marginTop:"10 px",
      marginRight:"100 px",
      position:"absolute",
      top:"1",
      right:"0",
      borderRadius:"50%",
      cursor:"pointer",
      backgroundColor:"#bb0000",
      color:"white",
      border:'none',
      fontWeight:"bold"
  },
  title:{
      cursor:"pointer",
      color:"white",
  }
}));
const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  return (
      <>
    <AppBar className={classes.AppBar} position="fixed" >
      <Toolbar>
        <Link  to="/home"  className={classes.Link}>
          <Typography className={classes.title} variant="h6">
            Pokemon
            <button className={classes.btn}
              
              onClick={() => {
                dispatch(logout());
                history.push("/");
              }}
            >
               Logout
              
            </button>
          </Typography>
        </Link>
        
      </Toolbar>
    
    </AppBar>
      
      </>
  );
};

export default NavBar;
