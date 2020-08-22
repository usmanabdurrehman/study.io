import React,{useState} from 'react'
import axios from 'axios'
import './AddPostCard.css'

const AddPostCard = props => {

	const [post,setPost] = useState((props.edit!=true)?(''):(props.postContent))

	const addPost = (e) => {
		e.preventDefault()
		axios({
			url:'/addPost',
			method:'post',
			data:{post},
			withCredentials:true
		})
		.then(()=>{
			console.log('Post Added')
			setPost('')
			props.fetchFunction()
		})
	}

	const editPost = (e) => {
		e.preventDefault()
		axios({
			url:'/editPost',
			method:'post',
			data:{post,postId:props.postId},
			withCredentials:true
		})
		.then(()=>{
			console.log('Post Edited')
			setPost('')
			props.fetchFunction()
		})
	}

	return(
			<div className="card" style={{
				margin:'20px 0',
				borderRadius:(props.edit!=true)?'20px':0,
				boxShadow:(props.edit!=true)?'2px 2px 4px lightgray':'0 0 0',
				width:(props.edit!=true)?'100%':'500px'
			}}>
				<div className="card-header" style={{backgroundColor:'#007bff',color:'white'}}>
					{(props.edit!=true)?('New Post'):('Edit Post')}
				</div>
				<div className="card-body">
					<form onSubmit={(props.edit!=true)?(addPost):(editPost)}>
						<div className="form-group">
						<textarea className='txtarea' 
						onChange={e=>setPost(e.target.value)} 
						placeholder='I am thinking ....' 
						value={post}>
						</textarea>
						</div>
						<div className="form-group">
						<button type="submit" 
						className="btn btn-primary" 
						style={{float:'right',borderRadius:'20px 0 0 20px'}}>
							{(props.edit!=true)?('Add Post'):('Update')}
						</button>
						</div>
					</form>
				</div>
			</div>
		)
}

export default AddPostCard