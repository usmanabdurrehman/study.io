import React, { useContext, useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { UserContext } from "../../../../contexts/UserContext";
import "./Navbar.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
//Dont have material ui lab
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import {ArrowDropDown} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginRight: 40,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menuItem: {
    fontSize: "14px",
  },
  navbtn:{
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
}));

export default function Navbar(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    // if (searchString.length == 0) {
    //   console.log("Searchstring length is 0");
    //   setOpen(false);
    // } else {
    //   console.log("Searchstring length is not 0");
    //   setOpen(true);
    // }

    axios({
      url: "/fetchNames",
      method: "post",
      data: { name: searchString },
      withCredentials: true,
    }).then((res) => {
      // console.log("Sth happening");
      // console.log(res.data);
      setOptions(res.data);
    });

    return () => {
      active = false;
    };
  }, [loading]);

  // useEffect(() => {
    // if (searchString.length == 0) {
    //   console.log("Searchstring length is 0");
    //   setOpen(false);
    // } else {
    //   console.log("Searchstring length is not 0");
    //   setOpen(true);
    // }
  //   console.log(searchString.length)
  //   axios({
  //     url: "/fetchNames",
  //     method: "post",
  //     data: { name: searchString },
  //     withCredentials: true,
  //   }).then((res) => {
  //     // console.log("Sth happening");
  //     // console.log(res.data);
  //     setOptions(res.data);
  //   });
  // }, [searchString]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // let [options, setOptions] = useState([
  //   { title: <Link to='/profile/brad'>"The Shawshank Redemption"</Link>, year: 1994 },
  //   { title: "The Godfather", year: 1972 },
  //   { title: "The Godfather: Part II", year: 1974 },
  //   { title: "The Dark Knight", year: 2008 },
  // ]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { logout } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
        <Link to={`/profile/${user.uname}`}>Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
        <Link to="/timeline">Timeline</Link>
      </MenuItem>
      <MenuItem onClick={logout} className={classes.menuItem}>
        Log Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className={classes.navbtn}
        >
          {/*<AccountCircle />*/}
          <img
            src="images/user.jpg"
            height="25px"
            width="25px"
            style={{ borderRadius: "50%" }}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <div class="container">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Study.Io
            </Typography>
            <Autocomplete
              id="asynchronous-demo"
              style={{ width: 250 }}
              open={open}
              onOpen={() => {
                setOpen(true);
                /*if(searchString.length==0){
                  console.log('Searchstring length is 0')
                  setOpen(false);  
                }
                else{
                  console.log('Searchstring length is not 0')
                  setOpen(true);
                }*/
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionLabel={(option) => (
                <Link
                  to={`/profile/${option.uname}`}
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {option.fname + " " + option.lname}
                </Link>
              )}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    onChange={(e) => {
                      console.log('Lmao')
                      setSearchString(e.target.value);
                    }}
                    class="input"
                    placeholder={"Search ..."}
                    style={{
                      width: 250,
                      padding: 8,
                      paddingLeft: 16,
                      borderRadius: "20px",
                      backgroundColor: "white",
                      borderStyle: "groove",
                      borderWidth: "0px",
                      borderColor: "transparent",
                    }}
                    type="text"
                    {...params.inputProps}
                  />
                </div>
              )}
            />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                className={classes.navbtn}
                color="inherit"
              >
                <span>{user.uname}</span>
                <ArrowDropDown/>
                {/*<AccountCircle />*/}
                {/*<img
                  src="../images/user.jpg"
                  height="25px"
                  width="25px"
                  style={{ borderRadius: "50%" }}
                />*/}
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </div>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/*
        renderInput={(params) => (
                <TextField
                  onChange={(e) => {
                    setSearchString(e.target.value);
                  }}
                  style={{ width: "300px" }}
                  {...params}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
        */}
    </div>
  );
}
