import React,{useContext} from 'react'
import {Route,Redirect} from 'react-router-dom'
import {AuthContext} from './contexts/AuthContext'

const PrivateRoute = ({component:Component,...rest}) => {

	const {auth} = useContext(AuthContext)

	return(
		<Route {...rest} render={
			(props)=>(
			(auth==true)?
			(
				<Component {...props}/>
			):(<Redirect to="/"/>)	
				)
		}/>
		)
}

export default PrivateRoute