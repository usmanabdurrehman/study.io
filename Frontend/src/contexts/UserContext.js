import React,{useState,createContext} from 'react'

export const UserContext = createContext()

export const UserProvider = props => {

	if(!localStorage.getItem('user')){
		var userr = {
			fname:'',
			lname:'',
			email:'',
			pwd:''
		}
	}
	else{
		var userr = JSON.parse(localStorage.getItem('user'))
	}

	const [user,setUser] = useState(userr)

	return(
		<UserContext.Provider value={{user,setUser}}>
			{props.children}
		</UserContext.Provider>
		)
}