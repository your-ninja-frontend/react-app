import React from 'react';
import Button from './UI/button/Button';
import { useNavigate } from 'react-router-dom'

const PostItem = (props) => {
  const navigate = useNavigate();
  function handler(str) {
    navigate(str);
  }

  return (
    <div className="post">
      <div className="post__info">
        <h2>{props.num}. {props.post.title}</h2>
        <p>{props.post.body}</p>
      </div>
      <div className="post__btns">
        <Button onClick={() => handler(`/posts/${props.post.id}`)}>
          Open
        </Button>
        <Button onClick={() => props.remove(props.post)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default PostItem;
