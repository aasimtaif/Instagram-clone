import React from 'react'
import { Avatar } from '@mui/material';
import '../styles./Post.css';

export default function Post({username ,caption,imageurl}) {
  return (
    <div className = "post">
        <div className = 'post_header'>
            <Avatar className = "post_avatar" alt = "Aasim"/>
        <h3>{username}</h3>
        </div>
        <img className = "post_image"src={imageurl} alt='post'/>
        <h4 className = "post_text"><strong>
        {username} </strong> :{caption}</h4>

    </div>
  )
}
