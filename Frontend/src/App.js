import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import SignIn from './components/Pages/SignIn/SignIn'
import Signup from './components/Pages/Signup/Signup'
import Timeline from './components/Pages/UserPages/Timeline/Timeline'
import Profile from './components/Pages/UserPages/Profile/Profile'

//Providers
import {UserProvider} from './contexts/UserContext'
import {AuthProvider} from './contexts/AuthContext'

const App = () => {
	return(
		<div className="App">
		<Router>
		<AuthProvider>
		<UserProvider>
			<Route exact path="/" component={SignIn}/>
			<Route path='/signup' component={Signup}/>
			<PrivateRoute path="/timeline" component={Timeline}/>
			<PrivateRoute path="/profile/:uname" component={Profile}/>
		</UserProvider>
		</AuthProvider>
		</Router>		
		</div>
		)
}

export default App