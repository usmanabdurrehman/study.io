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
import './Signup.css'

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


const Signup = () => {

	const classes = useStyles()

	const [redirect,setRedirect] = useState(false)

	const {user,setUser} = useContext(UserContext)
	const {setAuth} = useContext(AuthContext)

	const [fields,setFields] = useState({
		fname:'',
		lname:'',
		uname:'',
		pwd:'',
		rememberMe:false
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		axios({
			url:'/signup',
			method:'post',
			data:fields,
			withCredentials:true
		})
		.then(res=>{
			if(res.data.status==true){
				setRedirect(true)
			}
		})
	}

	return(
		<div className="row" style={{height:'100vh',margin:0}}>
		<div className="col-lg-6"
			style={{display:'flex',
			alignItems:'center',
			justifyContent:'center',
			backgroundColor:'white'}}>
				<div style={{
					width:'70%',
					display:'flex',
					justifyContent:'flex-start'
				}}>
					<form onSubmit={handleSubmit}>
						<h1>Sign Up</h1>
						<div className="form-group">
							<TextField
							name="fname"
							label="First Name"
							className={classes.textField}
							InputLabelProps = {{
		          			classes:{
		          				root:classes.labelRoot,
		          				focused:classes.labelFocused
		          				}
		          			}}
							onChange={e=>{
								setFields({...fields,fname:e.target.value})
							}}/>
						</div>
						<div className="form-group">
							<TextField
							name="lname"
							label="Last Name"
							className={classes.textField}
							InputLabelProps = {{
		          			classes:{
		          				root:classes.labelRoot,
		          				focused:classes.labelFocused
		          				}
		          			}}
							onChange={e=>{
								setFields({...fields,lname:e.target.value})
							}}/>
						</div>
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
						<button 
						style={{
							marginTop:'5px'	
						}} className={`btn btn-primary`} type="submit">Sign Up</button>
					<p style={{marginTop:'16px'}} className='text-info'>Have got an account already?  <u><Link style={{color:'#007bff'}} to='/'>Sign in</Link></u></p>	
					</form>
				</div>
			</div>
			{
				(redirect)?(<Redirect to="/"/>):null
			}
			<div className="col-lg-6 background">
			</div>
		</div>
		)
	
}

export default Signup