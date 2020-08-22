import React,{useState,useContext} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {UserContext} from '../../../contexts/UserContext'
import {AuthContext} from '../../../contexts/AuthContext'
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import './SignIn.css'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
  	margin:0,
    width: '250px',
    fontSize:'14'
  },
  labelRoot:{
  	fontSize:'14px'
  },
  labelFocused:{
  	fontSize:'17px'
  },
  select:{
  	fontSize:'14px'
  }
}));


const SignIn = () => {

	const classes = useStyles()

	const [redirect,setRedirect] = useState(false)

	const {user,setUser} = useContext(UserContext)
	const {setAuth} = useContext(AuthContext)

	const [fields,setFields] = useState({
		uname:'',
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
		<div className="row" style={{height:'100vh',margin:0}}>
			<div className="col-lg-6 background">
			</div>
			<div className="col-lg-6"
			style={{display:'flex',
			alignItems:'center',
			justifyContent:'center',
			backgroundColor:'white'}}>
				<div style={{width:'70%'}}>
					<form onSubmit={handleSubmit}>
						<h1>Sign In</h1>
						<div className="form-group">
							<TextField
							name="Username"
							label="Username"
							className={classes.textField}
							InputLabelProps = {{
		          			classes:{
		          				root:classes.labelRoot,
		          				focused:classes.labelFocused
		          				}
		          			}}
							onChange={e=>{
								setFields({...fields,uname:e.target.value})
							}}/>
						</div>
						<div className="form-group">
							<TextField
							name="Password" 
							label="Password"
							className={classes.textField}
							InputLabelProps = {{
		          			classes:{
		          				root:classes.labelRoot,
		          				focused:classes.labelFocused
		          				}
		          			}}
							onChange={e=>{
								setFields({...fields,pwd:e.target.value})
							}}/>
						</div>
						<div className="form-group" style={{display:'flex',alignItems:'center'}}>
							<Checkbox
					        checked={fields.rememberMe}
					        onChange={e=>{
								setFields({...fields,rememberMe:e.target.checked})
							}}
							style={{marginLeft:'-12px',color:'#007bff'}}
					        inputProps={{
					          'aria-label': 'checkbox with default color',
					        }}
	      					/>
							<span style={{marginLeft:'5px'}}>Remember me</span>
						</div>
						<button className={`btn btn-primary`} type="submit">Sign In</button>
					</form>
					<p style={{marginTop:'16px'}} className='text-info'>Haven't got an account?  <u><Link style={{color:'#007bff'}} to='/signup'>Sign up</Link></u></p>
				</div>
			</div>
			{
				(redirect)?(<Redirect to="/timeline"/>):null
			}
		</div>
		)
	
}

export default SignIn