const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const path = require('path')
const userQueries = require('./queries/userQueries')
const db = require('./config/dbconfig')
const router = express.Router()
let serverless = require('serverless-http')
// var functions = require('firebase-functions')

//Configuring App wide variables
app.set('port',process.env.PORT || 7000)

//Setting Up Middlewares

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Session Middleware
app.use(session({
	secret:'secret',
	resave:false,
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*60*12
	}
}));

//CORS Middleware
app.use(cors({
	credentials:true,
	origin:true
}))

app.use((req,res,next)=>{
	// console.log(req.session)
	next()
})

//Static Middleware
app.use(express.static(path.join(__dirname,'public')))

//GET API endpoints
app.use('/.netlify/functions/api',require('./APIs/GET/generalRequests'))
app.use('/.netlify/functions/api',require('./APIs/GET/userRequests'))

//POST API endpoints
app.use('/.netlify/functions/api',require('./APIs/POST/authRequests'))
app.use('/.netlify/functions/api',require('./APIs/POST/userRequests'))

router.get('/',(req,res)=>{
	res.send('Lmao')
})

router.get('/lmao',(req,res)=>{
	res.send('Zaida hansi nahin aa rahi')
})

const getPosts = (uname) => {
	return new Promise((resolve,reject)=>{
		let sql = `SELECT * FROM posts WHERE uname=?`
		db.query(sql,[uname],(err,rows)=>{
			resolve(rows)
		})
	})	
}

router.get('/getPosts',(req,res)=>{
	getPosts('brad')
	.then((posts)=>{
		res.send(posts)
	})
})

app.use('/.netlify/functions/api',router)

module.exports.handler = serverless(app)