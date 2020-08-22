import React, { useContext, useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../../../contexts/UserContext";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
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
import TextField from "@material-ui/core/TextField";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {
  Delete,
  DeleteForever,
  DeleteForeverRounded,
  DeleteSweep,
  DeleteRounded,
  DeleteTwoTone,
  Edit,
} from "@material-ui/icons";
import Modal from '@material-ui/core/Modal';
import AddPostCard from '../AddPostCard/AddPostCard'
import "./PostCard.css";
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';

let i = 0;

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 1000,
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 4,
    marginLeft: -12,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
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
  labelRoot: {
    fontSize: "14px",
  },
  labelFocused: {
    fontSize: "17px",
  },
  select: {
    fontSize: "14px",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export default function PostCard(props) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { user } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(false);

  const [comment,setComment] = useState('')

  const styles = {
    likeIcon: {
      color: props.post.likedbythePersonLoggedIn ? "#007bff" : "gray",
      transition: "0.2s",
    },
    deleteIcon: {
      color: "#f50057",
      color:'red',
      transition: "0.2s",
      marginRight: "0px",
    },
    editButton: {
      color: "white",
    },
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  const handleDelete = () => {
    let uname = user.uname;
    let postId = props.post.id;
    axios({
      method: "post",
      url: "/deletePost",
      data: { uname, postId },
      withCredentials: true,
    }).then((res) => {
      console.log("Delete Post Response recieved");
      props.fetchFunction();
      console.log(res);
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /*const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
*/
  const likePost = () => {
    console.log("Function has been called");
    let thePersonWhoLiked = user.uname;
    let postId = props.post.id;
    let likes = props.post.likes;
    axios({
      method: "post",
      url: "/likePost",
      data: { thePersonWhoLiked, postId, likes },
      withCredentials: true,
    }).then((res) => {
      console.log("Like Post Response recieved");
      props.fetchFunction();
      console.log(res);
    });
  };

  const unlikePost = () => {
    console.log("Function has been called");
    let thePersonWhoLiked = user.uname;
    let postId = props.post.id;
    let likes = props.post.likes;
    axios({
      method: "post",
      url: "/unlikePost",
      data: { thePersonWhoLiked, postId, likes },
      withCredentials: true,
    }).then((res) => {
      props.fetchFunction();
      console.log("Like Post Response recieved");
      console.log(res);
    });
  };

  const commentOnPost = (e) => {
    console.log('In comment function')
    axios({
      method:'post',
      url:'/addComment',
      data:{comment,commenter:'fromServer',postId:props.post.id},
      withCredentials:true
    })
    .then(res=>{
      props.fetchFunction()
      console.log(res)
      setComment('')
    })
  }

  let image = "images/user.jpg";

  if (props.page == "profile") {
    image = props.image;
  }

  const body = (
    <Grow in={open}>
      <AddPostCard edit={true} fetchFunction={props.fetchFunction} postContent={props.post.post} postId={props.post.id}/>
    </Grow>
  );

  return (
    <div
      className="card"
      style={{
        margin: "35px 0",
        borderRadius: "20px",
        boxShadow: "2px 2px 4px lightgray",
      }}
    >
      <div className="card-header nameplate" style={{ padding: "10px 30px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <img src={image} height="50px" style={{ borderRadius: "50%" }} />
            <span style={{ marginLeft: "15px"}} className="nameHandle">
            <Link style={{color:'white'}}to={`/profile/${props.post.uname}`}>
              {props.post.fname} {props.post.lname}
            </Link>
            </span>
            {/*
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <MenuItem>Lmao</MenuItem>
              <MenuItem>xD</MenuItem>
            </Popover>
            */}
          </div>
          <div
            style={{ display: "flex", alignItems: "center", paddingRight: 0 }}
          >
            {props.page == "profile" && props.uname == user.uname ? (
              <div>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleOpen}
                  
                >
                  <Edit style={styles.editButton} />
                </IconButton>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleDelete}
                  aria-label="open drawer"
                >
                  <DeleteSweep style={styles.deleteIcon} />
                </IconButton>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className="card-body"
        style={{ marginTop: "20px", padding: "0px 30px 15px 30px" }}
      >
        <div className="content">
          {props.post.post}
          {/*(props.post.file==true)
          ?
          (
            <div className="card file" style={{marginTop:'20px',padding:'10px'}}>
              <div className="col-md-10">
                {props.post.fileName}
              </div>
            </div>
          )
          :
          null*/}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "65px",
              }}
            >
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={(e) => {
                  if (props.post.likedbythePersonLoggedIn == true) {
                    unlikePost();
                  } else {
                    likePost();
                  }
                  i++;
                }}
                aria-label="open drawer"
              >
                <ThumbUpAltIcon style={styles.likeIcon} />
              </IconButton>
              {props.post.likes > 0 ? <span>{props.post.likes}</span> : null}
            </div>
            <div style={{ flexGrow: 1 }}>
              <input
                style={{
                  fontSize: "14px",
                  padding:'6px',
                  width:'100%',
                  borderStyle:'solid',
                  boxSizing:'border-box',
                  borderWidth:'1.4px',
                  borderRadius:'0 20px 20px 0',
                  transition:'0.4s'
                }}
                className = 'comment-input'
                onChange = {e=>{
                  setComment(e.target.value)
                }}
                value={comment}
              />
              {
                (props.post.comments!=null)?(
                  props.post.comments.map(comment=>(
                  <div className='comment'>
                    <span className='commenter'>
                      {comment.commenter}
                    </span>
                    <div className='classBody'>
                      {comment.comment}
                    </div>
                  </div>
                ))
                ):null
              }
            </div>
            <div>
              <button
              style={{
                borderRadius:'20px 0 0 20px'
              }}
              className='btn btn-primary' onClick={commentOnPost}>Comment</button>
            </div>
          </div>
          <div>
            {props.post.likedbyuname[0] != null
              ? props.post.likedbyuname.map((likedby) => (
                  <span>{likedby}, </span>
                ))
              : null}
          </div>
          <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
        </div>
      </div>
    </div>
  );
}
