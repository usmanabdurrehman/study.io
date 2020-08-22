import React,{createContext,useState,useEffect} from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = props => {

	if(!localStorage.getItem('auth')){
		var authh=false
	}
	else{
		var authh=true
	}

	const [auth,setAuth] = useState(authh)

	const checkAuth = () => {
		axios({
			url:'/checkAuth',
			withCredentials:true
		})
		.then(res=>{
			if(res.data.auth==true){
				setAuth(true)
				localStorage.setItem('auth',true)
			}
			else{
				setAuth(false)
				localStorage.setItem('auth',false)
			}
		})
	}

	const logout = () => {
		axios({
			url:'/logout',
			withCredentials:true
		})
		.then(res=>{
			setAuth(false)
			localStorage.setItem('auth',false)
		})
	}

	useEffect(()=>{
		checkAuth()
	},[])

	return(
		<AuthContext.Provider value={{auth,setAuth,logout}}>
			{props.children}
		</AuthContext.Provider>
		)
}
