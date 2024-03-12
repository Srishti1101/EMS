import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PostList = () => {
  const[posts,setPosts]=useState([])
  const reversedPosts = posts.slice().reverse();
  const navigate=useNavigate();
  useEffect(()=>{
     axios.get('http://localhost:3000/auth/showposts')
     .then(result=>{
      if(result.data.Status){
        setPosts(result.data.Result)
      }
      else{
        alert(result.data.Error)
      }
     })
     .catch(err=>console.log(err))
  },[]);
  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
      <h2>Posts</h2>
      </div>
      {reversedPosts.map((post, index) => (
        <div key={index} className=" m-4 p-4 testCard " >
          <div >
            <h5 className='d-flex justify-content-center'>{post.title}</h5>
            <p >{post.content}</p>
          </div>
        </div>
      ))}
     </div>
  )
}

export default PostList
