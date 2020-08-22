import React, { useContext, useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../../../contexts/UserContext";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "./Timeline.css";
import PostCard from "../PostCard/PostCard";
import AddPostCard from "../AddPostCard/AddPostCard";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
//Dont have material ui lab
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../../../../contexts/AuthContext";
import Grow from "@material-ui/core/Grow";

const Timeline = (props) => {
	const { user } = useContext(UserContext);
	const [btnClass, setBtnClass] = useState("btn btn-primary");
	const [showPosts, setShowPosts] = useState(false);

	var uname = user.uname;

	const { setAuth } = useContext(AuthContext);

	const [test, setTest] = useState(false);
	const [post, setPost] = useState("");

	const [profileInfo, setProfileInfo] = useState({
		posts: [],
		myDirTree: {},
	});

	const [names, setNames] = useState([]);
	const [nameToBeSearched, setNameToBeSearched] = useState("");

	const [techNews,setTechNews] = useState([])

	const fetchTimelinePosts = () => {
		axios({
			url: "/timeline",
			method: "post",
			data: { uname },
			withCredentials: true,
		}).then((res) => {
			console.log(res);
			if (res.data.authStatus == false) {
				setAuth(false);
				localStorage.setItem("auth", false);
			} else {
				setShowPosts(!showPosts);
				setProfileInfo(res.data);
			}
		});
	};

	let fetchTechNews = () => {
		axios({
			url: "http://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=7d388446bacc4062b8ac74146bb87a55",
		}).then((res) => {
			res.data.articles.length = 3
			setTechNews(res.data.articles)
		});
	}

	console.log("Normal function call");

	useEffect(() => {
		console.log("Component did mount ran");
		fetchTimelinePosts();
		fetchTechNews()
	}, []);

	function fetchNames(name) {
		axios({
			url: "/fetchNames",
			method: "post",
			data: { name },
			withCredentials: true,
		}).then((res) => {
			console.log("Sth happening");
			setNames(res.data);
		});
	}

	return (
		<div>
			<Navbar notifications={2} messages={1} />

			<div className="container" style={{ marginTop: "100px" }}>
				{/*<button className="btn btn-primary">Add Post</button>*/}
				{/*
			<div style={{padding:'20px',margin:'20px 0',backgroundColor:'white'}}>
				Only have to incorportate it into the above search bar<br/>
					<input
					onChange={(e)=>{
						fetchNames(e.target.value)
					}}
					/>
					<ul>
					{
						names.map(name=>(
							<li><Link to={`/profile/${name.uname}`}>{name.fname} {name.lname}</Link></li>
							))
					}
					</ul>
			</div>
			*/}
				<div id="posts" className="row" style={{marginBottom:'120px'}}>
					<div className="col-lg-8">
						<AddPostCard fetchFunction={fetchTimelinePosts} />
						<div>
							{profileInfo.posts.map((post) => (
								<PostCard
									post={post}
									fetchFunction={fetchTimelinePosts}
									page={"timeline"}
								/>
							))}
						</div>
					</div>
					<div className="col-lg-4">
						<div
							className="card"
							style={{
								margin: "20px 0",
								padding: "30px",
								borderRadius: "20px",
								boxShadow: "2px 2px 4px lightgray",
							}}
						>
							<Typography variant="h5">Tech News</Typography>
							<ol style={{ paddingLeft: "17px" }} id="tips">
							{
								techNews.map(news=>(
									<li>{news.title}</li>
								))
							}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Timeline;
