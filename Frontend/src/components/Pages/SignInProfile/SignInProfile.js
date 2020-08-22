import React,{useState,useContext} from 'react'
import classes from './SignInProfile.module.css'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {UserContext} from '../../../contexts/UserContext'
import {AuthContext} from '../../../contexts/AuthContext'
import {TextField,RaisedButton} from '@material-ui/core'

const SignInProfile = () => {

	const [redirect,setRedirect] = useState(false)

	const {user,setUser} = useContext(UserContext)
	const {setAuth} = useContext(AuthContext)

	const [fields,setFields] = useState({
		email:'',
		pwd:'',
		rememberMe:false
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		axios({
			url:'/signin',
			method:'post',
			data:fields,
			withCredentials:true
		})
		.then(res=>{
			if(res.data.auth==true){
				localStorage.setItem('auth',true)
				setUser(res.data.user)
				localStorage.setItem('user',JSON.stringify(res.data.user))
				setAuth(true)
				setRedirect(true)
			}
		})
	}

	return(
		<div className="row" style={{height:'100vh'}}>
			<div className="col-lg-6">
			</div>
			<div className="col-lg-6"
			style={{display:'flex',
			alignItems:'center',
			justifyContent:'center',
			backgroundColor:'white'}}>
				<div style={{width:'70%'}}>
					<form onSubmit={handleSubmit}>
						<h1>Sign In</h1>
						<TextField
						style={{
							display:'block',
							margin:'20px 0'}} 
						label="Email"
						onChange={e=>{
							setFields({...fields,email:e.target.value})
						}}/>
						<TextField 
						style={{
							display:'block',
							margin:'20px 0'}}
						label="Password"
						onChange={e=>{
							setFields({...fields,pwd:e.target.value})
						}}/>
						<input type="checkbox"
						onChange={(e)=>{
							setFields({...fields,rememberMe:e.target.checked})
						}}/> 
						<span style={{marginLeft:'15px'}}>Remember me</span><br/>
						<button className={`btn btn-primary ${classes.button}`} type="submit">Sign In</button>
					</form>
				</div>
			</div>
			{
				(redirect)?(<Redirect to="/timeline"/>):null
			}
		</div>
		)
	
}

export default SignInProfile