import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import './Profile.css'
import {UserContext} from '../../../../contexts/UserContext'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navbar from '../Navbar/Navbar'
import PostCard from '../PostCard/PostCard'
import {AuthContext} from '../../../../contexts/AuthContext'

let i = 0
let uname

let j = 0

const Profile = props => {
	// console.log(props)

	// console.log('Inside component')
	const {user} = useContext(UserContext)

	// const [uname,setUname] = useState('')
	// setUname(props.match.params.uname)

	// uname = props.match.params.uname  

	const {setAuth} = useContext(AuthContext)

	const [btn,setBtn] = useState({
		btnClass:'',
		btnText:''
	})

	// const [image,setImage] = useState('')
	const [displayFollowButton,setDisplayFollowButton] = useState((props.match.params.uname == user.uname)?false:true)
	console.log('displayFollowButton',displayFollowButton)
	const [profileInfo,setProfileInfo] = useState({
		posts:[]
	})

	const [isLoading,setIsLoading] = useState(null)

	const fetchProfileInfo = () => {
		if(j==0){
			setIsLoading(true)
		}
		console.log('Inside function')
		axios({
			url:'/profile',
			method:'post',
			data:{uname:props.match.params.uname},
			withCredentials:true
		})
		.then(res=>{
			console.log('Fetching data from server')
			// console.log(res)
			if(res.data.authStatus==false){
				setAuth(false)
				localStorage.setItem('auth',false)	
			}
			else{
				if(res.data.ifFollowing){
				setBtn({
					btnClass:'btn btn-success',
					btnText:'Following'
				})
			}
			else{
				setBtn({
					btnClass:'btn btn-primary',
					btnText:'Follow'
				})
			}
			setProfileInfo(res.data)
			j++
			setIsLoading(false)
			}
		})
	}

	let image = "../images/user.jpg";

	const follow = () => {
		axios({
			url:'/follow',
			method:'post',
			withCredentials:true,
			data:{following:props.match.params.uname}
		})
		.then(res=>{
			setBtn({
				btnClass:'btn btn-success',
				btnText:'Following'
			})
			setProfileInfo({
				...profileInfo,
				ifFollowing:true
			})
			console.log(res)
		})	
	}

	const unfollow = () => {
		axios({
			url:'/follow',
			method:'post',
			withCredentials:true,
			data:{unfollowing:props.match.params.uname}
		})
		.then(res=>{
			setBtn({
				btnClass:'btn btn-primary',
				btnText:'Follow'
			})
			setProfileInfo({
				...profileInfo,
				ifFollowing:false
			})
			console.log(res)
		})	
	}

	useEffect(()=>{
		console.log('useEffect triggered')
		fetchProfileInfo()
		setDisplayFollowButton((props.match.params.uname == user.uname)?false:true)
	},[props.match.params.uname])



	return(
	<div>
	<Navbar notifications={2} messages={1}/>	
		<div className="container">
		{/*
			CoverPhoto
			Absolutely placed profile picture

			Posts of the person

			Modal opening for new post or for uploading files, pictures
		*/}
			<div id="parent">
				<div id="cover">
					<img src="../images/coverImages/cover.jpg" height="350px" width="100%" id="coverImage"/>
				</div>
				<div id="profile" align="center">
					<img src={image} id="profilePic"/>
				</div>
			</div>

			{
				(isLoading==false)?
				(
				<div>	
					<div align="center">
				<h2 style={{marginTop:'-40px',marginBottom:'50px'}}>
				{
					(profileInfo)?(
						<span>{profileInfo.posts[0]['fname']} {profileInfo.posts[0]['lname']}</span>
						):null
				}
				</h2>
			{
				(displayFollowButton)?
				(
					<button className={btn.btnClass} onClick={e=>{
						if(profileInfo.ifFollowing){
							unfollow()
						}
						else{
							follow()
						}
					}}>
						{btn.btnText}
					</button>
				):(null)
			}
			</div>

			<div id="posts" className="row" style={{marginTop:'30px',marginBottom:'120px'}}>
				<div className="col-lg-8">
				{
					profileInfo.posts.map(post=>(
						<PostCard image={image} post={post} uname={props.match.params.uname} page={'profile'} fetchFunction={fetchProfileInfo}/>
					))
				}
				</div>
				<div className="col-lg-4">
					<div className="card" style={{
						margin:'20px 0',
						padding:'30px',
						borderRadius:'20px',
						boxShadow:'2px 2px 4px lightgray'
					}}>
						<p>Following: 373</p>
						<p>Followers: 112</p>
						<p>Posts: 11</p>	
					</div>
				</div>
			</div>
			</div>
				):(<div align='center'><h2>Loading ...</h2></div>)
			} 
		</div>
	</div>	
	)
	
}

export default Profile