const router = require('express').Router()
const db = require('../../config/dbconfig')
const path = require('path')

const userQueries = require('../../queries/userQueries')


router.post('/signin',(req,res)=>{
	let {uname,pwd,rememberMe} = req.body
	console.log(`req.body`)
	console.log(req.body)
	userQueries.userSpecificInfo(uname)
			.then(function(rows){
				console.log(rows)
				if(rows.length>0){
					if(rows[0].pwd==pwd){
						req.session.loggedIn = true
						req.session.uname = uname
						req.session.profileStatus = rows[0].profileStatus
						let user = {
							uname:rows[0].uname,
							fname:rows[0].fname,
							lname:rows[0].lname
						}
						req.session.user = user
						if(rememberMe==true){
							req.session.cookie.maxAge = 1000*60*60*24
						}
						console.log(user)
						res.send({auth:true,user})
						/*jwt.sign({user},'secretkey',(err,token)=>{
							res.send({login:'success',user,token})
						})*/
					}
					else{
						res.send({auth:false})
					}
				}
				else{
					res.send({auth:false})	
				}
			}).catch(function(err){
				throw err
			})
})

router.post('/signup',(req,res)=>{
	let {fname,lname,uname,pwd} = req.body
	userQueries.userSpecificInfo(uname)
	.then(function(rows){
		if(rows.length>0){
			res.send({
				status:false,
				msg:'User Already exists with the username:' + uname
			})
		}
		else{
			userQueries.signup(fname,lname,uname,pwd,0)
			.then(()=>{
				res.send({
					status:true,
					msg:'Account Successfully made'
				})
			})
		}
		// console.log(rows)
	})
})

module.exports = router