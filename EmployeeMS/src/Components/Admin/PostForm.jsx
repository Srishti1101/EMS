import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PostForm = () => {
    const [posts, setPosts] = useState({
        title:"",
        content:""
    });
    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()

        // Post to the backend when a new post is submitted
        axios.post('http://localhost:3000/auth/postform', posts) // assuming admin_id is 1 for simplicity
          .then(result => {
            if(result.data.Status){
                navigate('/dashboard/announcement')
              }
              else{
                console.log(result.data.Error)
              }
          })
          .catch(err=>console.log(err))
      };

  return (
    <div>
      <form className='loginPage p-3 m-5' onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" onChange={(e) =>setPosts({ ...posts, title: e.target.value })}/>
  </div>
  <div className="mb-3">
    <label htmlFor="content" className="form-label">Content</label>
    <textarea type="text" rows="10" className="form-control" id="content" name="content" onChange={(e) =>setPosts({ ...posts, content: e.target.value })}></textarea>
  </div>
  <button type="submit" className="btn btn-primary">Post</button>
</form>
    </div>
  )
}

export default PostForm
